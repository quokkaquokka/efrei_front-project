import { getCitiesUser } from '../../models/citiesUser.mjs'

export default {
  method: 'GET',
  path: '/api/v1/citiesUser/{id}',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    let id = request.params.id
    return await getCitiesUser(id)
  }
}