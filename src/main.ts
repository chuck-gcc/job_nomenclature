import dotenv from "dotenv"
import { getToken , Token } from "./api/token/token";
import {update_data} from "./api/update_data"

async function main(){

    dotenv.config();
    
    const token: Token | null = await getToken();
    if(!token)
        return ;
    update_data(token);
}
main();