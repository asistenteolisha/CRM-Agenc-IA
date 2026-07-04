<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
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

function trackHeroCta(label: string) {
  trackEvent('cta_click', { location: 'hero', label })
}

const heroRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!heroRef.value) return

  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from('.hero__badge', { y: 18, opacity: 0, duration: 0.55 })
      .from('.title-line', { y: 42, opacity: 0, duration: 0.75, stagger: 0.08 }, '-=0.2')
      .from('.hero__lead', { y: 18, opacity: 0, duration: 0.55 }, '-=0.3')
      .from('.hero__actions', { y: 18, opacity: 0, duration: 0.5 }, '-=0.25')
      .from('.stat', { y: 16, opacity: 0, duration: 0.42, stagger: 0.08 }, '-=0.15')
      .from('.hero__mockup', { y: 52, opacity: 0, scale: 0.94, duration: 0.8, ease: 'back.out(1.25)' }, '-=0.45')
      .from('.float', { y: 18, opacity: 0, duration: 0.35, stagger: 0.08 }, '-=0.2')
  }, heroRef)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <section ref="heroRef" class="hero">
    <div class="hero__grid"></div>
    <div class="hero__glow"></div>

    <div class="hero__inner">
      <div class="hero__copy">
        <div class="hero__badge">
          <span class="badge-pulse"></span>
          <span>{{ heroBadge }}</span>
        </div>

        <h1 class="hero__title">
          <span class="title-line">Agentes IA que</span>
          <span class="title-line title-neon" data-text="venden por ti 24/7">venden por ti 24/7</span>
        </h1>

        <p class="hero__lead">{{ heroLead }}</p>

        <div class="hero__actions">
          <RouterLink to="/contacto" class="btn btn--neon" @click="trackHeroCta(primaryCta)">
            {{ primaryCta }}
            <IconInline name="Send" :size="16" />
          </RouterLink>
          <RouterLink to="/precios" class="btn btn--glass" @click="trackHeroCta(secondaryCta)">
            {{ secondaryCta }}
          </RouterLink>
        </div>

        <div class="hero__stats">
          <div class="stat">
            <span class="stat-number">24/7</span>
            <span class="stat-label">Disponible</span>
          </div>
          <div class="stat">
            <span class="stat-number">&lt;3s</span>
            <span class="stat-label">Respuesta</span>
          </div>
          <div class="stat">
            <span class="stat-number">+30%</span>
            <span class="stat-label">Ventas</span>
          </div>
        </div>
      </div>

      <div class="hero__visual">
        <div class="hero__mockup">
          <div class="phone-notch"></div>
          <div class="phone-header">
            <div class="phone-header__left">
              <div class="phone-avatar">
                <IconInline name="Bot" :size="20" />
              </div>
              <div>
                <span class="phone-name">Lia - Agenc-IA</span>
                <span class="phone-status">en linea</span>
              </div>
            </div>
            <IconInline name="Zap" :size="16" />
          </div>

          <div class="chat-messages">
            <div class="msg msg--client">
              <span class="msg__name">Cliente</span>
              Hola, busco un carro automatico de hasta 45 millones
            </div>
            <div class="msg msg--agent">
              Perfecto. Te ayudo a filtrar ciudad, uso y financiacion antes de pasarte al vendedor.
              <span class="msg__time">10:32</span>
            </div>
            <div class="msg msg--client">
              Bucaramanga, familiar, podria financiar una parte
            </div>
            <div class="msg msg--typing">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
            </div>
            <div class="msg msg--system">
              <IconInline name="Zap" :size="12" />
              Lead caliente -> CRM
            </div>
          </div>
        </div>

        <div class="float float--1">WhatsApp</div>
        <div class="float float--2">Instagram</div>
        <div class="float float--3">Facebook</div>
      </div>
    </div>
  </section>
</template>
