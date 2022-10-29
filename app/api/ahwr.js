const base = require('./base')
const { ahwrEndpoint, ahwrPaymentEndpoint } = require('../config').apiConfig
const retryWithBreaker = require('./circuit-breaker')

const getApplication = async (reference) => {
  const url = `${ahwrEndpoint}application/get/${reference}`
  let application = {}
  try {
    application = await retryWithBreaker.execute(() => base.get(url))
  } catch (err) {
    console.log(`Failed to get application: ${err.message}`)
  }
  return application
}

const getPayments = async (reference) => {
  const url = `${ahwrPaymentEndpoint}payment/${reference}`
  const payment = await base.get(url)
  return payment
}

module.exports = {
  getApplication,
  getPayments
}
