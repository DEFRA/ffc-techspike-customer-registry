const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLID } = graphql
const schemeType = require('../scheme/scheme-type')
const historyType = require('../history/history-type')

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
    schemes: { args: { name: { type: GraphQLString } }, type: new GraphQLList(schemeType), description: 'The schemes the customer is enrolled in. The schemes can also be filtered by scheme name' },
    history: { type: new GraphQLList(historyType), description: 'The history of the customer' },
    parcels: { type: GraphQLString, description: 'The parcels of the customer as a json string.' },
    payments: { type: GraphQLString, description: 'The payments of the customer as a json string.' }
  })
})

module.exports = customerType
