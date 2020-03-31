'use strict'
import mongodb from '../services/mongodb.mjs'
import extend from 'lodash/extend.js'

const COLLECTION_NAME = 'citiesUser'

const MODEL = {
  userId: null,
  villeId: null,
  prixMoyen: null,
  hotels: [],
  nbHotels: null,
  quartiers: [],
  attractivites: [],
  routes: [],
  transports: [],
  demographie: null
}

const getCitiesUser = async (uid = undefined) => {
    if(uid === undefined) return []
    return await mongodb.fetch(COLLECTION_NAME, {"userId": uid})
}

const getCityUser = async(uid = undefined, cid = undefined) => {
  if(uid === undefined || cid === undefined) return []
  return await mongodb.fetch(COLLECTION_NAME, {"userId": uid, "villeId": cid})
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
  return await mongodb.remove(COLLECTION_NAME, {"_id": new mongodb.ObjectID(id)})
}

export {
  getCitiesUser,
  getCityUser,
  insertCityUser,
  deleteCityUser
}