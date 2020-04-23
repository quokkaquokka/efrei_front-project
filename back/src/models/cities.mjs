'use strict'
import mongodb from '../services/mongodb.mjs'
import { deleteCityUserbyCityId }  from './citiesUser.mjs'
import extend from 'lodash/extend.js'
import _ from 'lodash'

const COLLECTION_NAME = 'cities'

/*

Example Model
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
  "schools": [
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
  "_id": "185uyii0o987yyui78"
}
*/

const MODEL = {
  name: null,
  postalCode: null,
  averagePrice: null,
  sizeBuildings: [],
  tenants: null,
  owners: null,
  department: null,
  socioProfessionalCat: [],
  schools: [],
  parkings: []
}

const getCities = async (filters = undefined) => {
  let request = undefined
  if(filters) {
    request = { $text: { $search: filters } }
  }
 
  return await mongodb.fetch(COLLECTION_NAME, request)
}

const getCitiesbyIds = async (filters = []) => {
  let request = undefined
  filters.map(element => {
    return mongodb.ObjectID(element)
  });
  const citiesId = _.reduce(filters, (acc, e) => {
    acc.push(mongodb.ObjectID(e))
    return acc
  }, [])
  request = { _id : { $in : citiesId }}
  return await mongodb.fetch(COLLECTION_NAME, request)
}

const getCity = async(id = undefined) => {
  if(id === undefined) return []
  const data = await mongodb.fetch(COLLECTION_NAME, {'_id': new mongodb.ObjectID(id)})
  return data[0]
}

const insertCity = async city => {
  const cityObj = extend({}, MODEL, city)
  return await mongodb.insert(COLLECTION_NAME, cityObj)
}

const deleteCity = async (id = undefined) => {
  let result = {
    n: 0
  }
  if(id === undefined) return result
  result = await mongodb.remove(COLLECTION_NAME, {'_id': new mongodb.ObjectID(id)})
  if(result.deleteCount === 1) {
    const res = await deleteCityUserbyCityId(id)
  }
  return result
}

const updateCity = async (city = undefined) => {
  const id = city._id
  delete city._id
  try {
    return await mongodb.update(COLLECTION_NAME, { _id: new mongodb.ObjectID(id) }, { $set: { ...city } })
  } catch(e) {
    const result = {
      nModified: 0
    }
    return result
  }
}

export {
  getCities,
  getCitiesbyIds,
  getCity,
  insertCity,
  deleteCity,
  updateCity
}
