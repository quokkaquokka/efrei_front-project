import { getCities } from '../../models/cities.mjs'

export default {
  method: 'GET',
  path: '/api/v1/cities',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    const params = request.query
    return await getCities(params.filters)
  }
}