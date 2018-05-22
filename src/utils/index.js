const { setContext } = require('apollo-link-context')
const { get } = require('lodash')

function parseBearerToken(request) {
  const authHeader = get(request, 'headers.authorization', '')
  return authHeader.includes('Bearer ') ? authHeader.replace('Bearer ', '') : null
}

function addAuthHeaderContext() {
  return setContext((request, previousContext) => {
    const bearerToken = get(previousContext, 'graphqlContext.bearerToken')
    if (bearerToken) {
      return {
        headers: {
          authorization: `Bearer ${bearerToken}`
        }
      }
    } else {
      return {}
    }
  })
}

module.exports = { parseBearerToken, addAuthHeaderContext }
