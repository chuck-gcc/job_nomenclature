import { getToken , Token } from "./token/token";
import { sleep } from "../utils/utils";
import { get_apellations_list } from "./metiers_api/get_apellations";
import { get_centre_interet } from "./metiers_api/get_centres_interets";
import {get_domaines_professionnels} from "./metiers_api/get_domaines_professionnels"
import {get_grands_domaines} from "./metiers_api/get_grands_domaines"
import { get_metiers } from "./metiers_api/get_metiers";
import { get_secteurs } from "./metiers_api/get_secteurs";
import { get_version_rome_m } from "./metiers_api/get_version_rome_m";
import { get_version_rome_c } from "./competences_api/get_version_rome_c";
import { get_themes } from "./metiers_api/get_themes";
import { get_categorie_savoirs } from "./competences_api/get_categorie_savoirs";
import { get_competences } from "./competences_api/get_competences";
import { get_competences_detaillee } from "./competences_api/get_competences_detaillee";
import { get_enjeux } from "./competences_api/get_enjeux";
import {get_macro_competence} from "./competences_api/get_macro_competence"
import { get_macro_savoir_faire } from "./competences_api/get_macro_savoir_faire";
import { get_macro_savoir_etre } from "./competences_api/get_macro_savoir_etre";
import { get_objectifs } from "./competences_api/get_objectif";
import { get_savoirs } from "./competences_api/get_savoirs";
import { get_domaines_competences } from "./competences_api/get_domaines_competences";


async function update_competence_db(token: Token)
{
    await get_categorie_savoirs(token.access_token);
    await sleep(1000);
    await get_competences_detaillee(token.access_token);
    await sleep(1000);
    await get_competences(token.access_token);
    await sleep(1000);
    await get_domaines_competences(token.access_token);
    await sleep(1000);
    await get_enjeux(token.access_token);
    await sleep(1000);
    await get_macro_competence(token.access_token);
    await sleep(1000);
    await get_macro_savoir_etre(token.access_token);
    await sleep(1000);
    await get_macro_savoir_faire(token.access_token);
    await sleep(1000);
    await get_objectifs(token.access_token);
    await sleep(1000);
    await get_savoirs(token.access_token);
    await sleep(1000);
    await get_version_rome_c(token.access_token);
       
}


async function update_metier_db(token: Token)
{
    const version = await get_version_rome_m(token.access_token);
    // if(version.status != 200)
    // {
    //     if(version.status == 777)
    //         console.log("La base est a jour \n")
        
    //     return ;
    // }
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


export async function update_db(token:Token)
{
    update_metier_db(token);
    await sleep(1000);
    update_competence_db(token);
}