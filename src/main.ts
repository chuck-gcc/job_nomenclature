import dotenv from "dotenv"
import { getToken } from "./token";
import { Token } from "./interface";
import { get_apellations_list } from "./api/metiers_api/get_apellations";
import { get_centre_interet } from "./api/metiers_api/get_centres_interets";
import {get_domaines_professionnels} from "./api/metiers_api/get_domaines_professionnels"
import axios from "axios";
import fs from "fs"

//https://api.francetravail.io/partenaire/rome-metiers/v1/metiers/appellation

interface AppellationEsco
{
    libelle: string,
    uri:string
}

interface Competence{
    code: string,
    codeOgr: string,
    libelle: string,
    type: string,
    riasecMajeur: string,
    riasecMineur: string
}

interface CompetenceCle
{
  competence: Competence,
  frequence: number
}

interface Apellation_interface
{
    appellationEsco : AppellationEsco;
    classification: string;
    code: string
    competencesCles:CompetenceCle
}

class Apellation implements Apellation_interface {
    constructor(
        public code: string,
        public classification: string,
        public appellationEsco: AppellationEsco,
        public competencesCles: CompetenceCle
    ) {}
   
}



async function main(){

    dotenv.config();
    
    const token: Token | null = await getToken();
    if(!token)
        return ;
    await get_apellations_list(token.access_token);
    await get_centre_interet(token.access_token);
    await get_domaines_professionnels(token.access_token);
}
main();