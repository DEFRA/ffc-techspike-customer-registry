const graphql = require('graphql')
const customerType = require('./customer-type')
const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLBoolean } = graphql

const customersType = new GraphQLObjectType({
  name: 'Customers',
  fields: () => ({
    items: { type: new GraphQLList(customerType) },
    nextPageToken: { type: GraphQLString },
    hasMoreResults: { type: GraphQLBoolean }
  })
})

module.exports = customersType
