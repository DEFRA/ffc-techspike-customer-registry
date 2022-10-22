const config = require('../config').cosmosConfig
const cosmosClient = require('../cosmos')

const queryCustomer = async (sbi) => {
  const query = 'SELECT * FROM c WHERE c.sbi= @sbi'
  const params = [{ name: '@sbi', value: 244092792 }]
  const { resources: items } = await cosmosClient.database(config.database).container(config.container)
    .items.query({ query: query, parameters: params }).fetchAll()

  return items
}

module.exports = {
  queryCustomer
}
