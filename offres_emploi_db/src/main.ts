import { Token, getToken } from "../token/token";
import dotenv from "dotenv"
import axios from "axios";
import fs from "fs";
import { assert } from "console";
import { exit, pid } from "process";
import {Extract_date_roll_back} from "./class/date_roll_back"
import {Extract_day} from "./class/extraction_roll_back"
import {ReqStatus} from "./class/request_status"
import {sleep} from "./utils/utils"

async function extract_day_job(token: Token, obj_date:Extract_date_roll_back, departement:string)
{
    
    /* 
        make first request oonly for header now. 
        Optimisation is possible with saving the first call who de objectif is to get information about day dta
    */
    const R = new Extract_day(token,departement, obj_date)

    // create request;
    try {
        await R.get_header_data();
    } catch (error) {
        console.log("Error get header");
        exit(20);
    }
    R.create_promise_url();
    R.display_url();
        try {   

            if(R.url_promise)
            {
                console.log(R.url_promise.length);
                const res  =  R.url_promise.map(ur => {
                    return axios.get(ur, {
                        headers: {
                            Authorization: `Bearer ${token.access_token}`
                        }
                    })
                })

                const r = (await axios.all(res))
                .forEach((res, i) => {
                    console.log(`Réponse ${i + 1}:`, res.statusText);
                    /*
                        file systeme managment. departement/date/date-range-batch_size-total_size
                    */
                const creation_date = R.obj_date.dateLeft.toISOString().split('T')[0]+'Z';
                    if(!fs.existsSync(`./data/${departement}`))
                        fs.mkdirSync('./data/'+departement)
                    if(!fs.existsSync(`./data/${departement}/${creation_date}`))
                        fs.mkdirSync(`./data/${departement}/${creation_date}`)
                    fs.writeFileSync(`./data/${departement}/${creation_date}/${creation_date}-${i}`, JSON.stringify(res.data, null, 2));
                });
            }
        } catch (error) {
            console.log("ERROR\n", error);
            exit(10);
        }
    R.url_promise = [];
}


async function departement_worker(token: Token, departement: string, from: Date, to: Date) {

    
    const one_day = 1000 * 60  * 60 * 24;
    const range_ms = from.getTime() - to.getTime();
    const range_size = Math.round(range_ms / one_day);
    let idx = 1
    const obj_date = new Extract_date_roll_back();
    //range size = how many day back
    while(idx < range_size)
    {
        //console.log("📅 Traitement du", min_d.toISOString().split('T')[0], max_d.toISOString().split('T')[0], "departement: ", departement);
        await extract_day_job( token,  obj_date, departement);
        await sleep(700);
        obj_date.display();
        obj_date.set_new_date();
        idx++;
    }
}

async function run_extraction(token:Token, departement:string)
{
    
    const from = new Date();
    const to = new Date();
    const day_range = 100;

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

    run_extraction(token, "74");
    
}

main();