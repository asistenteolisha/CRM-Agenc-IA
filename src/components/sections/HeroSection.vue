<script setup lang="ts">
import AgentNetwork from '../AgentNetwork.vue'

defineProps<{ heroBadge: string; heroTitle: string; heroLead: string; primaryCta: string; secondaryCta: string }>()
</script>

<template>
  <section class="hero">
    <AgentNetwork />
    <div class="hero__shade"></div>
    <div class="hero__inner">
      <div class="hero__copy">
        <p class="eyebrow">{{ heroBadge }}</p>
        <h1>{{ heroTitle }}</h1>
        <p class="hero__lead">{{ heroLead }}</p>
        <div class="hero__actions">
          <a href="#contacto" class="btn btn--primary">{{ primaryCta }}</a>
          <a href="#roi" class="btn btn--secondary">{{ secondaryCta }}</a>
        </div>
      </div>
      <aside class="hero-panel" aria-label="Estado del sistema">
        <div class="hero-panel__top">
          <span class="status-dot pulse"></span>
          <span>Sistema de agentes activo</span>
        </div>
        <div class="hero-panel__agent hero-panel__agent--active wa">
          <span>WhatsApp</span><strong>Agente de ventas</strong>
          <small>24/7 · Respuesta &lt;30s</small>
        </div>
        <div class="hero-panel__agent ig">
          <span>Instagram</span><strong>DMs + Comentarios</strong>
          <small>Posts, reels, stories</small>
        </div>
        <div class="hero-panel__agent fb">
          <span>Facebook</span><strong>Lead Ads + Messenger</strong>
          <small>Webhooks en tiempo real</small>
        </div>
        <div class="hero-panel__agent">
          <span>n8n + CRM</span><strong>Orquestador y registro</strong>
          <small>400+ integraciones</small>
        </div>
      </aside>
    </div>
  </section>
</template>
