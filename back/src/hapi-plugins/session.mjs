'use strict'

import extend from 'lodash/extend.js'
import { findSession } from '../services/sessions.mjs'

const validate = async (decoded, request, h) => {
  const userSession = await findSession(decoded.id)

  if (!userSession) {
    return { isValid: false }
  }

  return { isValid: true, credentials: userSession }
}

const register = async (server, options = {}) => {
  server.auth.strategy('jwt', 'jwt', extend(options, { validate }))

  server.auth.default('jwt')
}

const plugin = {
  name: 'internal-session',
  version: '1.0.0',
  dependencies: ['hapi-auth-jwt2'],
  once: true,
  register,
}

export default plugin
