const { SearchIndexClient, AzureKeyCredential } = require('@azure/search-documents')
const { endpoint, key, index } = require('./config').cognitiveSearchConfig

const indexClient = new SearchIndexClient(endpoint, new AzureKeyCredential(key))

const searchQuery = async (searchString, searchFields = [], select = []) => {
  let searchResults = []
  let count = 0
  let facets = []
  if (searchString.length) {
    const searchClient = indexClient.getSearchClient(index)
    const searchOptions = {
      includeTotalCount: true,
      select,
      searchFields,
      facets: ['schemes']
    }

    const searchQueryResults = await searchClient.search(searchString, searchOptions)
    for await (const result of searchQueryResults.results) {
      searchResults.push(result.document)
    }

    facets = searchQueryResults.facets.schemes.map(facet => {
      const scheme = JSON.parse(facet.value)
      return {
        name: scheme.name,
        count: facet.count
      }
    })
    count = searchQueryResults.count
  }

  searchResults = searchResults.map(customer => {
    return {
      ...customer,
      schemes: customer.schemes.map(scheme => JSON.parse(scheme))
    }
  })

  return { searchResults, facets, count }
}

module.exports = searchQuery
