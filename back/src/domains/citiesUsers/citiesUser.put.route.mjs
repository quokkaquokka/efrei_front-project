import { updateCityUser } from '../../models/citiesUser.mjs'

export default {
  method: 'PUT',
  path: '/api/v1/cities/user',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    const cityUser = request.payload;
    console.log(request.payload)
    return await updateCityUser(cityUser)
  }
}