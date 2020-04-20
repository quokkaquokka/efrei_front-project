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
    console.log('Crednetias', request.auth.credentials)
    let id = request.params.id
    return await deleteCity(id)
  }
}