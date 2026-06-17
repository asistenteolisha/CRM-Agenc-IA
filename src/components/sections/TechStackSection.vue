<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const techStack = [
  { name: 'WhatsApp Business', color: '#25D366' },
  { name: 'Instagram', color: '#E1306C' },
  { name: 'Facebook', color: '#1877F2' },
  { name: 'n8n', color: '#EA4B71' },
  { name: 'HubSpot', color: '#FF7A59' },
  { name: 'Google Sheets', color: '#34A853' },
  { name: 'Make', color: '#6D28D9' },
  { name: 'Stripe', color: '#635BFF' },
]

// Duplicate for seamless loop
const marqueeItems = [...techStack, ...techStack]
const marqueeRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!marqueeRef.value) return

  gsap.from('.tech-stack__chip', {
    y: 20, autoAlpha: 0, duration: 0.5, ease: 'power2.out',
    stagger: 0.06,
    scrollTrigger: { trigger: '.tech-stack', start: 'top 90%' }
  })

  // Marquee animation
  const track = marqueeRef.value
  const totalWidth = track.scrollWidth / 2

  gsap.to(track, {
    x: -totalWidth,
    duration: 40,
    ease: 'none',
    repeat: -1,
  })
})
</script>

<template>
  <section class="tech-stack">
    <p class="tech-stack__title">Integrado con las herramientas que ya usás</p>
    <div class="tech-stack__wrapper">
      <div ref="marqueeRef" class="tech-stack__track">
        <span
          v-for="(tech, i) in marqueeItems"
          :key="`${tech.name}-${i}`"
          class="tech-stack__chip"
          :style="{ '--chip-color': tech.color }"
        >
          {{ tech.name }}
        </span>
      </div>
    </div>
  </section>
</template>
