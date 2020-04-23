import { deleteCity } from '../../models/cities.mjs'

export default {
  method: 'DELETE',
  path: '/api/v1/cities/{id}',
  options: {
    auth: {
      access: {
        scope: 'admin'
      }
    }
  },
  handler: async (request, h) => {
    let id = request.params.id
    return await deleteCity(id)
  }
}