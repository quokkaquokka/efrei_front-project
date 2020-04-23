'use strict'
import mongodb from '../services/mongodb.mjs'
import extend from 'lodash/extend.js'

const COLLECTION_NAME = 'citiesUser'

const MODEL = {
  userId: null,
  cityId: null,
  hotels: [],
  hotelsCount: null,
  streets: [],
  attractivities: [],
  roads: [],
  publicTransports: [],
  demography: null
}
/*

Example Model
{
  "_id": "5e9f787fad32d54cc31a8eii",
  "userId":"5e9d5ffc5b9rth6789yui6",
  "cityId":"5e7332071c40000a384609d4",
  "prixMoyen":null,
  "hotels":[
    {"name":"Campanile","prix":"50"},
    {"name":"B&B HOTEL","prix":"64"},
    {"name":"Hotel Beffroi","prix":"94"},
    {"name":"Hotel Premiere Classe","prix":"31"},
    {"name":"Domaines de la reposée","prix":"99"}
  ],
  "nbHotels":11,
  "quartiers":[
    "quartier de la gare",
    "quartier de l'hopital",
    "zone commercial nord",
    "zone commerciale sud"
  ],
  "attractivites":[
    {"name":"Hopital","nb":1},
    {"name":"Zone commerciale ","nb":2,"description":"grande zone = activité"}
  ],
  "routes":["N12"],
  "transports":["TER","bus"],
  "demographie":"En conctantes augmentation"
}
*/
const getCitiesUser = async (uid = undefined) => {
    if(uid === undefined) return []
    return await mongodb.fetch(COLLECTION_NAME, {'userId': uid})
}

const getCityUser = async(uid = undefined, cid = undefined) => {
  if(uid === undefined || cid === undefined) return []
  const data = await mongodb.fetch(COLLECTION_NAME, {'userId': uid, 'cityId': cid})
  return data[0]
}

const insertCityUser = async cityUser => {
  const cityUserObj = extend({}, MODEL, cityUser)
  return await mongodb.insert(COLLECTION_NAME, cityUserObj)
}

const deleteCityUser = async (id = undefined) => {
  const result = {
    n: 0
  }
  if(id === undefined) return result
  return await mongodb.remove(COLLECTION_NAME, {'_id': new mongodb.ObjectID(id)})
}

const deleteCityUserbyCityId = async (id = undefined) => {
  const result = {
    n: 0
  }
  if(id === undefined) return result
  return await mongodb.remove(COLLECTION_NAME, {'cityId': id})
}

const updateCityUser = async (cityUser = undefined) => {
  if(!cityUser) return {
    nModified: 0
  }
  const id = cityUser._id
  delete cityUser._id
  try {
    return await mongodb.update(COLLECTION_NAME, { _id: new mongodb.ObjectID(id) }, { $set: { ...cityUser } })
  } catch(e) {
    const result = {
      nModified: 0
    }
    return result
  }
}

export {
  getCitiesUser,
  getCityUser,
  insertCityUser,
  deleteCityUser,
  updateCityUser,
  deleteCityUserbyCityId
}