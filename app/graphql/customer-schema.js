const graphql = require('graphql')
const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLInt, GraphQLString, GraphQLSchema } = graphql
const customerType = require('./customer/customer-type')
const customerTypes = require('./customer/customers-type')
const customerResolver = require('./customer/customer-resolver')
const customersResolver = require('./customer/customers-resolver')
const customerSearchResolver = require('./customer/customer-search-resolver')

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      customer: {
        type: customerType,
        description: 'Get a customer by Single Business Identifer (SBI) (required)',
        args: {
          sbi: { type: new GraphQLNonNull(GraphQLInt), description: 'Single Business Identifier (SBI)' }
        },
        resolve: (parent, args, context, info) => customerResolver(parent, args, context, info)
      },
      customers: {
        type: customerTypes,
        description: 'Get a list of customers',
        args: {
          maxItemCount: { type: GraphQLInt, description: 'The max item count for each page (default: 10 and max: 50)' },
          nextPageToken: { type: GraphQLString, description: 'A continuation token used as a bookmark for the query’s progress' }
        },
        resolve: (parent, args) => customersResolver(parent, args)
      },
      searchCustomers: {
        type: new GraphQLList(customerType),
        description: 'Get a list of customers via search',
        args: {
          searchString: { type: new GraphQLNonNull(GraphQLString), description: 'The search string' },
          searchFields: { type: new GraphQLList(GraphQLString), description: 'The search fields' }
        },
        resolve: (parent, args, context, info) => customerSearchResolver(parent, args, context, info)
      }
    }
  })
})

module.exports = schema
