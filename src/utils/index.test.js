const { uuid } = require('casual')
const { parseBearerToken } = require('./index')

describe('utils', () => {
  describe('parseBearerToken', () => {
    let request = {}
    beforeEach(() => {
      request.headers = {
        authorization: `Bearer ${uuid}`
      }
    })
    afterEach(() => {
      request = {}
    })
    test('returns a Bearer token', () => {
      const result = parseBearerToken(request)
      expect(result).toEqual(expect.stringMatching(/^[^Bearer].*$/))
    })
    test('returns null if auth is not a Bearer token', () => {
      request.headers.authorization = `Basic ${uuid}`
      const result = parseBearerToken(request)
      expect(result).toBeNull()
    })
  })
})
