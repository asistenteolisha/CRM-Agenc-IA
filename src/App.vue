<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import AppLayout from './components/layout/AppLayout.vue'

const StarField = defineAsyncComponent(() => import('./components/three/StarField.vue'))
const SplineMascot = defineAsyncComponent(() => import('./components/three/SplineMascot.vue'))

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
  
  <!-- 3D Mascot floating above chat button -->
  <div class="mascot-float-container">
    <SplineMascot @click="openChat" />
  </div>
</template>

<style>
.mascot-float-container {
  position: fixed;
  bottom: 95px;
  right: 8px;
  z-index: 49;
  pointer-events: auto;
}

/* Mobile: hide mascot to save performance */
@media (max-width: 768px) {
  .mascot-float-container {
    display: none;
  }
}
</style>
