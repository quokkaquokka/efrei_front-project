import { getCity } from '../../models/cities.mjs'

export default {
  method: 'GET',
  path: '/api/v1/cities/{id}',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    let id = request.params.id
    return await getCity(id)
  }
}