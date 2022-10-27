const { TableClient, odata } = require('@azure/data-tables')
const { connectionString, tableName } = require('./config').storageConfig
let tableClient

const connect = async () => {
  console.log('Connecting to storage', connectionString, tableName)
  tableClient = TableClient.fromConnectionString(connectionString, tableName, { allowInsecureConnection: true })
}

const getItem = async (partitionKey) => {
  const items = []
  console.log('Getting item', partitionKey)
  try {
    await connect()
    const entities = tableClient.listEntities({
      queryOptions: { filter: odata`PartitionKey eq ${partitionKey.toString()}` }
    })

    for await (const entity of entities) {
      items.push(entity)
    }
  } catch (error) {
    console.log('Error getting item', error)
  }

  return items
}

module.exports = {
  getItem
}
