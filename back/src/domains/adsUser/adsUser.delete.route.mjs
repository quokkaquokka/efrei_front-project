import { deleteAdUser } from '../../models/adsUser.mjs'

export default {
  method: 'DELETE',
  path: '/api/v1/ads/user/{id}',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    let id = request.params.id
    return await deleteAdUser(id)
  }
}