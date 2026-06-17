<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import IconInline from './IconInline.vue'

const visible = ref(false)

function handleScroll() {
  visible.value = window.scrollY > 600
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <Transition name="fade">
    <button
      v-show="visible"
      class="back-to-top"
      @click="scrollToTop"
      aria-label="Volver arriba"
    >
      <IconInline name="ChevronUp" :size="20" />
    </button>
  </Transition>
</template>
