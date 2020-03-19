'use strict'

import { resetPassword } from '../../models/users.mjs'

export default {
  method: 'POST',
  path: '/reset-password',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    const { password, resetToken } = request.payload
    if (!resetToken || !password) {
      return h.response({ status: 'ERROR', code: 'MISSING_ATTRIBUTS' }).code(400)
    }

    try {
      await resetPassword({ resetToken, password })

    } catch (err) {
      console.log('err', err)
    }

    return h.response({ status: 'OK' })
  }
}
