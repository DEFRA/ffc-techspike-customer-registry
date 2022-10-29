const searchQuery = require('../../cognitive-search')

module.exports = async (parent, args) => {
  const customers = await searchQuery(args.searchString, args.searchFields)
  return customers
}
