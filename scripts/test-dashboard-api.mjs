import assert from 'node:assert/strict'
import handler from '../api/dashboard.js'

function createResponse() {
  return {
    headers: {},
    statusCode: 200,
    jsonBody: undefined,
    setHeader(name, value) {
      this.headers[name] = value
    },
    status(code) {
      this.statusCode = code
      return this
    },
    json(body) {
      this.jsonBody = body
      return this
    }
  }
}

async function run(headers = {}) {
  const res = createResponse()
  await handler({ method: 'GET', headers }, res)
  return res
}

delete process.env.DASHBOARD_API_TOKEN
delete process.env.SUPABASE_URL
delete process.env.SUPABASE_SERVICE_ROLE_KEY

const missingConfig = await run()
assert.equal(missingConfig.statusCode, 503)

process.env.DASHBOARD_API_TOKEN = 'test-token'
process.env.SUPABASE_URL = 'https://example.supabase.co'
process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role'

const missingAuth = await run()
assert.equal(missingAuth.statusCode, 401)

console.log('dashboard api guard ok')
