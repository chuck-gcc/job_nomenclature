import axios from "axios";
import { write_data } from "../../utils/write_data"

export async function get_apellations_list(token:string)
{
    const url: string = "https://api.francetravail.io/partenaire/rome-metiers/v1/metiers/appellation"
    const module: string = 'rome_metiers/apellations';
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
    write_data(res,module);
}