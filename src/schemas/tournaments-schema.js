const { HttpLink } = require('apollo-link-http')
const { makeRemoteExecutableSchema, introspectSchema } = require('graphql-tools')
const fetch = require('node-fetch')
const { addAuthHeaderContext } = require('../utils')
const { TOURNAMENTS_URI } = require('../../config')

async function getTournamentsSchema() {
  const http = new HttpLink({ uri: TOURNAMENTS_URI, fetch })
  const link = addAuthHeaderContext().concat(http)
  const schema = await introspectSchema(link)
  const tournamentsSchema = makeRemoteExecutableSchema({
    schema,
    link
  })
  return tournamentsSchema
}

module.exports = {
  getTournamentsSchema
}
