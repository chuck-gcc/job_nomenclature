import axios from "axios"
import { write_data } from "../../utils/write_data"

export async function get_metiers(token:string)
{
    const url = 'https://api.francetravail.io/partenaire/rome-metiers/v1/metiers/metier';
    const module: string = 'rome_metiers/metiers' 
    const res = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'   
        },
        params: {
            champs: [
                'accesemploi','appellations(emploireglemente,transitionecologiquedetaillee,libelle,secondaire,code,emploicadre,transitionecologique,transitionnumerique,transitiondemographique,classification,romeparent,libellecourt)',
                'code', 'codeisco', 'definition', 'domaineprofessionnel(libelle,code,granddomaine(libelle,code))', 'emploicadre','emploireglemente', 'formacodes(libelle,code)',
                'label', 'libelle', 'riasecmajeur', 'riasecmineur', 'transitiondemographique','transitionecologique','transitionecologiquedetaillee','transitionnumerique'
            ].join(',')
        }
    })
    if(res.status != 200)
    {
        console.log(res.statusText);
        console.log("error status : "+ res.status);
        return;
    }
    write_data(res,module);
}