<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const missionCards = [
  { icon: '🎯', title: 'Misión', text: 'Convertir la IA en sistemas operativos reales para PYMES colombianas, no en promesas. Implementamos agentes que responden, venden, registran y hacen seguimiento.' },
  { icon: '🔭', title: 'Visión', text: 'Ser la agencia líder en automatización conversacional Meta para el mercado PYME latinoamericano, combinando tecnología de punta con cercanía humana.' },
  { icon: '✨', title: 'Valores', text: 'Transparencia en precios, human-in-the-loop donde importa, mejora continua mes a mes, y cero vendor lock-in.' }
]

onMounted(() => {
  gsap.from('.page-hero h1', { y: 30, autoAlpha: 0, duration: 0.8, ease: 'power3.out' })
  gsap.from('.page-hero__sub', { y: 20, autoAlpha: 0, duration: 0.6, delay: 0.2, ease: 'power3.out' })
  gsap.from('.about-card', { y: 40, autoAlpha: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.about-grid', start: 'top 82%' } })
  gsap.from('.stack-chip', { y: 20, autoAlpha: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out', scrollTrigger: { trigger: '.stack-grid', start: 'top 82%' } })
})
</script>

<template>
  <div class="page-about">
    <section class="page-hero">
      <p class="eyebrow">Sobre Nosotros</p>
      <h1>Construimos agentes IA que trabajan 24/7 para PYMES colombianas.</h1>
      <p class="page-hero__sub">No vendemos chatbots genéricos. Construimos sistemas conversacionales completos sobre WhatsApp, Instagram y Facebook.</p>
    </section>

    <!-- Misión / Visión / Valores -->
    <section class="section">
      <div class="about-grid" data-reveal>
        <article v-for="m in missionCards" :key="m.title" class="about-card">
          <div class="about-card__icon">{{ m.icon }}</div>
          <h3>{{ m.title }}</h3>
          <p>{{ m.text }}</p>
        </article>
      </div>
    </section>

    <!-- Stack -->
    <section class="section">
      <div class="section__head" data-reveal>
        <p class="eyebrow">Stack Tecnológico</p>
        <h2>Construido con las mejores herramientas.</h2>
      </div>
      <div class="stack-grid" data-reveal>
        <span class="stack-chip">Vue 3 + TypeScript</span>
        <span class="stack-chip">GSAP</span>
        <span class="stack-chip">Three.js</span>
        <span class="stack-chip">WhatsApp Business API</span>
        <span class="stack-chip">Meta Graph API</span>
        <span class="stack-chip">Instagram API</span>
        <span class="stack-chip">DeepSeek AI</span>
        <span class="stack-chip">Vercel</span>
        <span class="stack-chip">Supabase</span>
        <span class="stack-chip">Redis</span>
        <span class="stack-chip">Docker</span>
        <span class="stack-chip">Cloudflare</span>
      </div>
    </section>

    <!-- Demo -->
    <section class="section">
      <div class="section__head" data-reveal>
        <p class="eyebrow">Demo sectorial</p>
        <h2>Flujo de atención para concesionarios.</h2>
        <p>Una referencia para explicar cómo se conectan la conversación, la calificación y el seguimiento comercial.</p>
      </div>
      <div class="case-grid" data-reveal>
        <article class="case-card">
          <div class="case-card__industry">Demo sectorial · Automotriz</div>
          <h3>Conversación conectada con el equipo comercial</h3>
          <p class="case-card__problem"><strong>Escenario:</strong> Las consultas llegan por mensajería y necesitan contexto antes de pasar a ventas.</p>
          <p class="case-card__solution"><strong>Flujo:</strong> El agente recopila los datos acordados, registra el lead y deriva la conversación.</p>
          <div class="case-results">
            <div class="case-result"><strong>WhatsApp</strong><span>Consulta inicial</span></div>
            <div class="case-result"><strong>Datos clave</strong><span>Calificación</span></div>
            <div class="case-result"><strong>CRM</strong><span>Registro</span></div>
            <div class="case-result"><strong>Equipo humano</strong><span>Escalamiento</span></div>
          </div>
        </article>
      </div>
    </section>

    <section class="section cta-section" data-reveal>
      <h2>¿Querés esto en tu negocio?</h2>
      <p>Agendá un diagnóstico de 20 minutos. Sin costo, sin compromiso.</p>
      <RouterLink to="/contacto" class="btn btn--primary">Empezar ahora</RouterLink>
    </section>
  </div>
</template>
