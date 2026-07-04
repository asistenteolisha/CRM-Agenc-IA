const MAX_ROWS = 100
const MAX_RECENT = 25
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const RESOURCES = {
  leads: {
    table: 'leads',
    select: 'id,client_id,name,email,phone,business_type,service_interest,need,source,status,data_consent,created_at',
    order: 'created_at.desc',
    statuses: ['new', 'contacted', 'qualified', 'won', 'lost'],
    writable: ['client_id', 'name', 'email', 'phone', 'business_type', 'service_interest', 'need', 'source', 'status', 'data_consent']
  },
  conversations: {
    table: 'conversations',
    select: 'id,client_id,lead_id,channel,external_thread_id,customer_name,customer_phone,status,transcript,last_message_at,created_at',
    order: 'last_message_at.desc.nullslast',
    statuses: ['open', 'human_handoff', 'closed'],
    writable: ['status']
  },
  tasks: {
    table: 'tasks',
    select: 'id,client_id,lead_id,conversation_id,title,notes,status,priority,due_at,completed_at,created_at,updated_at',
    order: 'due_at.asc.nullslast,created_at.desc',
    statuses: ['open', 'done'],
    priorities: ['low', 'normal', 'high'],
    writable: ['client_id', 'lead_id', 'conversation_id', 'title', 'notes', 'status', 'priority', 'due_at']
  },
  clients: {
    table: 'clients',
    select: 'id,name,contact_name,email,phone,business_type,status,created_at,updated_at',
    order: 'created_at.desc',
    statuses: ['lead', 'active', 'paused', 'churned'],
    writable: ['name', 'contact_name', 'email', 'phone', 'business_type', 'status']
  },
  plans: {
    table: 'plans',
    select: 'id,client_id,plan_key,plan_name,monthly_cop,monthly_usd,setup_cop,setup_usd,status,starts_at,created_at',
    order: 'created_at.desc',
    statuses: ['quoted', 'active', 'paused', 'cancelled'],
    writable: []
  }
}

function bearer(req) {
  return String(req.headers.authorization || '').replace(/^Bearer\s+/i, '')
}

function parseBody(req) {
  if (typeof req.body !== 'string') return req.body || {}

  try {
    return JSON.parse(req.body || '{}')
  } catch {
    return null
  }
}

function parseCount(contentRange) {
  const total = String(contentRange || '').split('/').pop()
  return Number.isFinite(Number(total)) ? Number(total) : 0
}

function clean(value, max = 2000) {
  return String(value || '').trim().slice(0, max)
}

function optionalUuid(value) {
  const id = clean(value, 64)
  if (!id) return null
  if (!UUID_RE.test(id)) throw new Error('Invalid id')
  return id
}

function requestParams(req) {
  return new URL(req.url || '/', 'http://localhost').searchParams
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

async function optionalCountRows(path) {
  try {
    return await countRows(path)
  } catch {
    return 0
  }
}

async function getJson(path) {
  const response = await supabaseRequest(path)
  return response.status === 204 ? null : response.json()
}

function resourceName(params) {
  return clean(params.get('resource'), 32)
}

function buildListPath(config, params) {
  const limit = Math.min(Math.max(Number(params.get('limit') || MAX_ROWS), 1), MAX_ROWS)
  const query = new URLSearchParams({
    select: config.select,
    order: config.order,
    limit: String(Number.isFinite(limit) ? limit : MAX_ROWS)
  })

  const status = clean(params.get('status'), 32)
  if (status) query.set('status', `eq.${status}`)

  const source = clean(params.get('source'), 80)
  if (source && config.table === 'leads') query.set('source', `eq.${source}`)

  const search = clean(params.get('search'), 80).replace(/[(),]/g, ' ')
  if (search && config.table === 'leads') {
    query.set('or', `(name.ilike.*${search}*,email.ilike.*${search}*,phone.ilike.*${search}*)`)
  }

  return `${config.table}?${query.toString()}`
}

function normalizePayload(config, body, partial = false) {
  const input = body || {}
  const payload = {}

  for (const field of config.writable) {
    if (!(field in input)) continue

    if (field.endsWith('_id')) payload[field] = optionalUuid(input[field])
    else if (field === 'data_consent') payload[field] = input[field] === true || input[field] === 'true'
    else if (field === 'status') {
      const status = clean(input[field], 32)
      if (!config.statuses.includes(status)) throw new Error('Invalid status')
      payload.status = status
    } else if (field === 'priority') {
      const priority = clean(input[field], 32) || 'normal'
      if (!config.priorities.includes(priority)) throw new Error('Invalid priority')
      payload.priority = priority
    } else if (field === 'due_at') {
      payload.due_at = input[field] ? new Date(input[field]).toISOString() : null
    } else {
      payload[field] = clean(input[field], field === 'notes' || field === 'need' ? 2000 : 240)
    }
  }

  if (!partial && config.table === 'leads' && !payload.name) throw new Error('Lead name is required')
  if (!partial && config.table === 'tasks' && !payload.title) throw new Error('Task title is required')
  if (!partial && config.table === 'clients' && !payload.name) throw new Error('Client name is required')

  if (config.table === 'tasks' && payload.status === 'done') payload.completed_at = new Date().toISOString()
  if (config.table === 'tasks' && payload.status === 'open') payload.completed_at = null
  if (['tasks', 'clients'].includes(config.table)) payload.updated_at = new Date().toISOString()

  if (Object.keys(payload).length === 0) throw new Error('Empty payload')
  return payload
}

async function dashboardSummary() {
  const [clients, leads, conversations, activePlans, openTasks, recentLeads] = await Promise.all([
    countRows('clients?select=id'),
    countRows('leads?select=id'),
    countRows('conversations?select=id'),
    countRows('plans?select=id&status=eq.active'),
    optionalCountRows('tasks?select=id&status=eq.open'),
    getJson(`leads?select=id,name,phone,email,business_type,service_interest,status,source,created_at&order=created_at.desc&limit=${MAX_RECENT}`)
  ])

  return {
    totals: { clients, leads, conversations, active_plans: activePlans, open_tasks: openTasks },
    recent_leads: recentLeads || []
  }
}

async function listResource(config, params) {
  return getJson(buildListPath(config, params))
}

async function createResource(config, body) {
  const payload = normalizePayload(config, body)
  return getJson(`${config.table}?select=${config.select}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Prefer: 'return=representation' },
    body: JSON.stringify(payload)
  })
}

async function updateResource(config, params, body) {
  const id = optionalUuid(params.get('id'))
  if (!id) throw new Error('Missing id')

  const payload = normalizePayload(config, body, true)
  return getJson(`${config.table}?id=eq.${id}&select=${config.select}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Prefer: 'return=representation' },
    body: JSON.stringify(payload)
  })
}

async function deleteResource(config, params) {
  const id = optionalUuid(params.get('id'))
  if (!id) throw new Error('Missing id')

  await supabaseRequest(`${config.table}?id=eq.${id}`, {
    method: 'DELETE',
    headers: { Prefer: 'return=minimal' }
  })
  return { ok: true }
}

export const __test = { parseCount, optionalUuid, normalizePayload, buildListPath, resourceName }

export default async function handler(req, res) {
  const apiToken = process.env.DASHBOARD_API_TOKEN
  if (!apiToken || !process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(503).json({ error: 'Dashboard is not configured' })
  }

  if (bearer(req) !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const params = requestParams(req)
  const resource = resourceName(params)
  const config = resource ? RESOURCES[resource] : null

  try {
    if (req.method === 'GET' && !resource) return res.status(200).json(await dashboardSummary())
    if (!config) return res.status(404).json({ error: 'Unknown resource' })
    if (req.method === 'GET') return res.status(200).json(await listResource(config, params))
    if (req.method === 'POST') return res.status(200).json(await createResource(config, parseBody(req)))
    if (req.method === 'PATCH') return res.status(200).json(await updateResource(config, params, parseBody(req)))
    if (req.method === 'DELETE') return res.status(200).json(await deleteResource(config, params))

    res.setHeader('Allow', 'GET, POST, PATCH, DELETE')
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Dashboard request failed'
    const status = /Invalid|Missing|required|Empty/.test(message) ? 400 : 502
    return res.status(status).json({ error: message })
  }
}
