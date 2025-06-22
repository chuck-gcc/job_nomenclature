import axios from "axios"
import fs from "fs"

export async function get_version_rome_m(token:string)
{
    const url = 'https://api.francetravail.io/partenaire/rome-metiers/v1/metiers/version';
    const module: string = 'rome_metiers/version_rome_m' 
    const res = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'   
        },
        params: {
            champs: [
                'version,lastModifiedDate' 
            ].join(',')
        }
    })
    if(res.status != 200)
    {
        console.log(res.statusText);
        console.log("error status : "+ res.status);
        return res;
    }
    res.status = 777;
    const name: string = `version_${res.data['version']}.json`;
    fs.writeFileSync(`./src/data/rome_metiers/version/${name}`,JSON.stringify(res.data, null, 2))
    return res;
}