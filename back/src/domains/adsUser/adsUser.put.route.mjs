import { updateAdUser } from '../../models/adsUser.mjs'

export default {
  method: 'PUT',
  path: '/api/v1/ads/user',
  options: {
    auth: {
      access: {
        scope: 'user'
      }
    }
  },
  handler: async (request, h) => {
    const adsUser = request.payload;
    return await updateAdUser(adsUser)
  }
}