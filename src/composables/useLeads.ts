import { ref } from 'vue'
import { dashboardRequest, type Lead } from './useSupabase'

export interface LeadFilters {
  status: string
  source: string
  search: string
}

export type LeadInput = Partial<Omit<Lead, 'created_at'>> & { name: string }

export function useLeads() {
  const leads = ref<Lead[]>([])
  const loading = ref(false)
  const error = ref('')
  const filters = ref<LeadFilters>({ status: '', source: '', search: '' })

  async function loadLeads() {
    loading.value = true
    error.value = ''
    try {
      const params = Object.fromEntries(Object.entries(filters.value).filter(([, value]) => value))
      leads.value = await dashboardRequest<Lead[]>('leads', { params })
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'No se pudieron cargar los leads'
    } finally {
      loading.value = false
    }
  }

  async function saveLead(lead: LeadInput) {
    const id = lead.id
    await dashboardRequest<Lead[]>('leads', {
      method: id ? 'PATCH' : 'POST',
      params: id ? { id } : undefined,
      body: lead
    })
    await loadLeads()
  }

  async function deleteLead(id: string) {
    await dashboardRequest<{ ok: true }>('leads', { method: 'DELETE', params: { id } })
    await loadLeads()
  }

  return { leads, loading, error, filters, loadLeads, saveLead, deleteLead }
}
