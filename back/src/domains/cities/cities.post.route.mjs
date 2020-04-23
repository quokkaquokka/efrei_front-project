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
        averagePrice: Joi.number().min(0).max(1000000),
        tenants: Joi.number().min(0).max(100),
        owners: Joi.number().min(0).max(100),
        department: Joi.string().allow(null),
        sizeBuildings: Joi.array()
          .items(
            Joi.object({
              name: Joi.string(),
              percent: Joi.number().min(0).max(100),
              price: Joi.number().min(0)
          })),
          socioProfessionalCat: Joi.array()
          .items(
            Joi.object({
              name: Joi.string(),
              percent: Joi.number().min(0).max(100),
          })),
        schools: Joi.array()
        .items(
          Joi.object({
            name: Joi.string(),
            number: Joi.number().integer(),
        })),
        parkings: Joi.array()
        .items(
          Joi.object({
            name: Joi.string(),
            number: Joi.number().min(0),
        }))
      }).unknown()
    },
  },
  handler: async (request, h) => {
    const cities = request.payload;
    return await insertCity(cities)
  }
}