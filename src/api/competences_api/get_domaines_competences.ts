import axios from "axios";
import { write_data } from "../../utils/utils"

export async function get_domaines_competences(token:string)
{
    const url: string = "https://api.francetravail.io/partenaire/rome-competences/v1/competences/domaine-competence"
    const module: string = 'rome_competences/domaines_competences';
    const res = await axios.get(url,{
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        params: { 
            champs:[

                'code', 'codearborescence', 'datefin',
                'enjeux(objectifs(libelle,macrocompetences(libelle,transferable,@macrosavoiretreprofessionnel(qualiteprofessionnelle),souscategorie,code,riasecmineur,codearborescence,transitionecologique,transitionnumerique,codeogr,maturite,riasecmajeur),code,codearborescence),libelle,code,codearborescence)',
                'libelle', 'obsolete'

            ].join(',')

        }
    });
    if(res.status == 200)
    {
        write_data(res, module);
    }
}