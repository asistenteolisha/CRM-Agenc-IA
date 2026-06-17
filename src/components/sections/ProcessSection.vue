<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IconInline from '../IconInline.vue'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { num: '01', icon: 'Search', title: 'Diagnóstico', desc: 'Analizamos tu negocio, procesos actuales y puntos de fricción. Identificamos dónde la IA genera más impacto.' },
  { num: '02', icon: 'Palette', title: 'Diseño', desc: 'Diseñamos el flujo conversacional de tu agente. Definimos personalidad, respuestas e integraciones.' },
  { num: '03', icon: 'Rocket', title: 'Implementación', desc: 'Conectamos tu agente con WhatsApp, Instagram y Facebook. Configuramos todas las integraciones.' },
  { num: '04', icon: 'BarChart3', title: 'Medición', desc: 'Monitoreamos métricas clave: tasa de respuesta, satisfacción, conversiones y tiempo de atención.' },
  { num: '05', icon: 'RefreshCw', title: 'Optimización', desc: 'Mejoramos continuamente el agente basándonos en datos reales. Tu agente aprende y mejora cada mes.' },
]

onMounted(() => {
  gsap.from('.process-step', {
    y: 40, autoAlpha: 0, duration: 0.6, ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: { trigger: '.process-timeline', start: 'top 82%' }
  })
})
</script>

<template>
  <section class="section process-section">
    <div class="section__head" data-reveal>
      <p class="eyebrow">Nuestro proceso</p>
      <h2>Así activamos tu agente IA en 5 pasos.</h2>
      <p class="section-sub">Una metodología colaborativa para un despliegue rápido y resultados medibles desde el primer mes.</p>
    </div>
    <div class="process-timeline">
      <div v-for="step in steps" :key="step.num" class="process-step">
        <div class="process-step__num">{{ step.num }}</div>
        <div class="process-step__icon">
          <IconInline :name="step.icon" :size="22" />
        </div>
        <h3>{{ step.title }}</h3>
        <p>{{ step.desc }}</p>
      </div>
    </div>
  </section>
</template>
