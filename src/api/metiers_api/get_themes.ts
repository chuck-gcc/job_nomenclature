import axios from "axios";
import { write_data } from "../../utils/utils"

export async function get_themes(token:string)
{
    const url: string = "https://api.francetravail.io/partenaire/rome-metiers/v1/metiers/theme"
    const module: string = 'rome_metiers/themes';
    const res = await axios.get(url,{
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        params: { 
            champs:[
                'code', 'definition', 'libelle',
                'metiers(label,transitionecologiquedetaillee,libelle,codeisco,code,riasecmineur,transitionecologique,transitionnumerique,appellations(emploireglemente,transitionecologiquedetaillee,libelle,secondaire,code,emploicadre,transitionecologique,transitionnumerique,transitiondemographique,classification,romeparent),riasecmajeur)',
            ].join(',')

        }
    });
    write_data(res,module);
}