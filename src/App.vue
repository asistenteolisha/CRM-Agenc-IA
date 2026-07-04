<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import AppLayout from './components/layout/AppLayout.vue'

const StarField = defineAsyncComponent(() => import('./components/three/StarField.vue'))
const Chatbot3D = defineAsyncComponent(() => import('./components/three/Chatbot3D.vue'))

function openChat() {
  const chatBtn = document.querySelector('.chat-widget__btn') as HTMLElement
  chatBtn?.click()
}
</script>

<template>
  <StarField />
  <AppLayout>
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </AppLayout>
  
  <!-- Chatbot 3D floating above chat button -->
  <div class="chatbot-float-container">
    <Chatbot3D @click="openChat" />
  </div>
</template>

<style>
.chatbot-float-container {
  position: fixed;
  bottom: 100px;
  right: 12px;
  z-index: 49;
  pointer-events: auto;
}

/* Mobile: hide 3D bot to save performance */
@media (max-width: 768px) {
  .chatbot-float-container {
    display: none;
  }
}
</style>
