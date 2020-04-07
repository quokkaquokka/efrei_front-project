import { updateCity } from '../../models/cities.mjs'

export default {
  method: 'PUT',
  path: '/api/v1/cities',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    const cities = request.payload;
    return await updateCity(cities)
  }
}