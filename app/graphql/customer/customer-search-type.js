const graphql = require('graphql')
const customerType = require('./customer-type')
const schemeFacetType = require('../facets/scheme-facet-type')
const { GraphQLObjectType, GraphQLList, GraphQLInt } = graphql

const customerSearchType = new GraphQLObjectType({
  name: 'searchCustomers',
  fields: () => ({
    searchResults: { type: new GraphQLList(customerType) },
    count: { type: GraphQLInt },
    facets: { type: new GraphQLList(schemeFacetType) }
  })
})

module.exports = customerSearchType
