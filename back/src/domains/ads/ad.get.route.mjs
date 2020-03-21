import { getAd } from '../../models/ads.mjs'

export default {
  method: 'GET',
  path: '/api/v1/ads/{id}',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    let id = request.params.id
    return await getAd(id)
  }
}