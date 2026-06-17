<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from '../components/sections/HeroSection.vue'
import TrustBar from '../components/sections/TrustBar.vue'
import StatsSection from '../components/sections/StatsSection.vue'

gsap.registerPlugin(ScrollTrigger)

const pains = [
  { title: 'Leads sin respuesta', text: 'Tus clientes escriben por WhatsApp, Instagram y Facebook. El 60% no recibe respuesta en menos de 4 horas y se va con la competencia.' },
  { title: 'Operaciones manuales', text: 'Tu equipo copia datos, persigue conversaciones y pierde contexto entre canales. Horas que podrían dedicarse a cerrar ventas.' },
  { title: 'IA sin operación real', text: 'Probaste chatbots pero no conectan con tu CRM, no hacen seguimiento y no miden resultados de negocio.' }
]

const useCases = [
  { emoji: '🚗', title: 'Concesionarios y compraventas', desc: 'Califica compradores por WhatsApp. El vendedor recibe el lead caliente listo para cerrar.' },
  { emoji: '🍽️', title: 'Restaurantes y cafés', desc: 'Menú, horarios y reservas por Instagram DM y WhatsApp. Recordatorios automáticos.' },
  { emoji: '🏥', title: 'Clínicas y consultorios', desc: 'Agenda citas, confirma asistencia y reduce ausentismo con WhatsApp Flows.' },
  { emoji: '🏠', title: 'Inmobiliarias', desc: 'Lead Ads de Facebook → WhatsApp con catálogo de inmuebles y agenda de visitas.' },
  { emoji: '🛍️', title: 'E-commerce y marcas', desc: 'Catálogo WhatsApp + pedidos + seguimiento de envío. Todo en el chat.' },
  { emoji: '📋', title: 'Servicios profesionales', desc: 'Recibe documentos, resume, clasifica. Abogados, contadores, consultores.' }
]

let lenis: Lenis | null = null

onMounted(() => {
  lenis = new Lenis({ duration: 1.05, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis?.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  // TrustBar chips — staggered fade in
  gsap.from('.trust-chip', {
    y: 16, autoAlpha: 0, duration: 0.4, ease: 'power2.out',
    stagger: 0.04,
    scrollTrigger: { trigger: '.trust-bar', start: 'top 90%' }
  })

  // Problem cards — slide from alternating sides
  gsap.from('.problem-card:nth-child(odd)', {
    x: -30, autoAlpha: 0, duration: 0.55, ease: 'power3.out',
    scrollTrigger: { trigger: '.problem-grid', start: 'top 82%' }
  })
  gsap.from('.problem-card:nth-child(even)', {
    x: 30, autoAlpha: 0, duration: 0.55, ease: 'power3.out',
    scrollTrigger: { trigger: '.problem-grid', start: 'top 82%' }
  })

  // Meta cards pop-in with spring
  gsap.from('.meta-card', {
    y: 60, autoAlpha: 0, scale: 0.85, duration: 0.65, ease: 'back.out(1.3)',
    stagger: 0.1,
    scrollTrigger: { trigger: '.meta-grid', start: 'top 82%' }
  })

  // Use case cards — gentle stagger
  gsap.from('.usecase-card', {
    y: 40, autoAlpha: 0, duration: 0.5, ease: 'power3.out',
    stagger: { each: 0.08, from: 'start' },
    scrollTrigger: { trigger: '.usecase-grid', start: 'top 82%' }
  })
})

onUnmounted(() => {
  lenis?.destroy()
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>

<template>
  <div class="page-home">
    <HeroSection
      hero-badge="Agentes IA que venden, atienden y crecen con vos"
      hero-title="Agentes IA para WhatsApp, Instagram y Facebook — sin contratar más equipo."
      hero-lead="Implementamos automatización conversacional para PYMES colombianas. Diagnóstico gratis en 20 minutos."
      primary-cta="Agendar diagnóstico"
      secondary-cta="Ver servicios"
    />
    <TrustBar />

    <section class="section section--split">
      <div data-reveal>
        <p class="eyebrow">El problema</p>
        <h2>Tus clientes ya te están escribiendo. El problema es que nadie alcanza a responder a tiempo.</h2>
      </div>
      <div class="signal-list" data-reveal>
        <p>El 60% de los mensajes de WhatsApp e Instagram no reciben respuesta en menos de 4 horas.</p>
        <p>Cada conversación vive en un canal distinto y tu equipo no tiene el contexto unificado.</p>
        <p>Los leads de Facebook Ads llegan a un Excel que nadie revisa.</p>
      </div>
    </section>
    <div class="problem-grid">
      <article v-for="p in pains" :key="p.title" class="problem-card">
        <span></span><h3>{{ p.title }}</h3><p>{{ p.text }}</p>
      </article>
    </div>

    <section class="section meta-eco">
      <p class="eyebrow">Ecosistema Meta Activo</p>
      <h2>Todos los canales que ya automatizamos para tu negocio.</h2>
      <p class="section-sub">No vendemos chatbots. Construimos sistemas que conectan WhatsApp, Instagram y Facebook en un solo flujo de venta y atención.</p>
      <div class="meta-grid">
        <div class="meta-card wa"><strong>WhatsApp</strong><p>Mensajes, catálogo, pedidos, Flows, templates HSM, QR codes y webhooks en tiempo real.</p></div>
        <div class="meta-card ig"><strong>Instagram</strong><p>DMs, comentarios en posts y reels, story replies, publicación programada y métricas.</p></div>
        <div class="meta-card fb"><strong>Facebook</strong><p>Lead Ads, Messenger, comentarios, moderación, publicación, insights y webhooks.</p></div>
        <div class="meta-card"><strong>n8n + CRM</strong><p>Orquestador central: conecta Meta, CRM, hojas de cálculo, email y 400+ apps.</p></div>
      </div>
    </section>

    <section class="section">
      <div class="section__head">
        <p class="eyebrow">Industrias</p>
        <h2>Agentes IA para cada tipo de negocio en Colombia.</h2>
      </div>
      <div class="usecase-grid">
        <article v-for="uc in useCases" :key="uc.title" class="usecase-card">
          <span class="usecase-emoji">{{ uc.emoji }}</span>
          <div><h3>{{ uc.title }}</h3><p>{{ uc.desc }}</p></div>
        </article>
      </div>
      <div class="section-cta">
        <RouterLink to="/servicios" class="btn btn--primary">Ver los 15 servicios →</RouterLink>
      </div>
    </section>

    <StatsSection />

    <section class="section cta-section">
      <h2>¿Listo para que tus redes trabajen 24/7?</h2>
      <p>Agendá un diagnóstico de 20 minutos. Sin costo, sin compromiso.</p>
      <div class="cta-actions">
        <RouterLink to="/contacto" class="btn btn--primary">Agendar diagnóstico gratis</RouterLink>
        <RouterLink to="/precios" class="btn btn--secondary">Ver planes y precios</RouterLink>
      </div>
    </section>
  </div>
</template>
