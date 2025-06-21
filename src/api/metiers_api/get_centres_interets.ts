import fs from "fs"
import axios from "axios"

export async function get_centre_interet(token: string)
{

    const url = "https://api.francetravail.io/partenaire/rome-metiers/v1/metiers/centre-interet";
    const res = await axios.get(url,
    {
        headers:{
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        params:
        {
            champs:['code', 'definition', 'libelle', 'metiers(emploireglemente,libelle,code,emploicadre,riasecmineur,transitionnumerique,riasecmajeur,label,transitionecologiquedetaillee,codeisco,transitionecologique,transitiondemographique,appellations(emploireglemente,transitionecologiquedetaillee,libelle,secondaire,code,emploicadre,transitionecologique,transitionnumerique,transitiondemographique,classification))',
                'metierslies(principal,metier(emploireglemente,libelle,code,emploicadre,riasecmineur,transitionnumerique,riasecmajeur,label,transitionecologiquedetaillee,codeisco,transitionecologique,transitiondemographique,appellations(emploireglemente,transitionecologiquedetaillee,libelle,secondaire,code,emploicadre,transitionecologique,transitionnumerique,transitiondemographique,classification,romeparent)))'
            ].join(',')
        }
    })
    for(const v of res.data)
    {
        const name = `interets_${v['code']}.json`
        fs.writeFileSync("./src/data/interets/"+name, JSON.stringify(v, null, 2));
    }
    //fs.writeFileSync("./src/data/interets/"+name, JSON.stringify(res.data[10], null, 2));
    //console.log(res.data);

}