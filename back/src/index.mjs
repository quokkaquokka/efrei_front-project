'use strict'

import { fileURLToPath } from 'url';
import { dirname } from 'path'
import Hapi from '@hapi/hapi'
import config from 'config'

import mailer from './services/mailer.mjs'
import mongodb from './services/mongodb.mjs'
import pluginLoader from './hapi-plugins/plugins-loader.mjs'
import { addRecoveryToken, tokenRecoveryCleaner } from "./models/recoveryPassword.mjs";
import {
  attachProvider,
  getUserByProvider,
  checkIfProviderIdentityAlreadyUsed,
  addUserIfNotExists,
  resetPassword,
} from "./models/users.mjs";

config.hapi.plugins['hapi-auth-jwt'].options.methods.findUserByProvider = getUserByProvider

config.hapi.plugins['hapi-auth-internal'].options.methods.findUserByProvider = getUserByProvider
config.hapi.plugins['hapi-auth-internal'].options.methods.resetUserPassword = resetPassword
config.hapi.plugins['hapi-auth-internal'].options.methods.addUserIfNotExists = addUserIfNotExists
config.hapi.plugins['hapi-auth-internal'].options.methods.addRecoveryToken = addRecoveryToken
config.hapi.plugins['hapi-auth-internal'].options.methods.sendMail = mailer.send

config.hapi.plugins['hapi-auth-external'].options.methods.attachProvider = attachProvider
config.hapi.plugins['hapi-auth-external'].options.methods.checkIfProviderIdentityAlreadyUsed = checkIfProviderIdentityAlreadyUsed


const hapiServer = async function() {
  const server = Hapi.server(config.hapi.server)

  server.app.cwd = dirname(fileURLToPath(import.meta.url))

  await server.register({
    plugin: pluginLoader,
    options: {
      plugins: config.hapi.plugins
    }
  })

  await server.start()
  console.log(`Server started at: ${server.info.uri}`)


  console.log('--- Routes loaded ---')
  const table = server.table()
  table.forEach(t => {
    console.log(t.method, t.path)
  })
}

const start = async function() {
  try {
    await mongodb.connect()
    await hapiServer()
    tokenRecoveryCleaner()
  } catch (error) {
    console.error(error)
    mongodb.disconnect()
    process.exit(1)
  }
}

start()
