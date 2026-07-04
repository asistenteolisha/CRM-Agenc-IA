<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from './components/layout/AppLayout.vue'

const StarField = defineAsyncComponent(() => import('./components/three/StarField.vue'))
const RobotMascot = defineAsyncComponent(() => import('./components/three/RobotMascot.vue'))
const route = useRoute()
const isDashboard = computed(() => route.path.startsWith('/dashboard'))

function openChat() {
  const chatBtn = document.querySelector('.chat-widget__btn') as HTMLElement
  chatBtn?.click()
}
</script>

<template>
  <StarField />
  <router-view v-if="isDashboard" />
  <AppLayout v-else>
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </AppLayout>
  
  <!-- 3D Robot Mascot with speech bubble -->
  <div v-if="!isDashboard" class="mascot-float">
    <RobotMascot @click="openChat" />
  </div>
</template>

<style>
.mascot-float {
  position: fixed;
  bottom: 80px;
  right: 10px;
  z-index: 49;
  pointer-events: auto;
}

@media (max-width: 768px) {
  .mascot-float {
    display: none;
  }
}
</style>
