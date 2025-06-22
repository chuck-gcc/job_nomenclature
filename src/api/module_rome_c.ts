import { Module } from "./update_module"


export const ModuleObjectifs : Module = {

    url: "https://api.francetravail.io/partenaire/rome-competences/v1/competences/objectif",
    module_name: 'rome_competences/objectifs',
    champs:[
        'code','codearborescence', 'datefin', 'enjeu(libelle,code,codearborescence,domainecompetence(libelle,code,codearborescence))',
        'libelle', 'macrocompetences(libelle,transferable,@macrosavoiretreprofessionnel(qualiteprofessionnelle),souscategorie,code,riasecmineur,codearborescence,transitionecologique,transitionnumerique,codeogr,maturite,riasecmajeur)',
        'obsolete'
    ].join(',')
}

export const ModuleCategorieSavoirs: Module  = {
    url: "https://api.francetravail.io/partenaire/rome-competences/v1/competences/categorie-savoirs",
    module_name: 'rome_competences/categorie_savoirs',
    champs:[
        'categorie(libelle,code)', 'code', 'datefin' , 'libelle', 'obsolete', 'savoirs(libelle,code,transitionecologique,transitionnumerique,codeogr)',
        'souscategories(libelle,code)'
    ].join(',')
}

export const ModuleCompetencesDetaillee : Module = {
    url: "https://api.francetravail.io/partenaire/rome-competences/v1/competences/competence-detaillee",
    module_name: 'rome_competences/competences_detaillee',
    champs:[
        'code', 'codeogr', 'competenceesco(libelle,uri)', 'datefin', 'libelle', 'macrocompetence(libelle,transferable,@macrosavoiretreprofessionnel(qualiteprofessionnelle),souscategorie,code,riasecmineur,codearborescence,objectif(libelle,enjeu(libelle,code,codearborescence,domainecompetence(libelle,code,codearborescence)),code,codearborescence),codeogr,maturite,riasecmajeur)',
        'obsolete', 'riasecmajeur', 'riasecmineur', 'transitionecologique', 'transitionnumerique'
    ].join(',')
}

export const ModuleCompetence : Module = {
    url: "https://api.francetravail.io/partenaire/rome-competences/v1/competences/competence-detaillee",
    module_name: 'rome_competences/competences',
    champs:[
        '@competencedetaillee(riasecmineur,macrocompetence(libelle,transferable,@macrosavoiretreprofessionnel(qualiteprofessionnelle),souscategorie,code,riasecmineur,codearborescence,objectif(libelle,enjeu(libelle,code,codearborescence,domainecompetence(libelle,code,codearborescence)),code,codearborescence),codeogr,maturite,riasecmajeur),riasecmajeur)',
        '@macrocompetence(transferable,@macrosavoiretreprofessionnel(qualiteprofessionnelle),souscategorie,riasecmineur,codearborescence,objectif(libelle,enjeu(libelle,code,codearborescence,domainecompetence(libelle,code,codearborescence)),code,codearborescence),maturite,riasecmajeur)',
        '@savoir(categoriesavoir(libelle,categorie(libelle,code),code))','code','codeogr','competenceesco(libelle,uri)', 'datefin', 'libelle', 'obsolete', 'transitionecologique'
    ].join(',')
}

export const ModuleDomainesCompetence : Module = {
    url: "https://api.francetravail.io/partenaire/rome-competences/v1/competences/domaine-competence",
    module_name: 'rome_competences/domaines_competences',
    champs:[

        'code', 'codearborescence', 'datefin',
        'enjeux(objectifs(libelle,macrocompetences(libelle,transferable,@macrosavoiretreprofessionnel(qualiteprofessionnelle),souscategorie,code,riasecmineur,codearborescence,transitionecologique,transitionnumerique,codeogr,maturite,riasecmajeur),code,codearborescence),libelle,code,codearborescence)',
        'libelle', 'obsolete'

    ].join(',')
}

export const ModuleEnjeux : Module = {
    url: "https://api.francetravail.io/partenaire/rome-competences/v1/competences/enjeu",
    module_name: 'rome_competences/enjeux',
    champs:[

        'code', 'codearborescence', 'datefin', 'domainecompetence(libelle,code,codearborescence)',
        'libelle', 'objectifs(libelle,macrocompetences(libelle,transferable,@macrosavoiretreprofessionnel(qualiteprofessionnelle),souscategorie,code,riasecmineur,codearborescence,transitionecologique,transitionnumerique,codeogr,maturite,riasecmajeur),code,codearborescence)',
        'obsolete'

    ].join(',')
}

export const ModuleMacrosCompetence : Module = {
    url: "https://api.francetravail.io/partenaire/rome-competences/v1/competences/macro-competence",
    module_name: 'rome_competences/macro_competence',
    champs:[
        '@macrosavoiretreprofessionnel(qualiteprofessionnelle)','code', 'codearborescence', 'codeogr', 'competenceesco(libelle,uri)',
        'datefin', 'definition', 'libelle', 'maturite', 'objectif(libelle,enjeu(libelle,code,codearborescence,domainecompetence(libelle,code,codearborescence)),code,codearborescence)',
        'obsolete', 'riasecmajeur', 'riasecmineur', 'souscategorie', 'transferable', 'transitionecologique', 'transitionnumerique'
        
    ].join(',')
}


export const ModuleMacrosSavoirEtre : Module = {
    url: "https://api.francetravail.io/partenaire/rome-competences/v1/competences/macro-savoir-etre-professionnel",
    module_name: 'rome_competences/macro_savoir_etre',
    champs:[
        'code', 'codearborescence', 'codeogr', 'competenceesco(libelle,uri)', 'datefin', 'definition',
        'libelle', 'maturite', 'objectif(libelle,enjeu(libelle,code,codearborescence,domainecompetence(libelle,code,codearborescence)),code,codearborescence)',
        'obsolete', 'qualiteprofessionnelle','riasecmajeur', 'riasecmineur', 'souscategorie', 'transferable', 'transitionecologique', 'transitionnumerique'
    ].join(',')
}

export const ModuleMacrosSavoirFaire : Module = {
    url: "https://api.francetravail.io/partenaire/rome-competences/v1/competences/macro-savoir-faire",
    module_name: 'rome_competences/macro_savoir_faire',
    champs:[
        'code', 'codearborescence', 'codeogr', 'competenceesco(libelle,uri)', 'datefin', 'definition',
        'libelle', 'maturite', 'objectif(libelle,enjeu(libelle,code,codearborescence,domainecompetence(libelle,code,codearborescence)),code,codearborescence)',
        'obsolete', 'riasecmajeur', 'riasecmineur', 'souscategorie', 'transferable', 'transitionecologique', 'transitionnumerique'  
    ].join(',')
}

export const ModuleSavoirs : Module = {
    url: "https://api.francetravail.io/partenaire/rome-competences/v1/competences/savoir",
    module_name: 'rome_competences/savoirs',
    champs:[

        'categoriesavoir(libelle,categorie(libelle,code),code)', 'code', 'codeogr',
        'competenceesco(libelle,uri)', 'datefin', 'libelle', 'obsolete', 'transitionecologique',
        'transitionnumerique'
        
    ].join(',')
}

export const ModuleMacrosSavoir = {
    objectif: {
        url: "",
        module_name: 'rome_competences/',
        champs:[

            
        ].join(',')
    }
}

// export const Template = {
//     objectif: {
//         url: "",
//         module_name: 'rome_competences/',
//         champs:[

            
//         ].join(',')
//     }
// }