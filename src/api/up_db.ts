import { getToken , Token } from "./token/token";
import { sleep } from "../utils/utils";
import { Module, update_module} from './update_module'
import  * as Module_c  from "./module_rome_c";
import  * as Module_m  from "./module_rome_m";



const data_rome_competences = {

    rome_c: {
        module_size: 10,
        module: {
            objectifs: Module_c.ModuleObjectifs,
            categorieSavoirs: Module_c.ModuleCategorieSavoirs,
            competencesDetaillee: Module_c.ModuleCompetencesDetaillee,
            competences: Module_c.ModuleCompetence,
            domainesCompetence : Module_c.ModuleDomainesCompetence,
            enjeux: Module_c.ModuleEnjeux,
            macrosCompetence: Module_c.ModuleMacrosCompetence,
            //macrosSavoir: Module_c.ModuleMacrosSavoir,
            macrosSavoirEtre: Module_c.ModuleMacrosSavoirEtre,
            savoirs: Module_c.ModuleSavoirs
        }
    }
}

class Rome_Competences {

    module_size: number;
    objectifs: Module;
    categorieSavoirs: Module;
    competencesDetaillee: Module;
    competences: Module;
    domainesCompetence : Module;
    enjeux: Module;
    macrosCompetence: Module;
    //macrosSavoir: Module_c.ModuleMacrosSavoir,
    macrosSavoirEtre: Module;
    savoirs: Module;
    token: string;

    constructor (token:string)
    {
        this.module_size = 10;
        this.objectifs = Module_c.ModuleObjectifs;
        this.categorieSavoirs = Module_c.ModuleCategorieSavoirs;
        this.competencesDetaillee = Module_c.ModuleCompetencesDetaillee;
        this.competences =  Module_c.ModuleCompetence;
        this.domainesCompetence = Module_c.ModuleDomainesCompetence;
        this.enjeux = Module_c.ModuleEnjeux;
        this.macrosCompetence =  Module_c.ModuleMacrosCompetence;
        this.macrosSavoirEtre = Module_c.ModuleMacrosSavoirEtre;
        this.savoirs = Module_c.ModuleSavoirs;
        this.token = token;
    }
}

class Rome_Metiers {

    module_size: number;
    apellations: Module;
    centresInteret:  Module;
    domainesPro:  Module;
    grandsDomains:  Module;
    metiers:  Module;
    secteurs:  Module;
    themes:  Module;
    token:string;

    constructor (token:string)
    {
        this.module_size = 7;
        this.apellations = Module_m.ModuleApellation;
        this.centresInteret = Module_m.ModuleCentreInteret;
        this.domainesPro = Module_m.ModuleDomainesPro;
        this.grandsDomains = Module_m.ModuleGrandsDomaines;
        this.metiers = Module_m.ModuleMetier;
        this.secteurs = Module_m.ModuleSecteurs;
        this.themes = Module_m.ModuleTheme;
        this.token = token;
    }
}



export async function update_db(token:Token)
{   
    
    const data_rome_metiers = new Rome_Metiers(token.access_token);
    const data_rome_competences = new Rome_Competences(token.access_token);
    const {apellations} = data_rome_metiers;

    //console.log(Object.entries(data_rome_metiers));
    console.log(apellations);

    await update_module(apellations, data_rome_competences.token);
    
}