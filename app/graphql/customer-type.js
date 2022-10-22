const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString } = graphql

const customerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    sbi: { type: GraphQLString },
    lastname: { type: GraphQLString },
    firstname: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    address: { type: GraphQLString },
    createdOn: { type: GraphQLString },
    updatedOn: { type: GraphQLString }
  })
})

module.exports = customerType
