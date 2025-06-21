import axios from "axios"
import { write_data } from "../../utils/write_data"

export async function get_centre_interet(token: string)
{
    const url = "https://api.francetravail.io/partenaire/rome-metiers/v1/metiers/centre-interet";
    const module: string = 'rome_metiers/interets'
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
    write_data(res,module);
}