import { removeSession } from '../../services/sessions.mjs'

export default {
  method: 'GET',
  path: '/api/v1/logout',
  options: {},
  handler: (request, h) => {
    if (request.auth.isAuthenticated && request.auth.credentials.id) {
      removeSession(request.auth.credentials.id)
    }
    return h.response({ status: 'ok' })
  }
}
