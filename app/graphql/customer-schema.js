const graphql = require('graphql')
const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLSchema } = graphql
const customerType = require('./customer-type')
const customerTypes = require('./customers-type')
const customerResolver = require('./customer-resolver')
const customersResolver = require('./customers-resolver')

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    description: 'Root query for the customer schema',
    fields: {
      customer: {
        type: customerType,
        description: 'Get a customer by Single Business Identifer (SBI) (required)',
        args: {
          sbi: { type: new GraphQLNonNull(GraphQLInt), description: 'Single Business Identifier (SBI)' }
        },
        resolve: (parent, args) => customerResolver(parent, args)
      },
      customers: {
        type: customerTypes,
        description: 'Get a list of customers',
        args: {
          maxItemCount: { type: GraphQLInt, description: 'The max item count for each page (default: 10 and max: 50)' },
          nextPageToken: { type: GraphQLString, description: 'A Continuation token used as a bookmark for the query’s progress' }
        },
        resolve: (parent, args) => customersResolver(parent, args)
      }
    }
  })
})

module.exports = schema
