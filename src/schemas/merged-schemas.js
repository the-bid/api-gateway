const { mergeSchemas } = require('graphql-tools')
const {getUsersSchema,linkUserSchema} = require('./users-schema')
const {getAuctionsSchema,linkAuctionSchema} = require('./auctions-schema')
const gatewaySchema = require('./gateway-schema')
const resolvers = require('../resolvers/merged-resolvers')

async function getAllSchemas(){
  const schemas= await Promise.all([getUsersSchema(),getAuctionsSchema()])
  return mergeSchemas({
    schemas:[
      ...schemas,
      linkAuctionSchema,
      linkUserSchema,
      gatewaySchema
    ],
    resolvers
  })
}

module.exports = getAllSchemas