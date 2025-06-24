import { Token, getToken } from "./token/token";
import dotenv from "dotenv"
import axios from "axios";
import fs from "fs";
import { assert } from "console";
export async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function extract_ranges(start: number, end: number, total:number, token: string, min_d: Date, max_d:Date, departement:string)
{
    // recursive break point. 3000 is max of page. Total is the total of result at day department at day.
    // if result len for a day is bigger than 3149 , the next  result  cannot be download.
    if(start > total || start > 3000)
        return;

    const res = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search",
        {
            headers:{
                Authorization: `Bearer ${token}`
            },
            params:{
                range:`${start}-${end}`,
                departement:departement,
                minCreationDate: min_d.toISOString().split('.')[0] + 'Z',
                maxCreationDate: max_d.toISOString().split('.')[0] + 'Z'
            }
        }
    )

    //total is parametre of fonction for recursive break point.
    total = Number(res.headers['content-range'].split('/')[1]);

    /*
        file systeme managment. departement/date/date-range-batch_size-total_size
    */ 
    if(!fs.existsSync(`./data/${departement}`))
        fs.mkdirSync('./data/'+departement)
    if(!fs.existsSync(`./data/${departement}/${max_d.toISOString().split('T')[0]}`))
        fs.mkdirSync(`./data/${departement}/${max_d.toISOString().split('T')[0]}`)
    fs.writeFileSync(`./data/${departement}/${max_d.toISOString().split('T')[0]}/Offre-${max_d.toISOString().split('T')[0]}-${start}-${end}-${end-start}-${total}`, JSON.stringify(res.data, null, 2));

    //dynamique ajustment for the last request;
    const add = total - end < 149 ? total - end - 1 : 149;
    // recusif call.
    await extract_ranges(end + 1, end + 1 + add, total, token, min_d, max_d, departement);
}


async function get_job_offers_year(token: Token, departement: string, from: Date, to: Date) {


    const one_day = 1000 * 60  * 60 * 24;
    const range_ms = from.getTime() - to.getTime();
    const range_size = Math.round(range_ms / one_day);
    
    let i = 0;
    let idx = 0
    let min_d = new Date();
    let max_d = new Date();
    max_d.setDate(min_d.getDate() - 1);
    //range size = how many day back
    while(idx < range_size)
    {
        console.log("📅 Traitement " + (i +1) +"/"+range_size + " du", min_d.toISOString().split('T')[0], max_d.toISOString().split('T')[0], "departement: ", departement);
        await extract_ranges(0,149,149, token.access_token,  max_d, min_d, departement);
        await sleep(1000);
        /* plage date ajustment */
        max_d.setDate(max_d.getDate() - 1);
        min_d.setDate(min_d.getDate() - 1);
        i++;
        idx++;
    }
}

async function main()
{

    dotenv.config();
    const token: Token | null = await getToken();
    if(!token)
        return;

    const from = new Date();
    const to = new Date();
    const day_range = 365;

    //from.setDate(from.getDate() - 1);
    to.setDate(from.getDate() - day_range);

    console.log("from : " + from.toISOString() + " To: ", to.toISOString()) 
    await get_job_offers_year(token, "74", from, to)
}

main();