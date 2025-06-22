import axios from "axios";
import { write_data } from "../../utils/utils"

export async function get_savoirs(token:string)
{
    const url: string = "https://api.francetravail.io/partenaire/rome-competences/v1/competences/savoir"
    const module: string = 'rome_competences/savoirs';
    const res = await axios.get(url,{
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        params: { 
            champs:[

                'categoriesavoir(libelle,categorie(libelle,code),code)', 'code', 'codeogr',
                'competenceesco(libelle,uri)', 'datefin', 'libelle', 'obsolete', 'transitionecologique',
                'transitionnumerique'

            ].join(',')
        }
    });
    if(res.status == 200)
    {
        write_data(res, module);
    }
}