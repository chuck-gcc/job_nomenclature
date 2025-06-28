import axios from "axios"
import qs from "qs"

export interface Token
{
    access_token: string,
    scope: string,
    token_type: string,
    expires_in: number
}

export async function getToken(): Promise<Token | null> {
    const data = qs.stringify({
        grant_type: "client_credentials",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        scope: process.env.SCOPES_API
    });
    console.log(process.env.CLIENT_ID);
    console.log("Welcome to the france travail scrapping app:\n");
    const url = "https://entreprise.pole-emploi.fr/connexion/oauth2/access_token";
    const res = await axios.post<Token>(url, data, {
        
        headers:    {"Content-Type": "application/x-www-form-urlencoded"},
        params:     {"realm": "partenaire"}
        
    }).catch(function (reponse){
        console.log("error reponse status: ", reponse.message)
        return (null)
    })
    if(res?.data)
    {
        return res.data
    }
    return null
}