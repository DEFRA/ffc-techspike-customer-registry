const Graphi = require('graphi')
const schema = require('../graphql/customer-schema')

module.exports = {
  plugin: Graphi,
  options: {
    schema
  }
}
