'use strict'

import config from 'config'
import uuid from 'uuid'
import jwt from 'jsonwebtoken'
import { validateCredential } from '../../models/users.mjs'
import { addSession } from '../../services/sessions.mjs'

export default {
  method: 'POST',
  path: '/signin',
  options: {
    auth: {
      mode: 'try'
    }
  },
  handler: async (request, h) => {
    const { username, password } = request.payload
    if (!username || !password) {
      return h.response({ status: 'ERROR', error: 'MISSING_CREDENTIAL' }).code(400)
    }
    const account = await validateCredential(username, password)
    if (!account) {
      return h.response({ status: 'KO', code: 'INVALID_CREDENTIAL' }).code(400)
    }

    const newUserSession = { id: uuid.v4(), user: account }
    var token = jwt.sign(newUserSession, config.session.hashKey, { algorithm: config.session.algorithm })
    addSession(newUserSession)

    return h.response({ status: 'OK', user: account, token }).header('Authorization', token)
  }
}
