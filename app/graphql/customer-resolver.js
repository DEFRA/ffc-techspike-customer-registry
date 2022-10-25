const graphqlFields = require('graphql-fields')
const { queryCustomer } = require('../repository/customer')
const { getItem } = require('../storage')

const checkFields = (info, propertyName) => {
  const topLevelFields = Object.keys(graphqlFields(info))
  return topLevelFields.includes(propertyName)
}

const checkArgs = (info, propertyName) => {
  const fieldsWithSubFieldsArgs = graphqlFields(info, {}, { processArguments: true })
  const args = fieldsWithSubFieldsArgs[propertyName]?.__arguments

  if (args) {
    console.log(args.map(arg => {
      const keyName = Object.keys(arg)[0]
      return { field: keyName, value: arg[keyName].value }
    }))
  }
}

module.exports = async (parent, args, context, info) => {
  console.log(args)
  const customerResult = await queryCustomer(args.sbi)
  const customer = customerResult[0]

  checkArgs(info, 'schemes')

  if (checkFields(info, 'history')) {
    const customerHistory = await getItem(args.sbi)
    customer.history = customerHistory
  }

  return customer
}
