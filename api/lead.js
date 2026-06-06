const REQUIRED_FIELDS = ['name', 'business_type', 'email', 'need']

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const webhookUrl = process.env.AGENCIA_IA_N8N_LEAD_WEBHOOK_URL
  const webhookToken = process.env.AGENCIA_IA_N8N_WEBHOOK_TOKEN

  if (!webhookUrl || !webhookToken) {
    return res.status(500).json({ error: 'Lead intake is not configured' })
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  const missing = REQUIRED_FIELDS.filter((field) => !String(body[field] || '').trim())

  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing })
  }

  const payload = {
    name: String(body.name).trim(),
    business_type: String(body.business_type).trim(),
    phone: String(body.phone || '').trim(),
    email: String(body.email).trim(),
    need: String(body.need).trim(),
    service_interest: String(body.service_interest || 'custom-ai-agent').trim(),
    source: 'agenc-ia-site'
  }

  const upstream = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-agent-dispatch-token': webhookToken
    },
    body: JSON.stringify(payload)
  })

  if (!upstream.ok) {
    return res.status(502).json({ error: 'Lead webhook failed' })
  }

  return res.status(202).json({ status: 'accepted', message: 'Lead received' })
}
