import { updateAd } from '../../models/ads.mjs'

export default {
  method: 'PUT',
  path: '/api/v1/ads',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    const ad = request.payload;
    return await updateAd(ad)
  }
}