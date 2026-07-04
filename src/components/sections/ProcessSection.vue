<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IconInline from '../IconInline.vue'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { num: '01', icon: 'Search', title: 'Diagnostico gratuito', desc: 'Revisamos tus canales, oferta y cuellos de botella para elegir el flujo con mayor impacto.' },
  { num: '02', icon: 'Workflow', title: 'Setup done-for-you', desc: 'Configuramos agente, guion, integraciones, tracking y pruebas con casos reales de tu negocio.' },
  { num: '03', icon: 'BarChart3', title: 'Lanzamiento y mejora', desc: 'Publicamos, medimos conversaciones y leads, y ajustamos el agente cada mes segun datos reales.' },
]

onMounted(() => {
  gsap.from('.process-step', {
    y: 40,
    autoAlpha: 0,
    duration: 0.6,
    ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: { trigger: '.process-timeline', start: 'top 82%' }
  })
})
</script>

<template>
  <section class="section process-section">
    <div class="section__head" data-reveal>
      <p class="eyebrow">Nuestro proceso</p>
      <h2>Como funciona en 3 pasos.</h2>
      <p class="section-sub">Un despliegue corto, medible y sin carga tecnica para tu equipo.</p>
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
