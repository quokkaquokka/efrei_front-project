import { getCityUser } from '../../models/citiesUser.mjs'

export default {
  method: 'GET',
  path: '/api/v1/cities/{cid}/user/{uid}',
  options: {
    auth: {
      access: {
        scope: 'user'
      }
    }
  },
  handler: async (request, h) => {
    let cid = request.params.cid
    let uid = request.params.uid
    return await getCityUser(uid, cid)
  }
}