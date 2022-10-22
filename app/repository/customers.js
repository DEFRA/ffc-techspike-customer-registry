const config = require('../config').cosmosConfig
const cosmosClient = require('../cosmos')

const queryCustomers = async (continuationToken, maxItemCount = 10) => {
  console.log('queryCustomers', continuationToken)
  const query = 'SELECT * FROM root r'
  const { resources: items, continuationToken: nextPageToken, hasMoreResults, requestCharge } = await cosmosClient.database(config.database).container(config.container)
    .items.query({ query: query }, {
      maxItemCount: maxItemCount > 50 ? 50 : maxItemCount,
      continuationToken
    }).fetchNext()

  console.log(`Request Charge: ${requestCharge}`)
  return { items, nextPageToken, hasMoreResults }
}

module.exports = {
  queryCustomers
}
