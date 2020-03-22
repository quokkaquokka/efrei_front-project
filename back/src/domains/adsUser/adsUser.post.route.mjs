import { insertAdUser } from '../../models/adsUser.mjs'

export default {
  method: 'POST',
  path: '/api/v1/ads/user',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    const adsUser = request.payload;
    return await insertAdUser(adsUser)
  }
}