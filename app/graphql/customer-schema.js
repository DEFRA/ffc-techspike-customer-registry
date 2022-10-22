module.exports = `
type Customer {
  """
  The customer's Single Business Identifier (SBI)
  """
  sbi: Int!

  """
  The customer's first name
  """
  firstname: String!
  
  """
  The customer's last name
  """
  lastname: String!
  
  """
  The customer's email address
  """
  email: String!
  
  """
  The customer's phone number
  """
  phone: String!
  
  """
  The customer's address
  """
  address: String!
  
  """
  The date the customer was created
  """
  createdOn: String!


  """
  The date the customer was last updated
  """
  updatedOn: String!
}

type CustomerQuery {
  customers: [Customer!]!

  """
  Query an individual customer by their Single Business Identifier (SBI)
  """
  customer(sbi: Int!): Customer!
}

schema {
  query: CustomerQuery
}
`
