const { mergeSchemas } = require('graphql-tools')
const { getUsersSchema, linkUserSchema } = require('./users-schema')
const { getAuctionsSchema, linkAuctionSchema } = require('./auctions-schema')
const { getTournamentsSchema } = require('./tournaments-schema')
const { getBidsSchema, linkBidSchema } = require('./bids-schema')
const gatewaySchema = require('./gateway-schema')
const resolvers = require('../resolvers/merged-resolvers')

async function getAllSchemas() {
  const schemas = await Promise.all([getUsersSchema(), getAuctionsSchema(), getTournamentsSchema(), getBidsSchema()])
  return mergeSchemas({
    schemas: [...schemas, linkUserSchema, linkAuctionSchema, linkBidSchema, gatewaySchema],
    resolvers
  })
}

module.exports = getAllSchemas
