const ZHMV_URL = process.env.ZHMV_API_URL || 'http://hermes-workspace-zhmv-hermes-agent-1:8642'
const ZHMV_KEY = process.env.ZHMV_API_KEY || 'qdmrJPysu8175E3xtMBrpi3xKBXxyF8l'

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

  try {
    const response = await fetch(`${ZHMV_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': ZHMV_KEY, 'Accept': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: message }
        ],
        max_tokens: 500
      }),
      signal: AbortSignal.timeout(15000)
    })

    if (!response.ok) {
      const txt = await response.text().catch(() => '')
      return res.status(502).json({ error: 'Agent unavailable', detail: txt.slice(0, 200) })
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || 'Lo siento, no pude procesar tu mensaje. ¿Querés que te pase con un humano por WhatsApp? 👉 https://wa.me/573012604061'

    return res.status(200).json({ reply })
  } catch (err) {
    return res.status(502).json({ error: 'Agent unreachable', detail: err.message?.slice(0, 200) })
  }
}
