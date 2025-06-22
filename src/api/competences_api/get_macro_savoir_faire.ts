import axios from "axios";
import { write_data } from "../../utils/utils"

export async function get_macro_savoir_faire(token:string)
{
    const url: string = "https://api.francetravail.io/partenaire/rome-competences/v1/competences/macro-savoir-faire"
    const module: string = 'rome_competences/macro_savoir_faire';
    const res = await axios.get(url,{
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        params: { 
            champs:[

                'code', 'codearborescence', 'codeogr', 'competenceesco(libelle,uri)', 'datefin', 'definition',
                'libelle', 'maturite', 'objectif(libelle,enjeu(libelle,code,codearborescence,domainecompetence(libelle,code,codearborescence)),code,codearborescence)',
                'obsolete', 'riasecmajeur', 'riasecmineur', 'souscategorie', 'transferable', 'transitionecologique', 'transitionnumerique'
                
            ].join(',')

        }
    });
    if(res.status == 200)
    {

        write_data(res, module);
    }
}