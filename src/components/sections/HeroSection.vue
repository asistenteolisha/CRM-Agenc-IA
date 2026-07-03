<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import IconInline from '../IconInline.vue'
import { trackEvent } from '../../utils/analytics'

defineProps<{
  heroBadge: string
  heroTitle: string
  heroLead: string
  primaryCta: string
  secondaryCta: string
}>()

const titleRef = ref<HTMLElement | null>(null)

function trackHeroCta(label: string) {
  trackEvent('cta_click', { location: 'hero', label })
}

onMounted(() => {
  if (!titleRef.value) return
  const words = titleRef.value.querySelectorAll('.word')
  gsap.from(words, {
    y: 80, autoAlpha: 0, duration: 1, ease: 'power4.out',
    stagger: 0.06, delay: 0.2
  })

  // Mockup entrance animation
  gsap.from('.hero-mockup', {
    y: 60, opacity: 0, scale: 0.92, duration: 1.2,
    ease: 'power3.out', delay: 0.6
  })

  // Animate chat messages appearing one by one
  gsap.from('.mock-msg', {
    y: 20, opacity: 0, duration: 0.5, ease: 'power2.out',
    stagger: 0.3, delay: 1.0
  })
})
</script>

<template>
  <section class="hero">
    <div class="hero__inner">
      <div class="hero__copy">
        <p class="eyebrow">{{ heroBadge }}</p>
        <h1 ref="titleRef">
          <span v-for="(word, i) in heroTitle.split(' ')" :key="i" class="word"
                :style="{ display: 'inline-block', marginRight: '0.25em' }">{{ word }}</span>
        </h1>
        <p class="hero__lead">{{ heroLead }}</p>
        <div class="hero__actions">
          <RouterLink to="/contacto" class="btn btn--primary" @click="trackHeroCta(primaryCta)">
            <IconInline name="Zap" :size="16" /> {{ primaryCta }}
          </RouterLink>
          <RouterLink to="/precios" class="btn btn--secondary" @click="trackHeroCta(secondaryCta)">
            <IconInline name="Rocket" :size="16" /> {{ secondaryCta }}
          </RouterLink>
        </div>
        <div class="hero__metrics">
          <div class="hero__metric">
            <IconInline name="Check" :size="14" class="metric-check" /> <strong>WhatsApp</strong> canal conectado
          </div>
          <div class="hero__metric">
            <IconInline name="Check" :size="14" class="metric-check" /> <strong>CRM</strong> leads organizados
          </div>
          <div class="hero__metric">
            <IconInline name="Check" :size="14" class="metric-check" /> <strong>Humano</strong> escalamiento disponible
          </div>
        </div>
      </div>
      <div class="hero__image">
        <div class="hero-mockup">
          <div class="hero-mockup__header">
            <IconInline name="MessageCircle" :size="14" /> WhatsApp Business
          </div>
          <div class="hero-mockup__body">
            <p class="mock-msg mock-msg--client">Hola, busco un carro automático de hasta 45 millones</p>
            <p class="mock-msg mock-msg--agent">¡Perfecto! Para ayudarte mejor: ¿ciudad, uso principal y necesitás financiación?</p>
            <p class="mock-msg mock-msg--client">Bucaramanga, familiar, podría financiar una parte</p>
            <p class="mock-msg mock-msg--summary">
              <IconInline name="Check" :size="12" /> Lead caliente → CRM
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
