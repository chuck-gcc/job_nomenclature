import axios from "axios";
import { write_data } from "../../utils/utils"

export async function get_competences(token:string)
{
    const url: string = "https://api.francetravail.io/partenaire/rome-competences/v1/competences/competence"
    const module: string = 'rome_competences/competences';
    const res = await axios.get(url,{
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        params: { 
            champs:[
                '@competencedetaillee(riasecmineur,macrocompetence(libelle,transferable,@macrosavoiretreprofessionnel(qualiteprofessionnelle),souscategorie,code,riasecmineur,codearborescence,objectif(libelle,enjeu(libelle,code,codearborescence,domainecompetence(libelle,code,codearborescence)),code,codearborescence),codeogr,maturite,riasecmajeur),riasecmajeur)',
                '@macrocompetence(transferable,@macrosavoiretreprofessionnel(qualiteprofessionnelle),souscategorie,riasecmineur,codearborescence,objectif(libelle,enjeu(libelle,code,codearborescence,domainecompetence(libelle,code,codearborescence)),code,codearborescence),maturite,riasecmajeur)',
                '@savoir(categoriesavoir(libelle,categorie(libelle,code),code))','code','codeogr','competenceesco(libelle,uri)', 'datefin', 'libelle', 'obsolete', 'transitionecologique'
            ].join(',')

        }
    });
    if(res.status == 200)
    {
        write_data(res, module);
    }
}