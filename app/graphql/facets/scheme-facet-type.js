const graphql = require('graphql')
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql

const schemeFacetType = new GraphQLObjectType({
  name: 'schemeFacet',
  fields: () => ({
    count: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
})

module.exports = schemeFacetType
