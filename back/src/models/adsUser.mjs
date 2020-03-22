'use strict'
import mongodb from '../services/mongodb.mjs'

const COLLECTION_NAME = 'adsUser'

const getAdsUser = async (uid = undefined) => {
    if(uid === undefined) return []
    return await mongodb.fetch(COLLECTION_NAME, {"userId": uid})
}

const getAdUser = async(aid = undefined, uid = undefined) => {
  if(uid === undefined || aid === undefined) return []
  return await mongodb.fetch(COLLECTION_NAME, {"userId": uid, "annonceId": aid})
}

export {
  getAdsUser,
  getAdUser
}


/*
{
    "_id":5e768bae1c9d440000e09b90",
    "annonceId":"5e7332c41c9d440000a38461",
    "userId":"5e734aab1c9d440000a38469",
    "adresse":"Pont de Kervaric, 56100 Lorient","autre":"a visiter en juillet",
    "pieces":[
        {
            "intitule":"chambre 1",
            "surface": 11.7,
            "travaux":"peinture à refaire",
            "prix":580
        },
        {
            "intitule":"cave",
            "surface":60,
            "travaux":"mettre de l'électricité",
            "prix":1000
        }
    ],
    "travauxGeneraux":[
        {
            "intitule":"electricité",
            "prix":10000
        },
        {
            "intitule":"huisserie",
            "prix":7999.9
        },
        {
            "intitule":"chauffage",
            "prix":3000
        }
    ],
    "prixProposition":60000,
    "locationType":[
        {
            "name":"LM",
            "loyer":1300
        },{
            "name":"LCD",
            "nbNuitMin":20,
            "prixNuit":70
        }
    ]}
*/