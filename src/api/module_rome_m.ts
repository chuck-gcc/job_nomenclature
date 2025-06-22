import { Module } from "./update_module"


export const ModuleApellation : Module = {
    url: "https://api.francetravail.io/partenaire/rome-metiers/v1/metiers/appellation",
    module_name: 'rome_metiers/apellations',
    champs:[

        'appellationesco(libelle,uri)','classification','code', 'emploicadre', 'emploireglemente','libelle','libellecourt',
        'metier(emploireglemente,libelle,domaineprofessionnel(libelle,code,granddomaine(libelle,code)),code,emploicadre,riasecmineur,transitionnumerique,riasecmajeur,label,transitionecologiquedetaillee,codeisco,transitionecologique,transitiondemographique)',
        'romeparent','secondaire','transitiondemographique','transitionecologique','transitionecologiquedetaillee','transitionnumerique'
        
    ].join(',')
}



export const ModuleCentreInteret: Module = {
    url : "https://api.francetravail.io/partenaire/rome-metiers/v1/metiers/centre-interet",
    module_name: 'rome_metiers/interets',
    champs:[

        'code', 'definition', 'libelle', 'metiers(emploireglemente,libelle,code,emploicadre,riasecmineur,transitionnumerique,riasecmajeur,label,transitionecologiquedetaillee,codeisco,transitionecologique,transitiondemographique,appellations(emploireglemente,transitionecologiquedetaillee,libelle,secondaire,code,emploicadre,transitionecologique,transitionnumerique,transitiondemographique,classification))',
        'metierslies(principal,metier(emploireglemente,libelle,code,emploicadre,riasecmineur,transitionnumerique,riasecmajeur,label,transitionecologiquedetaillee,codeisco,transitionecologique,transitiondemographique,appellations(emploireglemente,transitionecologiquedetaillee,libelle,secondaire,code,emploicadre,transitionecologique,transitionnumerique,transitiondemographique,classification,romeparent)))'
        
    ].join(',')
}

export const ModuleDomainesPro: Module = {
    url: "https://api.francetravail.io/partenaire/rome-metiers/v1/metiers/domaine-professionnel",
    module_name: 'rome_metiers/domaines',
    champs:[

        'code', 'granddomaine(libelle,code)', 'libelle', 'metiers(label,transitionecologiquedetaillee,libelle,codeisco,code,riasecmineur,transitionecologique,transitionnumerique,appellations(emploireglemente,transitionecologiquedetaillee,libelle,secondaire,code,emploicadre,transitionecologique,transitionnumerique,transitiondemographique,classification,romeparent),riasecmajeur)'
        
    ].join(',')
}

export const ModuleGrandsDomaines: Module = {
    url: "https://api.francetravail.io/partenaire/rome-metiers/v1/metiers/grand-domaine",
    module_name: 'rome_metiers/grands_domaines',
    champs:[
        'code', 'domaineprofessionnels(libelle,code,metiers(label,transitionecologiquedetaillee,libelle,codeisco,code,riasecmineur,transitionecologique,transitionnumerique,appellations(emploireglemente,transitionecologiquedetaillee,libelle,secondaire,code,emploicadre,transitionecologique,transitionnumerique,transitiondemographique,classification,romeparent),riasecmajeur))',
        'libelle'
        
    ].join(',')
}

export const ModuleMetier: Module = {
    url: "https://api.francetravail.io/partenaire/rome-metiers/v1/metiers/metier",
    module_name: 'rome_metiers/metiers',
    champs:[

        'accesemploi','appellations(emploireglemente,transitionecologiquedetaillee,libelle,secondaire,code,emploicadre,transitionecologique,transitionnumerique,transitiondemographique,classification,romeparent,libellecourt)',
        'code', 'codeisco', 'definition', 'domaineprofessionnel(libelle,code,granddomaine(libelle,code))', 'emploicadre','emploireglemente', 'formacodes(libelle,code)',
        'label', 'libelle', 'riasecmajeur', 'riasecmineur', 'transitiondemographique','transitionecologique','transitionecologiquedetaillee','transitionnumerique'
        
    ].join(',')
}

export const ModuleSecteurs: Module = {
        url: "https://api.francetravail.io/partenaire/rome-metiers/v1/metiers/secteur-activite",
        module_name: 'rome_metiers/secteurs',
        champs:[

            
        ].join(',')
}

export const ModuleTheme: Module = {
    url: "https://api.francetravail.io/partenaire/rome-metiers/v1/metiers/theme",
    module_name: 'rome_metiers/themes',
    champs:[

        'code', 'definition', 'libelle',
        'metiers(label,transitionecologiquedetaillee,libelle,codeisco,code,riasecmineur,transitionecologique,transitionnumerique,appellations(emploireglemente,transitionecologiquedetaillee,libelle,secondaire,code,emploicadre,transitionecologique,transitionnumerique,transitiondemographique,classification,romeparent),riasecmajeur)',
        
    ].join(',')
}


// export const Template_m = {
//     objectif: {
//         url: "",
//         module_name: 'rome_metiers/',
//         champs:[

            
//         ].join(',')
//     }
// }