const { GraphQLServer } = require('graphql-yoga')
const { graphql } = require('graphql')
const { get } = require('lodash')
const { PORT } = require('../config')
const mergedSchemas = require('./schemas/merged-schemas')
const { parseBearerToken } = require('./utils')

async function run() {
  try {
    const schema = await mergedSchemas()
    const server = new GraphQLServer({
      schema,
      context: async req => {
        const context = { ...req }
        if (req.request.headers.authorization) {
          const { data } = await graphql(
            schema,
            `
              {
                getJWT {
                  token
                  expiresIn
                }
              }
            `,
            null,
            { bearerToken: parseBearerToken(req.request) }
          )
          context.bearerToken = get(data, 'getJWT.token')
        }
        return context
      }
    })
    /* eslint-disable no-console */
    server.start(
      {
        port: PORT
      },
      () => console.log(`the-bid-gateway is running on port: ${PORT}`)
    )
  } catch (error) {
    console.log(`Error starting server: ${error}`)
  }
  /* eslint-enable no-console */
}

run()
