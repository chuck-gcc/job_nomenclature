import dotenv from "dotenv"
import { getToken } from "./token";
import { Token } from "./interface";
import { get_apellations_list } from "./api/metiers_api/get_apellations";
import { get_centre_interet } from "./api/metiers_api/get_centres_interets";
import {get_domaines_professionnels} from "./api/metiers_api/get_domaines_professionnels"
import {get_grands_domaines} from "./api/metiers_api/get_grands_domaines"
import { get_metiers } from "./api/metiers_api/get_metiers";
import { get_secteurs } from "./api/metiers_api/get_secteurs";
import { get_version_metier } from "./api/metiers_api/get_version";
import { get_themes } from "./api/metiers_api/get_ themes";
//https://api.francetravail.io/partenaire/rome-metiers/v1/metiers/appellation;

async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


async function main(){

    dotenv.config();
    
    const token: Token | null = await getToken();
    if(!token)
        return ;

    const version = await get_version_metier(token.access_token);
    if(version.status != 200)
    {
        if(version.status == 777)
            console.log("La base est a jour \n")
        return ;
    }
    await sleep(600);
    await get_apellations_list(token.access_token);
    await sleep(600);
    await get_centre_interet(token.access_token);
    await sleep(600);
    await get_domaines_professionnels(token.access_token);
    await sleep(600);
    await get_grands_domaines(token.access_token);
    await sleep(600);
    await get_metiers(token.access_token);
    await sleep(600);
    await get_secteurs(token.access_token);
    await sleep(600);
    await get_themes(token.access_token);
    

}
main();