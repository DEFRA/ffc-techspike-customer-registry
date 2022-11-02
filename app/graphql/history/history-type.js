const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql

const historyType = new GraphQLObjectType({
  name: 'History',
  fields: () => ({
    partitionKey: { type: GraphQLString },
    rowKey: { type: GraphQLString },
    EventType: { type: GraphQLString },
    EventRaised: { type: GraphQLString },
    Payload: { type: GraphQLString },
    Status: { type: GraphQLString }
  })
})

module.exports = historyType
