const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLID } = graphql
const schemeType = require('./scheme-type')

const customerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLID, description: 'The unique identifier for the customer' },
    sbi: { type: GraphQLInt, description: 'Single Business Identifier (SBI)' },
    lastname: { type: GraphQLString, description: 'Customers last name' },
    firstname: { type: GraphQLString, description: 'Customers first name' },
    email: { type: GraphQLString, description: 'Customers email address' },
    phone: { type: GraphQLString, description: 'Customers phone number' },
    address: { type: GraphQLString, description: 'Customers address' },
    createdOn: { type: GraphQLString, description: 'The date the customer was created' },
    updatedOn: { type: GraphQLString, description: 'The date the customer was last updated' },
    schemes: { type: new GraphQLList(schemeType), description: 'The schemes the customer is enrolled in' }
  })
})

module.exports = customerType
