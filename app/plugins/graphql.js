const Graphi = require('graphi')
const schema = require('../graphql/schema')

module.exports = {
  plugin: Graphi,
  options: {
    schema
  }
}
