import { getAdUser } from '../../models/adsUser.mjs'

export default {
  method: 'GET',
  path: '/api/v1/ads/{aid}/user/{uid}',
  options: {
    auth: {
      access: {
        scope: 'user'
      }
    }
  },
  handler: async (request, h) => {
    let aid = request.params.aid
    let uid = request.params.uid
    return await getAdUser(aid, uid)
  }
}