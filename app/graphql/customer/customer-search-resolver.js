const searchQuery = require('../../cognitive-search')
// const graphqlFields = require('graphql-fields')

module.exports = async (parent, args, context, info) => {
  // const topLevelFields = Object.keys(graphqlFields(info))
  const customers = await searchQuery(args.searchString, args.searchFields)
  return customers
}
