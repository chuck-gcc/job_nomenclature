import { Token, getToken } from "./token/token";
import dotenv from "dotenv"
import axios from "axios";
import fs from "fs";
import { assert } from "console";
import * as crypto from "crypto";
import http from "http"

class ReqStatus  
{
    status:number
    status_txt:string;
    date: Date;
    range: [number, number, number];
    url: string | undefined;
    departement:string;

    constructor(status:number, status_txt:string,date: Date,range: [number, number, number],departement:string,url : string  | undefined)
    {
        {

            this.status = status;
            this.status_txt = status_txt;
            this.date = date;
            this.range = range;
            this.url =  url 
            this.departement = departement;
        }
    }
    save()
    {
        fs.writeFileSync(`./data/${this.departement}/status.json`, JSON.stringify(this, null, 2) + "\n", { flag: 'a' })
    }
}

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
    if(total > 0 && (res.status == 200 || res.status == 206))
    {
        /*
            file systeme managment. departement/date/date-range-batch_size-total_size
        */ 
    
        if(!fs.existsSync(`./data/${departement}`))
            fs.mkdirSync('./data/'+departement)
        if(!fs.existsSync(`./data/${departement}/${max_d.toISOString().split('T')[0]}`))
            fs.mkdirSync(`./data/${departement}/${max_d.toISOString().split('T')[0]}`)
        fs.writeFileSync(`./data/${departement}/${max_d.toISOString().split('T')[0]}/Offre-${max_d.toISOString().split('T')[0]}-${start}-${end}-${end-start}-${total}`, JSON.stringify(res.data, null, 2));
    }
    else
        console.log("%c No add" , "colors")
        
    const status  = new ReqStatus(

        res.status,
        res.statusText,
        max_d,
        [start , end, total],
        departement,
        res.config.url,

    ).save()
    
    //dynamique ajustment for the last request;
    const add = total - end < 149 ? total - end - 1 : 149;
    // recusif call.
    await extract_ranges(end + 1, end + 1 + add, total, token, min_d, max_d, departement);
}


async function departement_worker(token: Token, departement: string, from: Date, to: Date) {


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

async function run_extraction(token:Token, departement:string)
{
    
    const from = new Date();
    const to = new Date();
    const day_range = 365;

    //from.setDate(from.getDate() - 1);
    to.setDate(from.getDate() - day_range);
    console.log("from : " + from.toISOString() + " To: ", to.toISOString(),` for department: ${departement}`);
    await departement_worker(token, departement, from, to)
}
async function main()
{
    dotenv.config();
    const token: Token | null = await getToken();
    if(!token)
        return;

    const server = http.createServer((req, res) => {
        
        res.writeHead(200, { 'Content-Type': 'application/json' }); // Facultatif
        res.end(JSON.stringify({ message: "Extraction démarrée", success: true }));
        const url = new URL(req.url!,`http://${req.headers.host}`)
        const params = url.searchParams;
        const maxDate = params.get('maxDate');
        const departement = params.get('departement');
        const minDate = params.get('minDate');
        
        if(departement && departement != "NaN")
            run_extraction(token, departement.toString());
        if(departement != undefined)
            console.log("dep: " + Number(departement[0]));
        res.end();
    }).listen(2022, () => { 
        console.log("Serveur a l'ecoute");  
    })
}

main();