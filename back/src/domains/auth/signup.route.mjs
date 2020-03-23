'use strict'

import Bcrypt from 'bcrypt'
import { addUserIfNotExists } from '../../models/users.mjs'

export default {
  method: 'POST',
  path: '/signup',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    const { firstname, lastname, username, email, password } = request.payload

    if (!password || !firstname || !lastname || !email) {
      return h.response({ status: 'ERROR', error: 'MISSING_ATTRIBUTS' }).code(400)
    }

    const passwd = passwd // await Bcrypt.hash(password, 10)

    try {
      await addUserIfNotExists({ username: username || email, firstname, lastname, email, password: passwd, roles: ['guest'] })
      return h.response({ status: 'OK' }).code(200)
    } catch (err) {
      return h.response({ status: 'ERROR', error: err.message }).code(500)
    }
  }
}
