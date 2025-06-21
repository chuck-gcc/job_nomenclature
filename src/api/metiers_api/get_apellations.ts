import axios from "axios";
import fs from "fs"

export async function get_apellations_list(token:string)
{
    const url: string = "https://api.francetravail.io/partenaire/rome-metiers/v1/metiers/appellation"
    const res = await axios.get(url,{
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        params: { 
            champs:['appellationesco(libelle,uri)','classification','code', 'emploicadre', 'emploireglemente','libelle','libellecourt',
                'metier(emploireglemente,libelle,domaineprofessionnel(libelle,code,granddomaine(libelle,code)),code,emploicadre,riasecmineur,transitionnumerique,riasecmajeur,label,transitionecologiquedetaillee,codeisco,transitionecologique,transitiondemographique)',
                'romeparent','secondaire','transitiondemographique','transitionecologique','transitionecologiquedetaillee','transitionnumerique'
            ].join(',')

        }
    });
    for (const v of res.data)
    {
        const name = `appellation_${v['code']}.json`
        fs.writeFileSync(`./src/data/apellations/${name}`, JSON.stringify(v,null,2))
    }
}