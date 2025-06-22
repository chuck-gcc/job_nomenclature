import dotenv from "dotenv"
import { getToken , Token } from "./api/token/token";
import {update_db} from "./api/update_db"

async function main(){

    dotenv.config();
    
    const token: Token | null = await getToken();
    if(!token)
        return ;
    update_db(token);
}
main();