const config = require('./config')
const Hapi = require('@hapi/hapi')
const Graphi = require('graphi')
const schema = require('./graphql/customer-schema')

async function createServer () {
  const server = Hapi.server({
    port: config.port,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    },
    router: {
      stripTrailingSlash: true
    }
  })

  await server.register({ plugin: Graphi, options: { name: 'grahql', schema } })

  await server.register(require('@hapi/inert'))
  await server.register(require('@hapi/vision'))
  await server.register(require('./plugins/router'))

  return server
}

module.exports = createServer
