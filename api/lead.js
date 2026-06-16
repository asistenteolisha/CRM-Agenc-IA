const REQUIRED_FIELDS = ['name', 'business_type', 'email', 'phone', 'need']
const MAX_FIELD_LENGTH = 2000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const UPSTREAM_TIMEOUT_MS = 8000

function parseBody(req) {
  if (typeof req.body !== 'string') return req.body || {}
  try {
    return JSON.parse(req.body || '{}')
  } catch {
    return null
  }
}

function clean(value, max = MAX_FIELD_LENGTH) {
  return String(value || '').trim().slice(0, max)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Honeypot: if the hidden field is filled, silently accept
  const body = parseBody(req)
  if (!body) {
    return res.status(400).json({ error: 'Invalid JSON body' })
  }

  if (body.company_website && String(body.company_website).trim().length > 0) {
    return res.status(202).json({ status: 'accepted' })
  }

  // Validate required fields
  const missing = REQUIRED_FIELDS.filter((field) => !clean(body[field]))
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing })
  }

  // Validate email format
  if (!EMAIL_RE.test(clean(body.email))) {
    return res.status(400).json({ error: 'Invalid email format' })
  }

  const webhookUrl = process.env.AGENCIA_IA_N8N_LEAD_WEBHOOK_URL
  const webhookToken = process.env.AGENCIA_IA_N8N_WEBHOOK_TOKEN

  if (!webhookUrl || !webhookToken) {
    return res.status(500).json({ error: 'Lead intake is not configured' })
  }

  const payload = {
    name: clean(body.name),
    business_type: clean(body.business_type),
    phone: clean(body.phone),
    email: clean(body.email),
    need: clean(body.need),
    service_interest: clean(body.service_interest) || 'custom-ai-agent',
    source: 'agenc-ia-site',
    created_at: new Date().toISOString(),
    user_agent: String(req.headers['user-agent'] || '').slice(0, 500),
    referer: String(req.headers.referer || req.headers.referrer || '').slice(0, 500),
    utm_source: clean(body.utm_source),
    utm_campaign: clean(body.utm_campaign),
    utm_medium: clean(body.utm_medium)
  }

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)

    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-agent-dispatch-token': webhookToken
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    })

    clearTimeout(timer)

    if (!upstream.ok) {
      console.error(`Lead webhook failed: ${upstream.status} ${await upstream.text().catch(() => '')}`)
      return res.status(502).json({ error: 'Lead webhook failed' })
    }

    return res.status(202).json({ status: 'accepted', message: 'Lead received' })
  } catch (err) {
    console.error('Lead webhook error:', err.message)
    return res.status(502).json({ error: 'Upstream unreachable', detail: err.message })
  }
}
