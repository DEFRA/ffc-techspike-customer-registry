const {
  ConsecutiveBreaker,
  ExponentialBackoff,
  retry,
  handleAll,
  circuitBreaker,
  wrap
} = require('cockatiel')

const retryPolicy = retry(handleAll, { maxAttempts: 1, backoff: new ExponentialBackoff() })
retryPolicy.onFailure(() => console.log('Failed to get response from API'))

const circuitBreakerPolicy = circuitBreaker(handleAll, {
  halfOpenAfter: 10 * 1000,
  breaker: new ConsecutiveBreaker(1)
})

const retryWithBreaker = wrap(retryPolicy, circuitBreakerPolicy)

module.exports = retryWithBreaker
