'use strict'

export default {
  method: 'GET',
  path: '/private',
  options: {
    auth: {
      strategy: 'jwt',
      scope: 'god',
      mode: 'required'
    }
  },
  handler: function(request, h) {
    return 'private'
  }
}
