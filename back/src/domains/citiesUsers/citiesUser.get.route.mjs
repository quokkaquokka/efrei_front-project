import { getCitiesUser } from '../../models/citiesUser.mjs'

export default {
  method: 'GET',
  path: '/api/v1/cities/user/{uid}',
  options: {
    auth: {
      access: {
        scope: 'user'
      }
    }
  },
  handler: async (request, h) => {
    let uid = request.params.uid
    return await getCitiesUser(uid)
  }
}