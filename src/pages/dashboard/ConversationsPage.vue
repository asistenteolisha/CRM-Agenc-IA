<script setup lang="ts">
import { onMounted } from 'vue'
import Sidebar from '../../components/dashboard/Sidebar.vue'
import ChatView from '../../components/dashboard/ChatView.vue'
import { useConversations } from '../../composables/useConversations'

const { conversations, loading, error, loadConversations, updateConversationStatus } = useConversations()

onMounted(loadConversations)
</script>

<template>
  <div class="dashboard-shell">
    <Sidebar />
    <main class="dashboard-main">
      <header class="dashboard-topbar">
        <div>
          <p class="dashboard-eyebrow">CRM</p>
          <h1>Conversaciones</h1>
        </div>
        <button class="dashboard-btn" type="button" @click="loadConversations">Actualizar</button>
      </header>

      <p v-if="error" class="dashboard-error">{{ error }}</p>
      <ChatView :conversations="conversations" :loading="loading" @status="updateConversationStatus" />
    </main>
  </div>
</template>
