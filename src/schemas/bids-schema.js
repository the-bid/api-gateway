const { HttpLink } = require('apollo-link-http')
const { makeRemoteExecutableSchema, introspectSchema } = require('graphql-tools')
const fetch = require('node-fetch')
const { addAuthHeaderContext } = require('../utils')
const { BIDS_URI } = require('../../config')

async function getBidsSchema() {
  const http = new HttpLink({ uri: BIDS_URI, fetch })
  const link = addAuthHeaderContext().concat(http)
  const schema = await introspectSchema(link)
  const bidsSchema = makeRemoteExecutableSchema({
    schema,
    link
  })
  return bidsSchema
}

const linkBidsSchema = `
  extend type Bid {
    user: User!
    auction: Auction!
    team: Team!
  }
`
module.exports = {
  getBidsSchema,
  linkBidsSchema
}
