import axios from "axios"
import { write_data } from "../../utils/write_data"

export async function get_domaines_professionnels(token:string)
{
    const url = "https://api.francetravail.io/partenaire/rome-metiers/v1/metiers/domaine-professionnel";
    const module_name = 'rome_metiers/domaines';
    const res = await axios.get(url, {
        headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
        params:{
           champs: 
           ['code', 'granddomaine(libelle,code)', 'libelle', 'metiers(label,transitionecologiquedetaillee,libelle,codeisco,code,riasecmineur,transitionecologique,transitionnumerique,appellations(emploireglemente,transitionecologiquedetaillee,libelle,secondaire,code,emploicadre,transitionecologique,transitionnumerique,transitiondemographique,classification,romeparent),riasecmajeur)'
           ].join(',')
        }
    })
    write_data(res, module_name);
}