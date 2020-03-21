import { getRecoveryTokens } from '../../../models/recoveryPassword.mjs'

export default {
  method: 'GET',
  path: '/admin/recovery-tokens',
  options: {
    auth: {
      strategy: 'jwt',
      scope: ['admin', 'god'],
      mode: 'required'
    }
  },
  handler: async (request, h) => {
    return await getRecoveryTokens()
  }
}
