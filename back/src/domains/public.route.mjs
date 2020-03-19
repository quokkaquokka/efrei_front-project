'use strict'

export default {
  method: 'GET',
  path: '/public',
  options: {
    auth: false
  },
  handler: function(request, h) {
    return 'public'
  }
}
