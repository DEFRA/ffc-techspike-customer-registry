const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql

const schemeType = new GraphQLObjectType({
  name: 'Schemes',
  fields: () => ({
    name: { type: GraphQLString, description: 'The name of the scheme' },
    reference: { type: GraphQLString, description: 'The reference of the scheme' },
    data: { type: GraphQLString, description: 'The data in json stringify format. Only returned when filtering on a scheme' }
  })
})

module.exports = schemeType
