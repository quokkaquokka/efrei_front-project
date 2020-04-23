import { updateAd } from '../../models/ads.mjs'

export default {
  method: 'PUT',
  path: '/api/v1/ads',
  options: {
    auth: {
      access: {
        scope: 'admin'
      }
    }
  },
  handler: async (request, h) => {
    const ad = request.payload;
    return await updateAd(ad)
  }
}