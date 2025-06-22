import axios from "axios";
import { write_data } from "../../utils/utils"

export async function get_categorie_savoirs(token:string)
{
    const url: string = "https://api.francetravail.io/partenaire/rome-competences/v1/competences/categorie-savoirs"
    const module: string = 'rome_competences/categorie_savoirs';
    const res = await axios.get(url,{
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        params: { 
            champs:[
                'categorie(libelle,code)', 'code', 'datefin' , 'libelle', 'obsolete', 'savoirs(libelle,code,transitionecologique,transitionnumerique,codeogr)',
                'souscategories(libelle,code)'
            ].join(',')

        }
    });
    if(res.status == 200)
    {
        write_data(res, module);
    }
}