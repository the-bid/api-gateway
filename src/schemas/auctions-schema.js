const { HttpLink } = require('apollo-link-http')
const {
  makeRemoteExecutableSchema,
  introspectSchema /*, transformSchema, FilterRootFields*/
} = require('graphql-tools')
const fetch = require('node-fetch')
const { addAuthHeaderContext } = require('../utils')
const { AUCTIONS_URI } = require('../../config')

async function getAuctionsSchema() {
  const http = new HttpLink({ uri: AUCTIONS_URI, fetch })
  const link = addAuthHeaderContext().concat(http)
  const schema = await introspectSchema(link)
  const auctionsSchema = makeRemoteExecutableSchema({
    schema,
    link
  })
  return auctionsSchema
  /*return transformSchema(auctionsSchema,[
    new FilterRootFields(
      (operation) => operation !== 'Mutation'
    )
  ])*/
}

const linkAuctionSchema = `
  extend type Auction {
    owner: User!
  }
`
//TODO: should I move the above mutation?
module.exports = {
  getAuctionsSchema,
  linkAuctionSchema
}
