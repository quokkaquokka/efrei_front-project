'use strict'
import mongodb from '../services/mongodb.mjs'
import extend from 'lodash/extend.js'

const COLLECTION_NAME = 'ads'

const MODEL = {
  titre: null,
  img: [],
  id_annonce: null,
  ville: null,
  source: null,
  type: null,
  prix: null,
  cp: null,
  surface: null,
  prixm2: null,
  rendement: -1,
  loyer: -1,
  investissement: null,
  transaction: "vente",
  description: null,
  neuf: false,
  permalien: null,
  phone: null,
  equipement: [],
  surface_terrain: 0,
  nbpieces: null,
  nbchambres: null,
  date_construction: "N.C"
}


const getAds = async (filters = undefined) => {
  return await mongodb.fetch(COLLECTION_NAME, filters)
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
  const result = {
    n: 0
  }
  if(id === undefined) return result
  return await mongodb.remove(COLLECTION_NAME, {"_id": new mongodb.ObjectID(id)})
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


/*

MODEL
Model example
{
  "titre": "Maison/villa de 118 m² - 5 chambres - LORIENT ",
  "img": [
    "https://www.iadfrance.fr/cache/ad_photo/photo/72018784.jpg",
    "https://www.iadfrance.fr/cache/ad_photo/photo/72018786.jpg",
    "https://www.iadfrance.fr/cache/ad_photo/photo/72018788.jpg",
    "https://www.iadfrance.fr/cache/ad_photo/photo/72018790.jpg",
    "https://www.iadfrance.fr/cache/ad_photo/photo/72018792.jpg",
    "https://www.iadfrance.fr/cache/ad_photo/photo/72018794.jpg",
    "https://www.iadfrance.fr/cache/ad_photo/photo/72018796.jpg",
    "https://www.iadfrance.fr/cache/ad_photo/photo/72018798.jpg"
  ],
  "id_annonce": "744931",
  "ville": "Lorient",
  "source": "iad",
  "type": "maison",
  "prix": 335000,
  "cp": "56100",
  "surface": 118,
  "prixm2": 2839,
  "rendement": -1,
  "loyer": -1,
  "investissement": 169437,
  "transaction": "vente",
  "description": "<p>iad France - Pascal BIGOT vous propose : LORIENT KREISKER, au sein de ce quartier réputé pour son ambiance chaleureuse et CALME, cette maison TOTALEMENT rénovée par des artisans reconnus, avec uniquement des matériaux de QUALITÉ SUPÉRIEURE, vous propose la chaleur de son parquet et des radiateurs fonte. Vaste espace de vie traversant avec accès terrasse. Au premier étage, 2 chambres, salle d'eau, et la suite parentale avec dressing-salle d'eau. Le dernier étage, toujours desservi par l'escalier bois, 2 autres grandes chambres avec salle d'eau/wc. Pour votre stockage: vélo, voiture...l'espace buanderie... tout est prévu dans le garage avec porte électrique. Pour la détente, les enfants, le jardin de 100m² environ entièrement clos, exposé sud-ouest vous permet de profiter pleinement de votre extérieur. Jardinet paysager devant la maison.<br>PAS de travaux, parquet, garage, suite parentale, 4 chambres, jardin, électro ménager de marque... Dossier technique et photos supplémentaires sur demande.<br>Cette annonce correspond à votre recherche ? Contactez moi pour échanger sur votre projet et, convenir le cas échéant d'une visite.<br><br><br>Honoraires d’agence à la charge du vendeur.Information d'affichage énergétique sur ce bien : DPE D indice 159 et GES E indice 37. La présente annonce immobilière a été rédigée sous la responsabilité éditoriale de M. Pascal BIGOT (ID 20241), Agent Commercial mandataire en immobilier immatriculé au Registre Spécial des Agents Commerciaux (RSAC) du Tribunal de Commerce de LORIENT sous le numéro 535333025.<br>Retrouvez tous nos biens sur notre site internet. www.iadfrance.com</p>",
  "neuf": false,
  "permalien": "https://www.iadfrance.fr/annonce/maison-villa-vente-6-pieces-lorient-118m2/r744931?_locale=fr",
  "phone": "06 24 52 05 63",
  "equipement": [
    "Cable TV",
    "Terrasse",
    "Placards"
  ],
  "surface_terrain": 0,
  "nbpieces": 6,
  "nbchambres": 5,
  "date_construction": "1962",
  "_id": "185233870"
}

*/


