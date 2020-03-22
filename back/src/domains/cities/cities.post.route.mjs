import { insertCity } from '../../models/cities.mjs'

export default {
  method: 'POST',
  path: '/api/v1/cities',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    const cities = request.payload;
    return await insertCity(cities)
  }
}