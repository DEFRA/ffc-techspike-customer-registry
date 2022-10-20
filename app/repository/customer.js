const config = require('../config').cosmosConfig
const cosmosClient = require('../cosmos')

const queryContainer = async (sbi) => {
  let resultString = {}
  console.log(`Querying container:\n${config.container}`)

  const querySpec = {
    query: 'SELECT * FROM c WHERE c.sbi = @sbi',
    parameters: [
      {
        name: '@sbi',
        value: sbi
      }
    ]
  }

  const { resources: results } = await cosmosClient
    .database(config.database)
    .container(config.container)
    .items.query(querySpec)
    .fetchAll()

  for (const queryResult of results) {
    resultString = JSON.stringify(queryResult)
    console.log(`\tQuery returned ${resultString}\n`)
  }

  return resultString
}

module.exports = {
  queryContainer
}
