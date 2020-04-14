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
  const data = await mongodb.fetch(COLLECTION_NAME, {"userId": uid, "villeId": cid})
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
  return await mongodb.remove(COLLECTION_NAME, {"_id": new mongodb.ObjectID(id)})
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
  updateCityUser
}