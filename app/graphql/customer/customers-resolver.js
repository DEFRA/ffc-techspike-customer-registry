const { queryCustomers } = require('../../repository/customers')

module.exports = async (parent, args) => {
  const customers = await queryCustomers(args.nextPageToken, args.maxItemCount)
  return customers
}
