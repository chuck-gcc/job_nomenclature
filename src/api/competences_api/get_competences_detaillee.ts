import axios from "axios"
import { write_data } from "../../utils/utils";

export async function get_competences_detaillee(token: string)
{
    const url: string =  "https://api.francetravail.io/partenaire/rome-competences/v1/competences/competence-detaillee";
    const module:string = "rome_competences/competences_detaillee";
    const res = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        },
        params: {
            champs :  ['code', 'codeogr', 'competenceesco(libelle,uri)', 'datefin', 'libelle', 'macrocompetence(libelle,transferable,@macrosavoiretreprofessionnel(qualiteprofessionnelle),souscategorie,code,riasecmineur,codearborescence,objectif(libelle,enjeu(libelle,code,codearborescence,domainecompetence(libelle,code,codearborescence)),code,codearborescence),codeogr,maturite,riasecmajeur)',
                'obsolete', 'riasecmajeur', 'riasecmineur', 'transitionecologique', 'transitionnumerique'
            ].join(',')
        }
    })
    if(res.status == 200)
    {
        write_data(res, module);
    }
}