import fs from "fs"
import axios from "axios"

export async function get_domaines_professionnels(token:string)
{
    const url = "https://api.francetravail.io/partenaire/rome-metiers/v1/metiers/domaine-professionnel"

    const res = await axios.get(url, {
        headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
        params:{
           champs: 
           ['code', 'granddomaine(libelle,code)', 'libelle', 'metiers(label,transitionecologiquedetaillee,libelle,codeisco,code,riasecmineur,transitionecologique,transitionnumerique,appellations(emploireglemente,transitionecologiquedetaillee,libelle,secondaire,code,emploicadre,transitionecologique,transitionnumerique,transitiondemographique,classification,romeparent),riasecmajeur)'
           ].join(',')
        }
    })
    for(const v of res.data)
    {
        const name = `domaine_${v['code']}.json`
        fs.writeFileSync("./src/data/domaines/"+name, JSON.stringify(v, null, 2));
    }
    //const name = `domaine_${res.data['code']}.json`
    //fs.writeFileSync("./src/data/domaine/"+name, JSON.stringify(res.data[10], null, 2));
    //console.log(res.data);

}