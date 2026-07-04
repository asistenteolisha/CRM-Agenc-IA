import assert from 'node:assert/strict'
import handler from '../api/lead.js'

function createResponse() {
  return {
    headers: {},
    statusCode: 200,
    jsonBody: undefined,
    ended: false,
    setHeader(name, value) {
      this.headers[name] = value
    },
    status(code) {
      this.statusCode = code
      return this
    },
    json(body) {
      this.jsonBody = body
      this.ended = true
      return this
    },
    end() {
      this.ended = true
      return this
    }
  }
}

async function runCase(body) {
  const req = {
    method: 'POST',
    headers: {
      origin: 'https://www.agenciadia.tech',
      'user-agent': 'lead-smoke-test',
      referer: 'http://localhost/?utm_source=google&utm_medium=cpc&utm_campaign=dia-2'
    },
    body: JSON.stringify(body)
  }
  const res = createResponse()
  await handler(req, res)
  return res
}

const missingConsent = await runCase({
  name: 'Lead sin consentimiento',
  email: 'sin-consentimiento@example.com',
  phone: '+573000000000'
})

assert.equal(missingConsent.statusCode, 400)
assert.equal(missingConsent.jsonBody?.error, 'Data consent is required')

const validLead = await runCase({
  name: 'Daniel Martinez',
  business_type: 'Agencia',
  phone: '+573012604061',
  email: 'daniel@example.com',
  service_interest: 'Agente de WhatsApp',
  need: 'Quiero automatizar captaciÃ³n de leads',
  data_consent: true,
  utm_source: 'google',
  utm_medium: 'cpc',
  utm_campaign: 'dia-2',
  utm_term: 'agentes ia',
  utm_content: 'anuncio-a'
})

assert.equal(validLead.statusCode, 200)
assert.equal(validLead.jsonBody?.status, 'ok')

console.log(JSON.stringify({
  missingConsentStatus: missingConsent.statusCode,
  validLeadStatus: validLead.statusCode,
  webhookConfigured: Boolean(
    process.env.AGENCIA_IA_N8N_LEAD_WEBHOOK_URL &&
    process.env.AGENCIA_IA_N8N_WEBHOOK_TOKEN
  ),
  response: validLead.jsonBody
}, null, 2))
