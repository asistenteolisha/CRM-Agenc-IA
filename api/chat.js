// Proxy chat messages to the zhmv agent via n8n webhook
const N8N_WEBHOOK = process.env.AGENCIA_IA_N8N_CHAT_WEBHOOK_URL || ''
const N8N_TOKEN = process.env.AGENCIA_IA_N8N_WEBHOOK_TOKEN || ''

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  const message = String(body.message || '').trim().slice(0, 2000)

  if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }

  // If n8n webhook is configured, forward there
  if (N8N_WEBHOOK && N8N_TOKEN) {
    try {
      const resp = await fetch(N8N_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-agent-dispatch-token': N8N_TOKEN
        },
        body: JSON.stringify({
          message,
          source: 'website-chat',
          timestamp: new Date().toISOString()
        }),
        signal: AbortSignal.timeout(15000)
      })

      if (resp.ok) {
        const data = await resp.json().catch(() => ({}))
        const reply = data.reply || data.text || data.message || data.response || ''
        if (reply) return res.status(200).json({ reply })
      }
    } catch {
      // Fall through to fallback message
    }
  }

  // Fallback — no agent configured or unreachable
  return res.status(200).json({
    reply: '👋 ¡Hola! Soy el asistente de Agenc-IA.\n\nPodemos ayudarte con:\n• Agentes IA para WhatsApp, Instagram y Facebook\n• Automatización n8n + CRM\n• Diagnóstico gratis en 20 minutos\n\n📱 ¿Querés que te contactemos por WhatsApp?\nEscribinos al +57 3012604061'
  })
}
