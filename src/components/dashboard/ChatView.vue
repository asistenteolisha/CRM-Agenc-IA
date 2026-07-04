<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import IconInline from '../IconInline.vue'
import type { Conversation } from '../../composables/useSupabase'

interface TranscriptMessage {
  role?: string
  content?: string
  text?: string
  message?: string
  created_at?: string
}

const props = defineProps<{
  conversations: Conversation[]
  loading: boolean
}>()

const emit = defineEmits<{
  status: [id: string, status: Conversation['status']]
}>()

const activeId = ref('')
const active = computed(() => props.conversations.find((item) => item.id === activeId.value) || props.conversations[0])
const messages = computed(() => Array.isArray(active.value?.transcript) ? active.value.transcript as TranscriptMessage[] : [])

watch(
  () => props.conversations,
  (items) => {
    if (!items.some((item) => item.id === activeId.value)) activeId.value = items[0]?.id || ''
  },
  { immediate: true }
)

function messageText(message: TranscriptMessage) {
  return message.content || message.text || message.message || ''
}

function changeStatus(event: Event) {
  if (!active.value) return
  emit('status', active.value.id, (event.target as HTMLSelectElement).value as Conversation['status'])
}
</script>

<template>
  <section class="dashboard-chat">
    <aside class="dashboard-chat__list">
      <div class="dashboard-panel__head">
        <h2>Chats</h2>
        <span class="dashboard-count">{{ conversations.length }}</span>
      </div>

      <button
        v-for="conversation in conversations"
        :key="conversation.id"
        class="dashboard-chat__item"
        :class="{ active: conversation.id === active?.id }"
        type="button"
        @click="activeId = conversation.id"
      >
        <IconInline name="MessageCircle" :size="18" />
        <span>
          <strong>{{ conversation.customer_name || conversation.customer_phone || conversation.channel }}</strong>
          <small>{{ conversation.status }} · {{ conversation.channel }}</small>
        </span>
      </button>

      <p v-if="loading" class="dashboard-muted">Cargando...</p>
      <p v-else-if="conversations.length === 0" class="dashboard-muted">Sin conversaciones.</p>
    </aside>

    <article class="dashboard-chat__thread">
      <header v-if="active" class="dashboard-chat__header">
        <div>
          <h2>{{ active.customer_name || 'Cliente' }}</h2>
          <p>{{ active.customer_phone || active.external_thread_id || active.channel }}</p>
        </div>
        <select :value="active.status" @change="changeStatus">
          <option value="open">open</option>
          <option value="human_handoff">human_handoff</option>
          <option value="closed">closed</option>
        </select>
      </header>

      <div class="dashboard-chat__messages">
        <p v-if="!active" class="dashboard-muted">Selecciona una conversacion.</p>
        <p v-else-if="messages.length === 0" class="dashboard-muted">Sin transcript.</p>
        <template v-else>
          <div
            v-for="(message, index) in messages"
            :key="`${index}-${message.created_at || ''}`"
            class="dashboard-chat__bubble"
            :class="{ agent: message.role === 'assistant' || message.role === 'agent' }"
          >
            <small>{{ message.role || 'mensaje' }}</small>
            <span>{{ messageText(message) }}</span>
          </div>
        </template>
      </div>
    </article>
  </section>
</template>
