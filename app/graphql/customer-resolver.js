const { queryCustomer } = require('../repository/customer')

module.exports = async (parent, args) => {
  const customer = await queryCustomer(args.sbi)
  return customer[0]
}
