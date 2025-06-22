import axios from "axios";
import { write_data } from "../utils/utils"

export interface Module
{
    url: string,
    champs: string,
    module_name: string;
}


export async function update_module(mod:Module)
{
    const url: string = mod.url
    const module: string = mod.module_name;
    const res = await axios.get(url,{
        headers: {
            Authorization: `Bearer ${mod.}`,
            'Content-Type': 'application/json'
        },
        params: { 
            champs: mod.champs
        }
    });
    if(res.status == 200)
    {
        write_data(res, module);
    }
}