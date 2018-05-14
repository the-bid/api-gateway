const {HttpLink} = require('apollo-link-http')
const { makeRemoteExecutableSchema,
   introspectSchema,
   transformSchema,
  FilterRootFields
 } = require('graphql-tools')
const fetch = require('node-fetch')
const {addAuthHeaderContext} = require('../utils')
const {USERS_URI} = require('../../config')

const filteredTypes = ['auctionIds']

async function getUsersSchema(){
  const http = new HttpLink({uri:USERS_URI,fetch})
  const link = addAuthHeaderContext().concat(http)
  const schema = await introspectSchema(link)
  const usersSchema =  makeRemoteExecutableSchema({
    schema,
    link
  })
  return usersSchema
  /*return transformSchema(usersSchema, [
  new FilterRootFields(
    (operation) => operation !== 'Mutation'
  )
])*/
}

const linkUserSchema = `
  extend type User {
    auctions: [Auction!]!
  }
`

module.exports = {
  getUsersSchema,
  linkUserSchema
}
