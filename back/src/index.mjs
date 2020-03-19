'use strict'

import { fileURLToPath } from 'url';
import { dirname } from 'path'
import Hapi from '@hapi/hapi'
import config from 'config'

import mongodb from './services/mongodb.mjs'
import pluginLoader from './hapi-plugins/plugins-loader.mjs'
import { sessionCleaner } from './services/sessions.mjs'
import { tokenRecoveryCleaner } from './models/recoveryPassword.mjs'

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
}

const start = async function() {
  try {
    await mongodb.connect()
    await hapiServer()
    sessionCleaner()
    tokenRecoveryCleaner()
  } catch (error) {
    console.error(error)
    mongodb.disconnect()
    process.exit(1)
  }
}

start()
