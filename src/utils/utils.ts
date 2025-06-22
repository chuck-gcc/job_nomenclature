import {AxiosResponse} from "axios";
import fs from "fs"

export function write_data(rep: AxiosResponse, module: string)
{

    for(const v of rep.data)
    {
        const name = `${module.split('/')[1]}_${v['code']}.json`
        fs.writeFileSync(`./src/data/${module}/${name}`, JSON.stringify(v, null, 2));
    }
}


export async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}