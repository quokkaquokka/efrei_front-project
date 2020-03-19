import { getUsers } from '../../../models/users'

export default {
  method: 'GET',
  path: '/admin/users',
  options: {
    auth: {
      strategy: 'jwt',
      scope: ['admin', 'god'],
      mode: 'required'
    }
  },
  handler: async (request, h) => {
    return await getUsers()
  }
}
