const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql
const customerType = require('./customer-type')
const config = require('../config').cosmosConfig
const cosmosClient = require('../cosmos')

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      customer: {
        type: customerType,
        args: {
          sbi: { type: GraphQLString }
        },
        resolve: (parent, args) => {
          return (async () => {
            console.log(`Querying container:\n${config.container}`)
            const querySpec = {
              query: 'SELECT * FROM c WHERE c.sbi = @sbi',
              parameters: [
                {
                  name: '@sbi',
                  value: args.sbi
                }
              ]
            }

            const { resources: results } = await cosmosClient
              .database(config.database)
              .container(config.container)
              .items.query(querySpec)
              .fetchAll()

            console.log(`\tQuery returned ${JSON.stringify(results)}\n`)

            for (const queryResult of results) {
              const resultString = JSON.stringify(queryResult)
              console.log(`\tQuery returned ${resultString}\n`)
            }
          })()
        }
      }
    }
  })
})

module.exports = schema
