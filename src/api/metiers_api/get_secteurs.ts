import axios from "axios";
import { write_data } from "../../utils/write_data"

export async function get_secteurs(token: string)
{
    const url: string = "https://api.francetravail.io/partenaire/rome-metiers/v1/metiers/secteur-activite"
    const module: string = 'rome_metiers/secteurs';
    const res = await axios.get(url,{
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        params: { 
            champs:[
                'code', 'definition','libelle', 'metiers(emploireglemente,libelle,code,emploicadre,riasecmineur,transitionnumerique,riasecmajeur,label,transitionecologiquedetaillee,codeisco,transitionecologique,transitiondemographique,appellations(emploireglemente,transitionecologiquedetaillee,libelle,secondaire,code,emploicadre,transitionecologique,transitionnumerique,transitiondemographique,classification,romeParent))',
                'metierslies(principal,metier(emploireglemente,libelle,code,emploicadre,riasecmineur,transitionnumerique,riasecmajeur,label,transitionecologiquedetaillee,codeisco,transitionecologique,transitiondemographique,appellations(emploireglemente,transitionecologiquedetaillee,libelle,secondaire,code,emploicadre,transitionecologique,transitionnumerique,transitiondemographique,classification,romeparent)))',
                'secteuractivite(libelle,code,definition)', 'soussecteurs(libelle,code,definition)'
            ].join(',')

        }
    });
    write_data(res,module);
}