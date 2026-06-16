<script setup lang="ts">
import { onMounted, onUnmounted, nextTick } from 'vue'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from './components/sections/HeroSection.vue'
import TrustBar from './components/sections/TrustBar.vue'
import ServicesSection from './components/sections/ServicesSection.vue'
import UseCasesSection from './components/sections/UseCasesSection.vue'
import InteractiveDemoSection from './components/sections/InteractiveDemoSection.vue'
import CaseStudiesSection from './components/sections/CaseStudiesSection.vue'
import RoiCalculatorSection from './components/sections/RoiCalculatorSection.vue'
import StatsSection from './components/sections/StatsSection.vue'
import PricingSection from './components/sections/PricingSection.vue'
import ComparisonSection from './components/sections/ComparisonSection.vue'
import FaqSection from './components/sections/FaqSection.vue'
import ContactSection from './components/sections/ContactSection.vue'
import { integrationGroups } from './data/integrations'

gsap.registerPlugin(ScrollTrigger)

// ── Copy ────────────────────────────────────────
const copy = {
  heroBadge: 'Agentes IA para vender, atender y crecer en Meta',
  heroTitle: 'Agentes IA para vender por WhatsApp, responder Instagram y cerrar más leads con tu equipo actual.',
  heroLead:
    'Implementamos automatización conversacional para PYMES colombianas: WhatsApp Business API, Instagram DMs, Facebook Lead Ads, catálogos, CRM, n8n y seguimiento comercial con aprobación humana.',
  primaryCta: 'Agendar diagnóstico gratis',
  secondaryCta: 'Calcular mi ROI'
}

const pains = [
  { title: 'Leads sin respuesta', text: 'Tus clientes escriben por WhatsApp, Instagram y Facebook. El 60% no recibe respuesta en menos de 4 horas y se va con la competencia.' },
  { title: 'Operaciones manuales', text: 'Tu equipo copia datos, persigue conversaciones y pierde contexto entre canales. Horas que podrían dedicarse a cerrar ventas.' },
  { title: 'IA sin operación real', text: 'Probaste chatbots pero no conectan con tu CRM, no hacen seguimiento y no miden resultados de negocio.' }
]

const process = [
  { number: '01', title: 'Diagnóstico', description: 'Identificamos el canal y flujo de mayor impacto para tu negocio.' },
  { number: '02', title: 'Blueprint', description: 'Diseñamos el guion, integraciones y reglas de escalamiento.' },
  { number: '03', title: 'Build', description: 'Construimos el agente, flujos n8n y conexiones con Meta y CRM.' },
  { number: '04', title: 'Prueba', description: 'Simulamos casos reales, fallos y mensajes sensibles antes de producción.' },
  { number: '05', title: 'Operación', description: 'Monitoreamos, medimos y mejoramos el sistema cada mes.' }
]

// ── Lenis + GSAP ──────────────────────────────────
let lenis: Lenis | null = null

onMounted(async () => {
  lenis = new Lenis({ duration: 1.05, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis?.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  await nextTick()

  // Global reveal
  gsap.from('[data-reveal]', {
    y: 28, autoAlpha: 0, duration: 0.72, ease: 'power3.out',
    stagger: 0.06,
    scrollTrigger: { trigger: '.site-main', start: 'top 72%' }
  })

  // Pricing cards scale in
  gsap.from('.pricing-card', {
    scale: 0.92, autoAlpha: 0, duration: 0.7, ease: 'back.out(1.4)',
    stagger: 0.12,
    scrollTrigger: { trigger: '.pricing-grid', start: 'top 78%' }
  })

  // Case cards slide from alternating sides
  gsap.from('.case-card:nth-child(odd)', {
    x: -40, autoAlpha: 0, duration: 0.65, ease: 'power3.out',
    scrollTrigger: { trigger: '.case-grid', start: 'top 78%' }
  })
  gsap.from('.case-card:nth-child(even)', {
    x: 40, autoAlpha: 0, duration: 0.65, ease: 'power3.out',
    scrollTrigger: { trigger: '.case-grid', start: 'top 78%' }
  })

  // Meta cards pop in
  gsap.from('.meta-card', {
    y: 50, autoAlpha: 0, scale: 0.9, duration: 0.6, ease: 'power4.out',
    stagger: 0.1,
    scrollTrigger: { trigger: '.meta-grid', start: 'top 80%' }
  })

  // Service cards with staggered scale
  gsap.from('.service-card', {
    scale: 0.85, autoAlpha: 0, y: 30, duration: 0.55, ease: 'back.out(1.2)',
    stagger: { each: 0.06, from: 'start' },
    scrollTrigger: { trigger: '.service-grid', start: 'top 80%' }
  })

  // Comparison table rows stagger from left
  gsap.from('.comparison-row:not(.header)', {
    x: -30, autoAlpha: 0, duration: 0.5, ease: 'power2.out',
    stagger: 0.08,
    scrollTrigger: { trigger: '.comparison-table', start: 'top 78%' }
  })

  // Trust bar parallax
  const trustBar = document.querySelector('.trust-bar')
  if (trustBar) {
    gsap.to(trustBar, {
      backgroundPosition: '0% 50%',
      ease: 'none',
      scrollTrigger: { trigger: trustBar, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
    })
  }

  // Process cards sequential reveal
  gsap.from('.process-card', {
    y: 40, autoAlpha: 0, duration: 0.5, ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: { trigger: '.process-grid', start: 'top 82%' }
  })

  // Integration chips cascade
  gsap.from('.integration-chip', {
    scale: 0, autoAlpha: 0, duration: 0.35, ease: 'back.out(1.7)',
    stagger: 0.03,
    scrollTrigger: { trigger: '.integrations-grid', start: 'top 82%' }
  })

  ScrollTrigger.refresh()
})

onUnmounted(() => {
  lenis?.destroy()
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>

<template>
  <div class="site-shell" id="top">
    <!-- ── Nav ────────────────────────────────── -->
    <header class="nav">
      <a class="nav__brand" href="#top" aria-label="Agenc-IA inicio">
        <span>Agenc</span><strong>-IA</strong>
      </a>
      <nav class="nav__links" aria-label="Navegación principal">
        <a href="#servicios">Servicios</a>
        <a href="#casos">Casos</a>
        <a href="#demo">Demo</a>
        <a href="#roi">ROI</a>
        <a href="#precios">Precios</a>
        <a href="#faq">FAQ</a>
        <a href="#contacto">Contacto</a>
      </nav>
      <button class="nav__hamburger" aria-label="Menú">
        <span></span>
      </button>
    </header>

    <main class="site-main">
      <HeroSection v-bind="copy" />
      <TrustBar />

      <!-- ── Problem ──────────────────────────── -->
      <section id="problema" class="section section--split">
        <div data-reveal>
          <p class="eyebrow">El problema</p>
          <h2>Tus clientes ya están escribiendo. El problema es que nadie alcanza a responder, clasificar y hacer seguimiento a tiempo.</h2>
        </div>
        <div class="signal-list" data-reveal>
          <p>El 60% de los mensajes de WhatsApp e Instagram se responden tarde o nunca.</p>
          <p>Cada conversación vive en un canal distinto y el equipo no tiene contexto unificado.</p>
          <p>Los leads de Facebook Ads llegan a un Excel que nadie revisa a tiempo.</p>
        </div>
      </section>
      <div class="problem-grid">
        <article v-for="p in pains" :key="p.title" class="problem-card" data-reveal>
          <span></span><h3>{{ p.title }}</h3><p>{{ p.text }}</p>
        </article>
      </div>

      <!-- ── Meta Ecosystem ───────────────────── -->
      <section class="section meta-eco" data-reveal>
        <p class="eyebrow">Ecosistema Meta Activo</p>
        <h2>Todos los canales de Meta que ya podemos automatizar para tu negocio.</h2>
        <p class="section-sub">No vendemos chatbots. Construimos sistemas que conectan WhatsApp, Instagram y Facebook en un solo flujo de venta y atención.</p>
        <div class="meta-grid">
          <div class="meta-card wa"><strong>WhatsApp</strong><p>Mensajes, catálogo, pedidos, Flows, templates HSM, QR codes y webhooks.</p></div>
          <div class="meta-card ig"><strong>Instagram</strong><p>DMs, comentarios en posts y reels, story replies, publicación y métricas.</p></div>
          <div class="meta-card fb"><strong>Facebook</strong><p>Lead Ads, Messenger, comentarios, moderación, publicación, insights y webhooks.</p></div>
          <div class="meta-card"><strong>n8n + CRM</strong><p>Orquestador central: conecta Meta, CRM, hojas de cálculo, email y 400+ apps con manejo de errores.</p></div>
        </div>
      </section>

      <ServicesSection />
      <UseCasesSection />
      <InteractiveDemoSection />
      <CaseStudiesSection />
      <StatsSection />
      <RoiCalculatorSection />
      <PricingSection />

      <!-- ── Process ───────────────────────────── -->
      <section id="sistema" class="section">
        <div class="section__head" data-reveal>
          <p class="eyebrow">Cómo trabajamos</p>
          <h2>Diagnóstico → Blueprint → Build → Prueba → Operación.</h2>
        </div>
        <div class="process-grid">
          <article v-for="step in process" :key="step.number" class="process-card" data-reveal>
            <span>{{ step.number }}</span><h3>{{ step.title }}</h3><p>{{ step.description }}</p>
          </article>
        </div>
      </section>

      <!-- ── Integrations ──────────────────────── -->
      <section class="section">
        <div class="section__head" data-reveal>
          <p class="eyebrow">Integraciones</p>
          <h2>Conectamos con las herramientas que ya usás.</h2>
        </div>
        <div class="integrations-grid">
          <div v-for="ig in integrationGroups" :key="ig.group" class="integration-group" data-reveal>
            <h3>{{ ig.group }}</h3>
            <div class="integration-items">
              <span v-for="item in ig.items" :key="item.name" class="integration-chip">{{ item.name }}</span>
            </div>
          </div>
        </div>
      </section>

      <ComparisonSection />
      <FaqSection />
      <ContactSection />
    </main>

    <!-- ── Footer ─────────────────────────────── -->
    <footer class="app-footer">
      <div class="app-footer__inner">
        <div class="app-footer__brand">
          <span class="brand-name"><span>Agenc</span><strong>-IA</strong></span>
          <p>Agentes IA para vender por WhatsApp, Instagram y Facebook. PYMES colombianas.</p>
        </div>
        <div class="app-footer__links">
          <strong>Secciones</strong>
          <a href="#servicios">Servicios</a><a href="#casos">Casos</a>
          <a href="#demo">Demo</a><a href="#roi">ROI</a>
          <a href="#precios">Precios</a><a href="#faq">FAQ</a>
        </div>
        <div class="app-footer__links">
          <strong>Contacto</strong>
          <a href="mailto:leinadgalaxy@gmail.com">leinadgalaxy@gmail.com</a>
          <a href="https://wa.me/573001234567">WhatsApp</a>
          <a href="https://github.com/rolito240/Agenc-IA">GitHub</a>
        </div>
      </div>
      <div class="app-footer__bottom">
        <span>© 2026 Agenc-IA. Todos los derechos reservados.</span>
        <span class="footer-badge">Hecho con IA + criterio humano 🇨🇴</span>
      </div>
    </footer>
  </div>
</template>
