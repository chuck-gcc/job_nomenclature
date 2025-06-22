import axios from "axios";
import { write_data } from "../../utils/utils"

export async function get_objectifs(token:string)
{
    const url: string = "https://api.francetravail.io/partenaire/rome-competences/v1/competences/objectif"
    const module: string = 'rome_competences/objectifs';
    const res = await axios.get(url,{
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        params: { 
            champs:[

                'code','codearborescence', 'datefin', 'enjeu(libelle,code,codearborescence,domainecompetence(libelle,code,codearborescence))',
                'libelle', 'macrocompetences(libelle,transferable,@macrosavoiretreprofessionnel(qualiteprofessionnelle),souscategorie,code,riasecmineur,codearborescence,transitionecologique,transitionnumerique,codeogr,maturite,riasecmajeur)',
                'obsolete'

            ].join(',')

        }
    });
    if(res.status == 200)
    {
        write_data(res, module);
    }
}