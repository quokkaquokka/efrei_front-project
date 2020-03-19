const defer = require('config/defer').deferConfig

module.exports = {
  domainFront: 'http://localhost:8080',
  domainBack: 'http://localhost:8000',

  recoveryPasswordToken: {
    cleanInterval: 60 * 60 * 1000, // ms
    duration: 120 // min
  },

  session: {
    hashKey: 'SESSION_HASH_KEY',
    algorithm: 'HS256',
    cleanInterval: 5 * 60 * 1000, // ms
    duration: 15 // min
  },

  hapi: {
    plugins: {
      authJwt2: { name: 'hapi-auth-jwt2' },
      inert: { name: '@hapi/inert' },
      session: {
        name: 'session.mjs',
        local: true,
        options: {
          key: defer(function() { return this.session.hashKey }),
          cookieKey: false,
          duration: defer(function() { return this.session.duration }), // defer permet to get the session.value of this config object
          verifyOptions: {
            ignoreExpiration: false,
            algorithms: defer(function() { return [this.session.algorithm] }),
          }
        }
      },
      routeLoader: {
        name: 'route-loader.mjs',
        local: true
      },
      static: {
        name: 'statics.mjs',
        local: true,
        options: { rootDir: './public' }
      }
    },
    server: {
      app: {
        mode: 'developpment'
      },
      router: {
        stripTrailingSlash: true
      },
      port: 8000,
      host: 'localhost',
      routes: {
        cors: {
          origin: ['*'],
          credentials: true
        }
      }
    }
  },

  mongodb: {
    username: 'MONGODB_USERNAME',
    password: 'MONGODB_PASSWORD',
    uri: 'MONGODB_URI',
    dbname: 'MONGODB_DBNAME'
  },

  mailgun: {
    domain: 'mailgun.chooseyourself.fr',
    apiKey: 'MAILGUN_APIKEY',
    host: 'api.eu.mailgun.net'
  }
}
