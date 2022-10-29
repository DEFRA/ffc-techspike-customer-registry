const Joi = require('joi')

const schema = Joi.object({
  endpoint: Joi.string().required(),
  key: Joi.string().required(),
  index: Joi.string().required()
})

const config = {
  endpoint: process.env.SEARCH_ENDPOINT,
  key: process.env.SEARCH_KEY,
  index: process.env.SEARCH_INDEX
}

const { error, value } = schema.validate(config, { abortEarly: false })

if (error) {
  throw new Error(`The cognitive search config is invalid. ${error.message}`)
}

module.exports = value
