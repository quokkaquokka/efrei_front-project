import { getAds } from '../../models/ads.mjs'

export default {
  method: 'GET',
  path: '/api/v1/ads',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    return await getAds()
  }
}
