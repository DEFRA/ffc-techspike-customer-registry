const { SearchIndexClient, AzureKeyCredential } = require('@azure/search-documents')
const { endpoint, key, index } = require('./config').cognitiveSearchConfig

const indexClient = new SearchIndexClient(endpoint, new AzureKeyCredential(key))

const searchQuery = async (searchString, searchFields = []) => {
  const searchResults = []
  if (searchString.length) {
    const searchClient = indexClient.getSearchClient(index)
    console.log('Query #1 - search everything:')
    const searchOptions = {
      includeTotalCount: true,
      select: ['sbi', 'firstname', 'lastname', 'email', 'company', 'phone', 'address'],
      searchFields
    }

    const searchQueryResults = await searchClient.search(searchString, searchOptions)
    for await (const result of searchQueryResults.results) {
      searchResults.push(result.document)
    }
    console.log(`Result count: ${searchQueryResults.count}`)
  }

  return searchResults
}

module.exports = searchQuery
