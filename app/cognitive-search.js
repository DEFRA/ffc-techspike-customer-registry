const { SearchIndexClient, AzureKeyCredential } = require('@azure/search-documents')
const { endpoint, key, index } = require('./config').cognitiveSearchConfig

const indexClient = new SearchIndexClient(endpoint, new AzureKeyCredential(key))

const searchQuery = async (searchString, searchFields = [], select = []) => {
  const searchResults = []
  if (searchString.length) {
    const searchClient = indexClient.getSearchClient(index)
    const searchOptions = {
      includeTotalCount: true,
      select,
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
