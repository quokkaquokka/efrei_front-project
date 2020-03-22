import { deleteAd } from '../../models/ads.mjs'

export default {
  method: 'DELETE',
  path: '/api/v1/ads/{id}',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    let id = request.params.id
    return await deleteAd(id)
  }
}