<script setup lang="ts">
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
</script>

<template>
  <section class="hero">
    <div class="hero__inner">
      <div class="hero__copy">
        <p class="hero__badge">
          <span class="badge-dot"></span>
          {{ heroBadge }}
        </p>
        <h1 class="hero__title">
          Agentes IA que<br />
          <span class="gradient-text">venden por ti 24/7</span>
        </h1>
        <p class="hero__lead">{{ heroLead }}</p>
        <div class="hero__actions">
          <RouterLink to="/contacto" class="btn btn--primary" @click="trackHeroCta(primaryCta)">
            {{ primaryCta }} <IconInline name="Send" :size="16" />
          </RouterLink>
          <RouterLink to="/precios" class="btn btn--secondary" @click="trackHeroCta(secondaryCta)">
            {{ secondaryCta }}
          </RouterLink>
        </div>
        <div class="hero__trust">
          <div class="trust-item">
            <IconInline name="Check" :size="14" class="trust-check" />
            <span><strong>WhatsApp</strong> canal conectado</span>
          </div>
          <div class="trust-item">
            <IconInline name="Check" :size="14" class="trust-check" />
            <span><strong>CRM</strong> leads organizados</span>
          </div>
          <div class="trust-item">
            <IconInline name="Check" :size="14" class="trust-check" />
            <span><strong>Humano</strong> escalamiento</span>
          </div>
        </div>
      </div>
      <div class="hero__visual">
        <div class="phone-mockup">
          <div class="phone-header">
            <IconInline name="MessageCircle" :size="14" />
            <span>WhatsApp Business</span>
          </div>
          <div class="chat-messages">
            <div class="msg msg--client" style="animation-delay: 0.15s">
              Hola, busco un carro automático de hasta 45 millones
            </div>
            <div class="msg msg--agent" style="animation-delay: 0.35s">
              Perfecto. Para ayudarte mejor: ciudad, uso principal y si necesitas financiación.
            </div>
            <div class="msg msg--client" style="animation-delay: 0.55s">
              Bucaramanga, familiar, podría financiar una parte
            </div>
            <div class="msg msg--system" style="animation-delay: 0.75s">
              <IconInline name="Check" :size="12" />
              Lead caliente -> CRM
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
