import { ref } from 'vue'

const TOKEN_KEY = 'agenc_ia_dashboard_token'

export interface Lead {
  id: string
  client_id: string | null
  name: string
  email: string | null
  phone: string | null
  business_type: string | null
  service_interest: string | null
  need: string | null
  source: string
  status: 'new' | 'contacted' | 'qualified' | 'won' | 'lost'
  data_consent: boolean
  created_at: string
}

export interface Conversation {
  id: string
  client_id: string | null
  lead_id: string | null
  channel: 'whatsapp' | 'instagram' | 'facebook' | 'messenger' | 'web'
  external_thread_id: string | null
  customer_name: string | null
  customer_phone: string | null
  status: 'open' | 'human_handoff' | 'closed'
  transcript: unknown
  last_message_at: string | null
  created_at: string
}

export interface Task {
  id: string
  client_id: string | null
  lead_id: string | null
  conversation_id: string | null
  title: string
  notes: string | null
  status: 'open' | 'done'
  priority: 'low' | 'normal' | 'high'
  due_at: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
}

export interface Client {
  id: string
  name: string
  contact_name: string | null
  email: string | null
  phone: string | null
  business_type: string | null
  status: 'lead' | 'active' | 'paused' | 'churned'
  created_at: string
  updated_at: string
}

export interface Plan {
  id: string
  client_id: string | null
  plan_key: string
  plan_name: string
  monthly_cop: number
  monthly_usd: number
  setup_cop: number
  setup_usd: number
  status: 'quoted' | 'active' | 'paused' | 'cancelled'
  starts_at: string | null
  created_at: string
}

export interface DashboardSummary {
  totals: {
    clients: number
    leads: number
    conversations: number
    active_plans: number
    open_tasks: number
  }
  recent_leads: Lead[]
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  params?: Record<string, string>
  body?: unknown
}

export function getDashboardToken() {
  return localStorage.getItem(TOKEN_KEY) || ''
}

export function useDashboardToken() {
  const token = ref(getDashboardToken())

  function saveToken(value = token.value) {
    token.value = value.trim()
    localStorage.setItem(TOKEN_KEY, token.value)
  }

  return { token, saveToken }
}

export async function dashboardRequest<T>(resource = '', options: RequestOptions = {}): Promise<T> {
  const token = getDashboardToken()
  if (!token) throw new Error('Configura el token del dashboard en Settings.')

  const params = new URLSearchParams(options.params)
  if (resource) params.set('resource', resource)

  const response = await fetch(`/api/dashboard?${params.toString()}`, {
    method: options.method || 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.body ? { 'Content-Type': 'application/json' } : {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || 'Dashboard request failed')
  return data as T
}

// ponytail: Supabase stays behind /api/dashboard so the service role key never reaches the browser.
export function useDashboardSummary() {
  const summary = ref<DashboardSummary | null>(null)
  const loading = ref(false)
  const error = ref('')

  async function loadSummary() {
    loading.value = true
    error.value = ''
    try {
      summary.value = await dashboardRequest<DashboardSummary>()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'No se pudo cargar el dashboard'
    } finally {
      loading.value = false
    }
  }

  return { summary, loading, error, loadSummary }
}
