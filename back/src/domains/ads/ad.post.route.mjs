import { insertAd } from '../../models/ads.mjs'

export default {
  method: 'POST',
  path: '/api/v1/ads',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    const ads = request.payload;
    return await insertAd(ads)
  }
}