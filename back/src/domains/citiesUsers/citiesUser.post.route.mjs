import { insertCityUser } from '../../models/citiesUser.mjs'

export default {
  method: 'POST',
  path: '/api/v1/cities/user',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    const cityUser = request.payload;
    return await insertCityUser(cityUser)
  }
}