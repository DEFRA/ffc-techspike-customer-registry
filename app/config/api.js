
const Joi = require('joi')

const schema = Joi.object({
  landEndpoint: Joi.string().required(),
  ahwrEndpoint: Joi.string().required(),
  ahwrPaymentEndpoint: Joi.string().required()
})

const config = {
  landEndpoint: process.env.LAND_ENDPOINT,
  ahwrEndpoint: process.env.AHWR_ENDPOINT,
  ahwrPaymentEndpoint: process.env.AHWR_PAYMENT_ENDPOINT
}

const { error, value } = schema.validate(config, { abortEarly: false })

if (error) {
  throw new Error(`The api config is invalid. ${error.message}`)
}

module.exports = value
