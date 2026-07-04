<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import AppLayout from './components/layout/AppLayout.vue'

const StarField = defineAsyncComponent(() => import('./components/three/StarField.vue'))
const Chatbot3D = defineAsyncComponent(() => import('./components/three/Chatbot3D.vue'))

function openChat() {
  // Trigger chat widget open
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
  <Chatbot3D class="chatbot-float" @click="openChat" />
</template>

<style>
.chatbot-float {
  position: fixed;
  bottom: 100px;
  right: 24px;
  z-index: 49;
}
</style>
