import { getAds } from '../../models/ads.mjs'

export default {
  method: 'GET',
  path: '/api/v1/ads',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    const params = request.query
    const filter = params.filters ? JSON.parse(params.filters) : undefined 
    return await getAds(filter)
  }
}
