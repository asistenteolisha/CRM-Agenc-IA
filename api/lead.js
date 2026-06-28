const REQUIRED_FIELDS = ['name', 'email', 'phone']
const MAX_FIELD_LENGTH = 2000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const UPSTREAM_TIMEOUT_MS = 8000

const ALLOWED_ORIGINS = [
  'https://agenc-ia-topaz.vercel.app',
  'https://agenc-ia.co'
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

async function sendTelegramNotification(data) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) return

  const text = `🆕 *Nuevo Lead — Agenc-IA*\n\n👤 *Nombre:* ${data.name}\n📧 *Email:* ${data.email}\n📱 *Teléfono:* ${data.phone}\n🏢 *Negocio:* ${data.business_type || 'No especificado'}\n🎯 *Servicio:* ${data.service_interest || 'No especificado'}\n💬 *Necesidad:* ${data.need || 'No especificado'}\n\n🔗 Fuente: ${data.source || 'website'}`

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

export default async function handler(req, res) {
  // CORS headers
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

  // Send Telegram notification (non-blocking)
  sendTelegramNotification(payload)

  // Try n8n webhook
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
        // Don't fail — Telegram already notified
      }
    } catch (err) {
      console.error('Lead webhook error:', err.message)
      // Don't fail — Telegram already notified
    }
  }

  return res.status(200).json({ status: 'ok', message: 'Lead received' })
}
