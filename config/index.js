const microservicesConfig = require('./microservices.config')
const serviceConfig = require('./service.config')

module.exports = {
  ...microservicesConfig,
  ...serviceConfig
}
