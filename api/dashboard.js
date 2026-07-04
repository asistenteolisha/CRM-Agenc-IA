const MAX_RECENT = 25

function bearer(req) {
  return String(req.headers.authorization || '').replace(/^Bearer\s+/i, '')
}

function parseCount(contentRange) {
  const total = String(contentRange || '').split('/').pop()
  return Number.isFinite(Number(total)) ? Number(total) : 0
}

async function supabaseRequest(path, options = {}) {
  const url = String(process.env.SUPABASE_URL || '').replace(/\/$/, '')
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('Supabase is not configured')
  }

  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      ...options.headers
    }
  })

  if (!response.ok) {
    throw new Error(`Supabase request failed: ${response.status}`)
  }

  return response
}

async function countRows(path) {
  const response = await supabaseRequest(`${path}&limit=1`, {
    headers: { Prefer: 'count=exact' }
  })
  return parseCount(response.headers.get('content-range'))
}

async function getJson(path) {
  const response = await supabaseRequest(path)
  return response.json()
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiToken = process.env.DASHBOARD_API_TOKEN
  if (!apiToken || !process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(503).json({ error: 'Dashboard is not configured' })
  }

  if (bearer(req) !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const [clients, leads, conversations, activePlans, recentLeads] = await Promise.all([
      countRows('clients?select=id'),
      countRows('leads?select=id'),
      countRows('conversations?select=id'),
      countRows('plans?select=id&status=eq.active'),
      getJson(`leads?select=id,name,phone,email,business_type,service_interest,status,source,created_at&order=created_at.desc&limit=${MAX_RECENT}`)
    ])

    return res.status(200).json({
      totals: { clients, leads, conversations, active_plans: activePlans },
      recent_leads: recentLeads
    })
  } catch (err) {
    return res.status(502).json({ error: err.message })
  }
}
