const moment = require('moment')
const checkFields = require('../fields')
const checkArgs = require('../args')
const { queryCustomer } = require('../../repository/customer')
const { getItem } = require('../../storage')
const { getApplication, getPayments } = require('../../api/ahwr')
const { getParcels } = require('../../api/parcels')

const formatDate = (date) => {
  return moment(date, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
}

const filterSchemes = async (info, customer) => {
  const checkSchemeFilter = checkArgs(info, 'schemes')
  if (checkSchemeFilter.length > 0) {
    if (customer.schemes) {
      customer.schemes = customer.schemes.filter(scheme => checkSchemeFilter.some(filter => filter.name.toLowerCase() === scheme.name.toLowerCase()))
      if (checkSchemeFilter[0].name.toLowerCase() === 'ahwr') {
        const ahwr = await getApplication('AHWR-8309-5C4F')
        customer.schemes[0].data = JSON.stringify(ahwr)
      }
    }
  }
}

module.exports = async (parent, args, context, info) => {
  const sbi = args.sbi
  const customerResult = await queryCustomer(sbi)
  const customer = customerResult[0]

  if (customer) {
    await filterSchemes(info, customer)

    if (checkFields(info, 'history')) {
      const customerHistory = await getItem(sbi)
      customerHistory.forEach(history => { history.EventRaised = formatDate(history.EventRaised) })
      customer.history = customerHistory
    }

    if (checkFields(info, 'parcels')) {
      const parcels = await getParcels(sbi)
      customer.parcels = JSON.stringify(parcels)
    }

    if (checkFields(info, 'payments')) {
      const payments = await getPayments('VV-5877-18C1')
      customer.payments = JSON.stringify(payments)
    }
  }

  return customer
}
