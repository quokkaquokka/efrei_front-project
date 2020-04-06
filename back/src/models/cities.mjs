'use strict'
import mongodb from '../services/mongodb.mjs'
import extend from 'lodash/extend.js'

const COLLECTION_NAME = 'cities'

const MODEL = {
  name: null,
  postalCode: null,
  prixMoyen: null,
  tailleLogement: [],
  locataires: null,
  propriétaires: null,
  catSocioprofessionelle: [],
  eta_scolaires: [],
  parkings: []
}

const getCities = async (filters = undefined) => {
  return await mongodb.fetch(COLLECTION_NAME, filters)
}

const getCity = async(id = undefined) => {
  if(id === undefined) return []
  const data = await mongodb.fetch(COLLECTION_NAME, {"_id": new mongodb.ObjectID(id)})
  return data[0]
}

const insertCity = async city => {
  const cityObj = extend({}, MODEL, city)
  return await mongodb.insert(COLLECTION_NAME, cityObj)
}

const deleteCity = async (id = undefined) => {
  const result = {
    n: 0
  }
  if(id === undefined) return result
  return await mongodb.remove(COLLECTION_NAME, {"_id": new mongodb.ObjectID(id)})
}

export {
  getCities,
  getCity,
  insertCity,
  deleteCity
}

/*

MODEL MONGO
{
  "name": "Dreux",
  "postalCode": "28100",
  "prixMoyen": 1632,
  "tailleLogement": [
    {
      "name": "T1",
      "pourcentage": 4.8,
      "prix": 380
    },
    {
      "name": "T2",
      "pourcentage": 13.7,
      "prix": 455
    },
    {
      "name": "T3",
      "pourcentage": 27.5,
      "prix": 700
    },
    {
      "name": "T4",
      "pourcentage": 29.6,
      "prix": 900
    }
  ],
  "locataires": 57,
  "propriétaires": 43,
  "catSocioprofessionelle": [
    {
      "name": "Actifs",
      "chiffre": 42.6
    },
    {
      "name": "Chomeurs",
      "chiffre": 12.9
    },
    {
      "name": "Retraités",
      "chiffre": 21.9
    },
    {
      "name": "Etudiants",
      "chiffre": 8
    },
    {
      "name": "H/F au foyer",
      "chiffre": 6.8
    },
    {
      "name": "Inactifs",
      "chiffre": 7.8
    }
  ],
  "eta_scolaires": [
    {
      "name": "Ecole primaire",
      "nb": 24
    },
    {
      "name": "Ecole secondaire",
      "nb": 5
    },
    {
      "name": "Ecole de santé",
      "nb": 1
    }
  ],
  "parkings": [
    {
      "name": "Ménages ayant un parking",
      "chiffre": 59
    },
    {
      "name": "Ménages ayant au moins une voiture",
      "chiffre": 79
    }
  ],
  "_id": "185234750"
}
*/