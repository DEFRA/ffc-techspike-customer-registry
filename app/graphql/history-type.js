const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql

const historyType = new GraphQLObjectType({
  name: 'History',
  fields: () => ({
    EventType: { type: GraphQLString },
    EventRaised: { type: GraphQLString }
  })
})

module.exports = historyType
