export default {
  method: 'GET',
  path: '/logout',
  options: {},
  handler: (request, h) => {
    request.cookieAuth.clear()
    return h.response({ status: 'ok' })
  }
}
