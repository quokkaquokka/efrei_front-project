import { getCitiesbyIds } from '../../models/cities.mjs'

export default {
  method: 'GET',
  path: '/api/v1/cities/ids',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    const params = request.query
    return await getCitiesbyIds(JSON.parse(params.ids))
  }
}