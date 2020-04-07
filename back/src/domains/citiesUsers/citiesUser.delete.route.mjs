import { deleteCityUser } from '../../models/citiesUser.mjs'

export default {
  method: 'DELETE',
  path: '/api/v1/cities/user/{id}',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    let id = request.params.id
    return await deleteCityUser(id)
  }
}