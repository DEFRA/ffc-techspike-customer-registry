const Joi = require('joi')
const cosmosConfig = require('./cosmos')

const schema = Joi.object({
  port: Joi.number().default(3000),
  env: Joi.string().valid('development', 'test', 'production').default('development'),
  isDev: Joi.boolean().default(false)
})

const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  isDev: process.env.NODE_ENV === 'development'
}

const { error, value } = schema.validate(config, { abortEarly: false })

if (error) {
  throw new Error(`The server config is invalid. ${error.message}`)
}

value.cosmosConfig = cosmosConfig

module.exports = value
