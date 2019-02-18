const casual = require('casual')
const { parseBearerToken } = require('./index')

describe('utils', () => {
  describe('parseBearerToken', () => {
    let request = {}
    beforeEach(() => {
      request.headers = {
        authorization: `Bearer ${casual.uuid}`
      }
    })
    afterEach(() => {
      request = {}
    })
    test('returns a Bearer token', () => {
      const result = parseBearerToken(request)
      expect(result).toEqual(expect.stringMatching(/^(?!Bearer).*$/))
    })
    test('returns null if auth is not a Bearer token', () => {
      request.headers.authorization = `Basic ${casual.uuid}`
      const result = parseBearerToken(request)
      expect(result).toBeNull()
    })
  })
})
