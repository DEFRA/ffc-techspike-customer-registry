const Joi = require('joi')
const { queryCustomer } = require('../repository/customer')
const sbiSchema = require('./schemas/sbi')

module.exports = [{
  method: 'GET',
  path: '/customer/{sbi}',
  options: {
    validate: {
      params: Joi.object()
        .concat(sbiSchema),
      failAction: async (request, h, error) => {
        return h.redirect('/customer').code(404).takeover()
      }
    }
  },
  handler: async (request, h) => {
    const sbi = request.params.sbi
    const customer = await queryCustomer(sbi)
    return h.response(customer ?? JSON.parse(customer)).code(200)
  }
},
{
  method: 'graphql',
  path: '/customer',
  options: {
    handler: async (request, h) => {
      const { sbi } = request.payload
      console.log('request.payload', request.payload, sbi)
      const customer = await queryCustomer(sbi)
      console.log(`\tQuery returned ${JSON.stringify(customer)}\n`)
      return customer[0]
    }
  }
}]
