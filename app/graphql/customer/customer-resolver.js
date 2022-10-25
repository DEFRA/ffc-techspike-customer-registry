const checkFields = require('../fields')
const checkArgs = require('../args')
const { queryCustomer } = require('../../repository/customer')
const { getItem } = require('../../storage')

const filterSchemes = (info, customer) => {
  const checkSchemeFilter = checkArgs(info, 'schemes')
  if (checkSchemeFilter.length > 0) {
    if (customer.schemes) {
      customer.schemes = customer.schemes.filter(scheme => checkSchemeFilter.some(filter => filter.name.toLowerCase() === scheme.name.toLowerCase()))
      console.log(customer.schemes)
    }
  }
}

module.exports = async (parent, args, context, info) => {
  console.log(args)
  const customerResult = await queryCustomer(args.sbi)
  const customer = customerResult[0]

  filterSchemes(info, customer)

  if (checkFields(info, 'history')) {
    const customerHistory = await getItem(args.sbi)
    customer.history = customerHistory
  }

  return customer
}
