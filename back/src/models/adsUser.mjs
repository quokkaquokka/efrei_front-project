'use strict'
import mongodb from '../services/mongodb.mjs'
import extend from 'lodash/extend.js'

const COLLECTION_NAME = 'adsUser'

const MODEL = {
    annonceId: null,
    userId: null,
    adresse: null,
    pieces:[],
    travauxGeneraux:[],
    prixProposition: null,
    locationType:[]
}

const getAdsUser = async (uid = undefined) => {
    if(uid === undefined) return []
    return await mongodb.fetch(COLLECTION_NAME, {"userId": uid})
}

const getAdUser = async(aid = undefined, uid = undefined) => {
  if(uid === undefined || aid === undefined) return []
  const data = await mongodb.fetch(COLLECTION_NAME, {"userId": uid, "annonceId": aid})
  return data[0]
}

const deleteAdUser = async (id = undefined) => {
    const result = {
      n: 0
    }
    if(id === undefined) return result
    return await mongodb.remove(COLLECTION_NAME, {"_id": new mongodb.ObjectID(id)})
}

const insertAdUser = async adUser => {
    console.log('Insert Ad', typeof adUser)
    const adUserObj = extend({}, MODEL, adUser)
    return await mongodb.insert(COLLECTION_NAME, adUserObj)
}

const updateAdUser = async (adUser = undefined) => {
    const id = adUser._id
    delete adUser._id
    try {
      return await mongodb.update(COLLECTION_NAME, { _id: new mongodb.ObjectID(id) }, { $set: { ...adUser } })
    } catch(e) {
      const result = {
        nModified: 0
      }
      return result
    }
}

export {
  getAdsUser,
  getAdUser,
  deleteAdUser,
  insertAdUser,
  updateAdUser
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
    ]
}
*/