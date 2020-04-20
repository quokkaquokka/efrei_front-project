import { getAdsUser } from '../../models/adsUser.mjs'

export default {
  method: 'GET',
  path: '/api/v1/ads/user/{uid}',
  options: {
    auth: {
      access: {
        scope: 'user'
      }
    }
  },
  handler: async (request, h) => {
    let uid = request.params.uid
    return await getAdsUser(uid)
  }
}