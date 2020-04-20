import { insertCity } from '../../models/cities.mjs'
import Joi from '@hapi/joi'

export default {
  method: 'POST',
  path: '/api/v1/cities',
  options: {
    auth: {
      access: {
        scope: 'admin'
      }
    },
    validate: {
      payload: Joi.object({
        name: Joi.string(),
        postalCode: Joi.string().allow(null),
        prixMoyen: Joi.number().min(0).max(1000000),
        locataires: Joi.number().min(0).max(100),
        proprietaires: Joi.number().min(0).max(100),
        departement: Joi.string().allow(null),
        tailleLogement: Joi.array()
          .items(
            Joi.object({
              name: Joi.string(),
              pourcentage: Joi.number().min(0).max(100),
              prix: Joi.number().min(0)
          })),
          catSocioprofessionelle: Joi.array()
          .items(
            Joi.object({
              name: Joi.string(),
              chiffre: Joi.number().min(0).max(100),
          })),
        eta_scolaires: Joi.array()
        .items(
          Joi.object({
            name: Joi.string(),
            nb: Joi.number().integer(),
        })),
        parkings: Joi.array()
        .items(
          Joi.object({
            name: Joi.string(),
            chiffre: Joi.number().min(0),
        }))
      }).unknown()
    },
  },
  handler: async (request, h) => {
    const cities = request.payload;
    return await insertCity(cities)
  }
}