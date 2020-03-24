export default {
  method: 'GET',
  path: '/api/v1/logout',
  options: {},
  handler: (request, h) => {
    request.cookieAuth.clear()
    return h.response({ status: 'ok' })
  }
}
