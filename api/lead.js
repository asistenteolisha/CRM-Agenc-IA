const REQUIRED_FIELDS = ['name', 'email', 'phone']
const MAX_FIELD_LENGTH = 2000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const UPSTREAM_TIMEOUT_MS = 8000

const ALLOWED_ORIGINS = [
  'https://agenc-ia-topaz.vercel.app',
  'https://agenciadia.tech',
  'https://www.agenciadia.tech'
]

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

function hasDataConsent(value) {
  return value === true || value === 'true'
}

async function sendTelegramNotification(data) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) return

  const text = `ðŸ†• *Nuevo Lead â€” Agenc-IA*\n\nðŸ‘¤ *Nombre:* ${data.name}\nðŸ“§ *Email:* ${data.email}\nðŸ“± *TelÃ©fono:* ${data.phone}\nðŸ¢ *Negocio:* ${data.business_type || 'No especificado'}\nðŸŽ¯ *Servicio:* ${data.service_interest || 'No especificado'}\nðŸ’¬ *Necesidad:* ${data.need || 'No especificado'}\n\nðŸ”— Fuente: ${data.source || 'website'}`

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown'
      }),
      signal: AbortSignal.timeout(5000)
    })
  } catch {
    // Don't fail the request if Telegram notification fails
  }
}

async function saveLeadToSupabase(data) {
  const url = String(process.env.SUPABASE_URL || '').replace(/\/$/, '')
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) return

  try {
    const response = await fetch(`${url}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        business_type: data.business_type,
        service_interest: data.service_interest,
        need: data.need,
        source: data.source,
        data_consent: data.data_consent,
        utm: {
          source: data.utm_source,
          medium: data.utm_medium,
          campaign: data.utm_campaign,
          term: data.utm_term,
          content: data.utm_content
        }
      }),
      signal: AbortSignal.timeout(5000)
    })

    if (!response.ok) {
      console.error(`Supabase lead insert failed: ${response.status} ${await response.text().catch(() => '')}`)
    }
  } catch (err) {
    console.error('Supabase lead insert error:', err.message)
  }
}

export default async function handler(req, res) {
  const origin = req.headers.origin || ''
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = parseBody(req)
  if (!body) {
    return res.status(400).json({ error: 'Invalid JSON body' })
  }

  if (body.company_website && String(body.company_website).trim().length > 0) {
    return res.status(202).json({ status: 'accepted' })
  }

  const missing = REQUIRED_FIELDS.filter((field) => !clean(body[field]))
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing })
  }

  if (!hasDataConsent(body.data_consent)) {
    return res.status(400).json({ error: 'Data consent is required' })
  }

  if (!EMAIL_RE.test(clean(body.email))) {
    return res.status(400).json({ error: 'Invalid email format' })
  }

  const payload = {
    name: clean(body.name),
    business_type: clean(body.business_type),
    phone: clean(body.phone),
    email: clean(body.email),
    need: clean(body.need),
    service_interest: clean(body.service_interest) || 'custom-ai-agent',
    data_consent: true,
    source: 'agenc-ia-site',
    created_at: new Date().toISOString(),
    user_agent: String(req.headers['user-agent'] || '').slice(0, 500),
    referer: String(req.headers.referer || req.headers.referrer || '').slice(0, 500),
    utm_source: clean(body.utm_source),
    utm_campaign: clean(body.utm_campaign),
    utm_medium: clean(body.utm_medium),
    utm_term: clean(body.utm_term),
    utm_content: clean(body.utm_content)
  }

  sendTelegramNotification(payload)
  saveLeadToSupabase(payload)

  const webhookUrl = process.env.AGENCIA_IA_N8N_LEAD_WEBHOOK_URL
  const webhookToken = process.env.AGENCIA_IA_N8N_WEBHOOK_TOKEN

  if (webhookUrl && webhookToken) {
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
      }
    } catch (err) {
      console.error('Lead webhook error:', err.message)
    }
  }

  return res.status(200).json({ status: 'ok', message: 'Lead received' })
}
