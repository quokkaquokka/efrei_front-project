const defer = require('config/defer').deferConfig

module.exports = {
  domainFront: 'http://localhost:8080',
  domainBack: 'http://localhost:8000',

  recoveryPasswordToken: {
    cleanInterval: 60 * 60 * 1000, // ms
    duration: 120 // min
  },

  jwt: {
    iss: 'FRONT-PROJECT',
    hashKey: 'JWT_HASH_SECRET_KEY',
    algorithm: 'HS256',
    cleanInterval: 5 * 60 * 1000, // ms
    duration: 15 // min
  },

  hapi: {
    plugins: {
      authJwt2: { name: 'hapi-auth-jwt2' },
      inert: { name: '@hapi/inert' },
      bell: { name: '@hapi/bell' },
      'hapi-auth-jwt': {
        name: 'auth-jwt/index.mjs',
        local: true,
        options: {
          methods: {
            findUserByProvider: async(provider, {email, userId}) => {}, // return user data for jwt is found (and only 1 user for this provider. Throw an error id more than 1), null otherwise
          },
          jwtExpirationValidator: {
            cleanInterval: defer(function() { return [this.jwt.cleanInterval] }), // 5 * 60 * 1000, // ms
          },
          jwt: {
            /// - hapi-auth-jwt2 options
            key: defer(function() { return this.jwt.hashKey }),
            // validate is automatically added
            verifyOptions: {
              ignoreExpiration: false,
              algorithms: defer(function() { return this.jwt.algorithm }), //'HS256'
            },
            urlKey: false,
            cookieKey: false,
            payloadKey: false,
            headerKey: 'authorization', // we allow header only
            tokenType: 'Bearer',

            /// - custom attributs
            issuer: defer(function() { return this.jwt.iss }),  // 'BOILERPLATE',
            duration: defer(function() { return this.jwt.duration }), // 15, // min
          },
        },
        registrationOptions: {
          routes: {
            prefix: "/api/v1/auth",
          },
        },
      },
      'hapi-auth-internal': {
        name: 'auth-internal/index.mjs',
        local: true,
        options: {
          methods: {
            findUserByProvider: function(provider, {email, userId}) {},
            resetUserPassword: function({ resetToken, password }) {},
            addUserIfNotExists: function({ firstname, lastname, email, password, scope: [] }) {},
            addRecoveryToken: function(email) {},
            sendMail: function({from, to, subject, text, /* ...*/}) {},
          },
          password: {
            saltRounds: 10, // bcrypt options, used to generate salt for password
          },
          domain: {
            front: defer(function() { return this.domainFront }),
          },
        },
        registrationOptions: {
          routes: {
            prefix: "/api/v1/auth",
          },
        },
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
