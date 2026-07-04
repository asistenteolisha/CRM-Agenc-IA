import { ref } from 'vue'
import { dashboardRequest, type Conversation } from './useSupabase'

export function useConversations() {
  const conversations = ref<Conversation[]>([])
  const loading = ref(false)
  const error = ref('')

  async function loadConversations() {
    loading.value = true
    error.value = ''
    try {
      conversations.value = await dashboardRequest<Conversation[]>('conversations')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'No se pudieron cargar las conversaciones'
    } finally {
      loading.value = false
    }
  }

  async function updateConversationStatus(id: string, status: Conversation['status']) {
    await dashboardRequest<Conversation[]>('conversations', {
      method: 'PATCH',
      params: { id },
      body: { status }
    })
    await loadConversations()
  }

  return { conversations, loading, error, loadConversations, updateConversationStatus }
}
