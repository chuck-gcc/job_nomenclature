import axios from "axios"
import { write_data } from "../../utils/utils"

export async function get_grands_domaines(token:string)
{
    const url: string = 'https://api.francetravail.io/partenaire/rome-metiers/v1/metiers/grand-domaine'
    const module: string = 'rome_metiers/grands_domaines' 
    const res = await axios.get(url,{
        headers: {
            Authorization:`Bearer ${token}`,
            Accept: 'application/json'
        },
        params: {
            champs:  
            [   
                'code', 'domaineprofessionnels(libelle,code,metiers(label,transitionecologiquedetaillee,libelle,codeisco,code,riasecmineur,transitionecologique,transitionnumerique,appellations(emploireglemente,transitionecologiquedetaillee,libelle,secondaire,code,emploicadre,transitionecologique,transitionnumerique,transitiondemographique,classification,romeparent),riasecmajeur))',
                'libelle'
            ].join(',')
        }
    })
    if(res.status != 200)
    {
        console.log("error status : "+ res.status);
        return;
    }
    write_data(res,module);
}
