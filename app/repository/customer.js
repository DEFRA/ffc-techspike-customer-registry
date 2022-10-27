const config = require('../config').cosmosConfig
const cosmosClient = require('../cosmos')

const queryCustomer = async (sbi) => {
  const query = 'SELECT * FROM c where c.sbi = @sbi'
  const params = [{ name: '@sbi', value: sbi }]
  const { resources: items, requestCharge } = await cosmosClient.database(config.database).container(config.container)
    .items.query({ query: query, parameters: params }).fetchAll()
  console.log(`Request Charge: ${requestCharge}`)
  return items
}

module.exports = {
  queryCustomer
}
