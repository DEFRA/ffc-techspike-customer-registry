const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql

const schemeType = new GraphQLObjectType({
  name: 'Schemes',
  fields: () => ({
    name: { type: GraphQLString },
    reference: { type: GraphQLString }
  })
})

module.exports = schemeType
