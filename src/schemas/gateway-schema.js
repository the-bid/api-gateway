const { makeExecutableSchema } = require('graphql-tools')
const { importSchema } = require('graphql-import')

const typeDefs = importSchema(__dirname + '/gateway-schema.graphql')

module.exports = makeExecutableSchema({ typeDefs })
