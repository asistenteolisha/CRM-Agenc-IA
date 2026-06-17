<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IconInline from '../IconInline.vue'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: 'Carolina Mejía',
    role: 'Dueña, Sabor Costeño',
    city: 'Barranquilla',
    text: 'Desde que implementamos el agente de WhatsApp, nuestras reservas aumentaron un 40%. Los clientes reciben respuesta al instante, incluso a las 11pm.',
    metric: '+40% reservas',
    initials: 'CM',
  },
  {
    name: 'Andrés Felipe Roa',
    role: 'Gerente, TechSoluciones SAS',
    city: 'Bogotá',
    text: 'Automatizamos toda la atención al cliente en Instagram y Facebook. Ahorramos 30 horas semanales del equipo. El agente vende más que algunos vendedores.',
    metric: '30h/semana ahorradas',
    initials: 'AR',
  },
  {
    name: 'Valentina Ospina',
    role: 'CEO, Estilo Bella',
    city: 'Medellín',
    text: 'Nuestros clientes agendan citas por WhatsApp sin que yo tenga que hacer nada. El agente incluso sugiere servicios adicionales. Es como tener una empleada perfecta.',
    metric: '95% consultas resueltas',
    initials: 'VO',
  },
]

onMounted(() => {
  gsap.from('.testimonial-card', {
    y: 50, autoAlpha: 0, duration: 0.6, ease: 'power3.out',
    stagger: 0.15,
    scrollTrigger: { trigger: '.testimonials-grid', start: 'top 82%' }
  })
})
</script>

<template>
  <section class="section testimonials-section">
    <div class="section__head" data-reveal>
      <p class="eyebrow">Testimonios</p>
      <h2>Lo que dicen nuestros clientes.</h2>
      <p class="section-sub">Resultados reales de negocios colombianos que ya usan agentes IA.</p>
    </div>
    <div class="testimonials-grid">
      <article v-for="t in testimonials" :key="t.name" class="testimonial-card">
        <div class="testimonial-quote">"</div>
        <p class="testimonial-text">{{ t.text }}</p>
        <div class="testimonial-metric">
          <IconInline name="TrendingUp" :size="14" />
          {{ t.metric }}
        </div>
        <div class="testimonial-author">
          <div class="testimonial-avatar">{{ t.initials }}</div>
          <div>
            <strong>{{ t.name }}</strong>
            <span>{{ t.role }}, {{ t.city }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
