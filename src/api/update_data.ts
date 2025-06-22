import { Token } from "./token/token";
import { sleep } from "../utils/utils";
import { Module, update_module} from './modules/update_module'
import  * as Module_c  from "./modules/module_rome_c";
import  * as Module_m  from "./modules/module_rome_m";


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
    async update(module: Module, token: string)
    {
        await update_module(module, this.token);
        await sleep(1000);
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
    async update(module: Module, token: string)
    {
        await update_module(module, this.token);
        await sleep(1000);
    }
}

export async function update_data(token:Token)
{   
    
    const data_rome_metiers = new Rome_Metiers(token.access_token);
    const data_rome_competence = new Rome_Competences(token.access_token);
    const arr : [Rome_Metiers, Rome_Competences] = [data_rome_metiers, data_rome_competence];
    
    for(const [key, value] of Object.entries(data_rome_metiers))
    {
        if(key != 'module_size' && key != 'token')
        {
            await data_rome_metiers.update(value,token.access_token)
        }
    }
    for(const [key, value] of Object.entries(data_rome_competence))
    {
        if(key != 'module_size' && key != 'token')
        {
            await data_rome_competence.update(value,token.access_token)
        }
    }
}