'use strict'
import mongodb from '../services/mongodb.mjs'
import extend from 'lodash/extend.js'

const COLLECTION_NAME = 'adsUser'

/*

Example Model
{
  "_id":5e768b1c9d44000ae0e09b90",
  "annonceId":"51c9d4400e7332c400a38461",
  "userId":"5e734a0a3846ab1c9d440009",
  "adresse":"Pont de Kervaric, 56100 Lorient",
  "autre":"a visiter en juillet",
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
    },
    {
      "name":"LCD",
      "nbNuitMin":20,
      "prixNuit":70
    }
  ]
}
*/

const MODEL = {
    annonceId: null,
    userId: null,
    adresse: null,
    prixProposition: null,
    autre: '',
    pieces: [],
    travauxGeneraux: [],
    locationType: {
        LN: {
        name: 'Location longue durée vide',
        prix: null
        },
        LC: {
        name: 'Colocation',
        prixChambre: null,
        nbChambres: null
        },
        LM: {
        name: 'Location longue durée meublé',
        prix: null
        },
        LM_LCD: {
        name: 'Location mixte (meublé + courte durée)',
        prixLongueDuree: null,
        prixNuit: null,
        nbChambres: null,
        nbMoisCourteDuree: 2,
        minNbNuit: 20
        },
        LCD: {
        name: 'Location courte durée meublé',
        typeLogements: [],
        minNbNuit: 20
        }
    }
}

const getAdsUser = async (uid = undefined) => {
    if(uid === undefined) return []
    return await mongodb.fetch(COLLECTION_NAME, {'userId': uid})
}

const getAdUser = async(aid = undefined, uid = undefined) => {
  if(uid === undefined || aid === undefined) return []
  const data = await mongodb.fetch(COLLECTION_NAME, {'userId': uid, 'annonceId': aid})
  return data[0]
}

const deleteAdUser = async (id = undefined) => {
    const result = {
      n: 0
    }
    if(id === undefined) return result
    return await mongodb.remove(COLLECTION_NAME, { '_id': new mongodb.ObjectID(id) })
}

const deleteAdUserbyAdId = async (id = undefined) => {
    const result = {
      n: 0
    }
    if(id === undefined) return result
    return await mongodb.remove(COLLECTION_NAME, { 'annonceId': id })
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
  updateAdUser,
  deleteAdUserbyAdId
}
