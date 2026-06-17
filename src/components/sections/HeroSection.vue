<script setup lang="ts">
defineProps<{
  heroBadge: string
  heroTitle: string
  heroLead: string
  primaryCta: string
  secondaryCta: string
}>()
</script>

<template>
  <section class="hero">
    <div class="hero__inner">
      <div class="hero__copy">
        <p class="eyebrow">{{ heroBadge }}</p>
        <h1>{{ heroTitle }}</h1>
        <p class="hero__lead">{{ heroLead }}</p>
        <div class="hero__actions">
          <RouterLink to="/contacto" class="btn btn--primary">{{ primaryCta }}</RouterLink>
          <RouterLink to="/servicios" class="btn btn--secondary">{{ secondaryCta }}</RouterLink>
        </div>
        <div class="hero__metrics">
          <div class="hero__metric">✦ <strong>85%</strong> consultas atendidas 24/7</div>
          <div class="hero__metric">✦ <strong>&lt;30s</strong> tiempo de respuesta</div>
          <div class="hero__metric">✦ <strong>15</strong> agentes IA disponibles</div>
        </div>
      </div>
      <div class="hero__image">
        <div class="hero-mockup">
          <div class="hero-mockup__header">WhatsApp Business</div>
          <div class="hero-mockup__body">
            <p class="mock-msg mock-msg--client">Hola, busco un carro automático de hasta 45 millones</p>
            <p class="mock-msg mock-msg--agent">¡Perfecto! Para ayudarte mejor: ¿ciudad, uso principal y necesitás financiación?</p>
            <p class="mock-msg mock-msg--client">Bucaramanga, familiar, podría financiar una parte</p>
            <p class="mock-msg mock-msg--summary">✅ Lead caliente → CRM</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
