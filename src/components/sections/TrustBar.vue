<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IconInline from '../IconInline.vue'

gsap.registerPlugin(ScrollTrigger)

const chips = [
  { label: 'WhatsApp', icon: 'MessageCircle', cls: 'wa' },
  { label: 'Instagram', icon: 'Instagram', cls: 'ig' },
  { label: 'Facebook', icon: 'Facebook', cls: 'fb' },
  { label: 'Messenger', icon: 'Send', cls: 'msg' },
  { label: 'n8n', icon: 'Workflow', cls: '' },
  { label: 'CRM', icon: 'Database', cls: '' },
]

onMounted(() => {
  gsap.from('.trust-chip', {
    y: 16, autoAlpha: 0, duration: 0.4, ease: 'power2.out',
    stagger: 0.06,
    scrollTrigger: { trigger: '.trust-bar', start: 'top 92%' }
  })
})
</script>

<template>
  <section class="trust-bar">
    <div class="trust-bar__inner">
      <span>Canales que automatizamos</span>
      <div class="trust-bar__items">
        <span v-for="c in chips" :key="c.label" class="trust-chip" :class="c.cls">
          <IconInline :name="c.icon" :size="14" />
          {{ c.label }}
        </span>
      </div>
    </div>
  </section>
</template>
