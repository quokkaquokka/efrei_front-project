'use strict'
import mongodb from '../services/mongodb.mjs'
import extend from 'lodash/extend.js'
import { deleteAdUserbyAdId } from './adsUser.mjs'

const COLLECTION_NAME = 'ads'

/*

Example Model
{
  "title": "Maison/villa de 118 m² - 5 chambres - LORIENT ",
  "pictures": [
    "https://www.iadfrance.fr/cache/ad_photo/photo/72018784.jpg",
    "https://www.iadfrance.fr/cache/ad_photo/photo/72018786.jpg",
    "https://www.iadfrance.fr/cache/ad_photo/photo/72018788.jpg",
    "https://www.iadfrance.fr/cache/ad_photo/photo/72018790.jpg",
    "https://www.iadfrance.fr/cache/ad_photo/photo/72018792.jpg",
    "https://www.iadfrance.fr/cache/ad_photo/photo/72018794.jpg",
    "https://www.iadfrance.fr/cache/ad_photo/photo/72018796.jpg",
    "https://www.iadfrance.fr/cache/ad_photo/photo/72018798.jpg"
  ],
  "idAd": "744931",
  "city": "Lorient",
  "source": "iad",
  "type": "maison",
  "price": 335000,
  "postalCode": "56100",
  "buildingArea": 118,
  "pricem2": 2839,
  "transaction": "vente",
  "description": "<p>iad France - Pascal BIGOT vous propose : LORIENT KREISKER, au sein de ce quartier réputé pour son ambiance chaleureuse et CALME, cette maison TOTALEMENT rénovée par des artisans reconnus, avec uniquement des matériaux de QUALITÉ SUPÉRIEURE, vous propose la chaleur de son parquet et des radiateurs fonte. Vaste espace de vie traversant avec accès terrasse. Au premier étage, 2 chambres, salle d'eau, et la suite parentale avec dressing-salle d'eau. Le dernier étage, toujours desservi par l'escalier bois, 2 autres grandes chambres avec salle d'eau/wc. Pour votre stockage: vélo, voiture...l'espace buanderie... tout est prévu dans le garage avec porte électrique. Pour la détente, les enfants, le jardin de 100m² environ entièrement clos, exposé sud-ouest vous permet de profiter pleinement de votre extérieur. Jardinet paysager devant la maison.<br>PAS de travaux, parquet, garage, suite parentale, 4 chambres, jardin, électro ménager de marque... Dossier technique et photos supplémentaires sur demande.<br>Cette annonce correspond à votre recherche ? Contactez moi pour échanger sur votre projet et, convenir le cas échéant d'une visite.<br><br><br>Honoraires d’agence à la charge du vendeur.Information d'affichage énergétique sur ce bien : DPE D indice 159 et GES E indice 37. La présente annonce immobilière a été rédigée sous la responsabilité éditoriale de M. Pascal BIGOT (ID 20241), Agent Commercial mandataire en immobilier immatriculé au Registre Spécial des Agents Commerciaux (RSAC) du Tribunal de Commerce de LORIENT sous le numéro 535333025.<br>Retrouvez tous nos biens sur notre site internet. www.iadfrance.com</p>",
  "newBuilding": false,
  "permalink": "https://www.iadfrance.fr/annonce/maison-villa-vente-6-pieces-lorient-118m2/r744931?_locale=fr",
  "phone": "06 24 52 05 63",
  "equipments": [
    "Cable TV",
    "Terrasse",
    "Placards"
  ],
  "areaLand": 0,
  "rooms": 6,
  "bedRooms": 5,
  "constructionDate": "1962",
  "_id": "185233870"
}
*/


const MODEL = {
  title: null,
  pictures: [],
  idAd: null,
  city: null,
  source: null,
  type: null,
  price: null,
  postalCode: null,
  buildingArea: null,
  pricem2: null,
  transaction: 'vente',
  description: null,
  newBuilding: false,
  permalink: null,
  phone: null,
  equipments: [],
  areaLand: 0,
  rooms: null,
  bedRooms: null,
  constructionDate: 'N.C'
}


const getAds = async (filters = undefined) => {
  let request = undefined
  if(filters) {
    if(filters.searchAdvanced) {
      let text = ''
      const details = filters.searchAdvanced
      if(details.house)
        text += 'maison '
      if(details.appartment)
        text += 'appartement '
      if(details.land)
        text += 'terrain '
      request = {
        $and : [
          { $text: { $search: text } },
        ]
      };
      if(details.newBuilding && details.oldBuilding === false)
        request.$and.push({ newBuilding: details.neuf })
      if(filters.city)
        request.$and.push({ city: filters.city })
      const price = parseInt(details.price);
      if(price > 0)
        request.$and.push({ price: { $lte : price } })
      const pricem2 = parseInt(details.pricem2);
      if(pricem2 > 0)
        request.$and.push({ pricem2: { $lte : pricem2 } })
      const buildingArea = parseInt(details.buildingArea);
      if(buildingArea > 0)
        request.$and.push({ buildingArea: { $gte : buildingArea } })
    }
    else {
      request = { city: filters.city}
    }
  }
  const response = await mongodb.fetch(COLLECTION_NAME, request)
  return response
}
const getAd = async(id = undefined) => {
  if(id === undefined) return []
  const data = await mongodb.fetch(COLLECTION_NAME, {"_id": new mongodb.ObjectID(id)})
  return data[0]
}

const insertAd = async ad => {
  const adObj = extend({}, MODEL, ad)
  return await mongodb.insert(COLLECTION_NAME, adObj)
}

const deleteAd = async (id = undefined) => {
  let result = {
    n: 0
  }
  if(id === undefined) return result
  result = await mongodb.remove(COLLECTION_NAME, {"_id": new mongodb.ObjectID(id)})
  if(result.deleteCount === 1) {
    const res = await deleteAdUserbyAdId(id)
  }
  return result
}

const updateAd = async (ad = undefined) => {
  const id = ad._id
  delete ad._id
  try {
    return await mongodb.update(COLLECTION_NAME, { _id: new mongodb.ObjectID(id) }, { $set: { ...ad } })
  } catch(e) {
    const result = {
      nModified: 0
    }
    return result
  }
}

export {
  getAds,
  getAd,
  insertAd,
  deleteAd,
  updateAd
}
