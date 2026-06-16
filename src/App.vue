<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from './components/sections/HeroSection.vue'
import TrustBar from './components/sections/TrustBar.vue'
import ServicesSection from './components/sections/ServicesSection.vue'
import CaseStudiesSection from './components/sections/CaseStudiesSection.vue'
import RoiCalculatorSection from './components/sections/RoiCalculatorSection.vue'
import PricingSection from './components/sections/PricingSection.vue'
import FaqSection from './components/sections/FaqSection.vue'
import ContactSection from './components/sections/ContactSection.vue'

gsap.registerPlugin(ScrollTrigger)

// ── Mobile menu ────────────────────────────────
const mobileMenuOpen = { value: false }
;(window as any).__toggleMobileMenu = () => mobileMenuOpen.value = !mobileMenuOpen.value

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

const useCases = [
  { title: 'Concesionarios', desc: 'Califica compradores, presupuesto y urgencia por WhatsApp. Avisa al vendedor cuando hay lead caliente.' },
  { title: 'Restaurantes', desc: 'Responde menú, horarios y toma reservas por Instagram DM y WhatsApp 24/7.' },
  { title: 'Clínicas', desc: 'Agenda citas, confirma asistencia y reduce no-shows con recordatorios automáticos.' },
  { title: 'Inmobiliarias', desc: 'Lead Ads de Facebook → WhatsApp con catálogo de inmuebles y agenda de visitas.' },
  { title: 'E-commerce', desc: 'Catálogo WhatsApp, pedidos y seguimiento de envío sin sacar al cliente del chat.' },
  { title: 'Servicios profesionales', desc: 'Recibe documentos, resume, clasifica y prepara para revisión del profesional.' }
]

import { integrationGroups } from './data/integrations'

const comparison = [
  ['', 'Agenc-IA', 'Chatbot genérico', 'Agencia web'],
  ['Canales Meta', 'WhatsApp + FB + IG', 'Solo WhatsApp', 'Solo formulario web'],
  ['CRM integrado', 'Sí (HubSpot, Sheets, etc.)', 'No', 'No'],
  ['Seguimiento post-venta', 'Automatizado', 'No', 'Manual'],
  ['Handoff a humano', 'Incluido', 'No', 'No aplica'],
  ['Medición de ROI', 'Dashboard mensual', 'No', 'No'],
  ['Moderación comentarios', 'FB + IG incluido', 'No', 'No'],
  ['E-commerce conversacional', 'WhatsApp Catalog', 'No', 'Requiere tienda aparte'],
  ['Soporte incluido', 'Todos los planes', 'Limitado', 'Cotización aparte']
]

// ── Lenis ─────────────────────────────────────────
let lenis: Lenis | null = null

onMounted(() => {
  lenis = new Lenis({ duration: 1.05, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis?.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  gsap.from('[data-reveal]', {
    y: 28, autoAlpha: 0, duration: 0.72, ease: 'power3.out',
    stagger: 0.06,
    scrollTrigger: { trigger: '.site-main', start: 'top 72%' }
  })
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
        <a href="#roi">ROI</a>
        <a href="#precios">Precios</a>
        <a href="#faq">FAQ</a>
        <a href="#contacto">Contacto</a>
      </nav>
      <button class="nav__hamburger" aria-label="Menú" @click="mobileMenuOpen.value = !mobileMenuOpen.value">
        <span :class="{ open: mobileMenuOpen.value }"></span>
      </button>
    </header>

    <main class="site-main">
      <!-- ── Hero ─────────────────────────────── -->
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
          <p>Los leads de Facebook Ads llegan a un Excel que nadie revisa.</p>
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
          <div class="meta-card"><strong>n8n + CRM</strong><p>Orquestador central: conecta Meta, CRM, hojas de cálculo, email y 400+ apps.</p></div>
        </div>
      </section>

      <!-- ── Services ─────────────────────────── -->
      <ServicesSection />

      <!-- ── Use Cases ────────────────────────── -->
      <section id="casos" class="section">
        <div class="section__head" data-reveal>
          <p class="eyebrow">Casos de uso</p>
          <h2>Agentes IA para cada tipo de negocio en Colombia.</h2>
        </div>
        <div class="usecase-grid">
          <article v-for="uc in useCases" :key="uc.title" class="usecase-card" data-reveal>
            <h3>{{ uc.title }}</h3><p>{{ uc.desc }}</p>
          </article>
        </div>
      </section>

      <!-- ── Demo ─────────────────────────────── -->
      <section id="demo" class="demo" data-reveal>
        <div class="demo__content">
          <p class="eyebrow">Demo</p>
          <h2>Así se ve un agente Agenc-IA en acción.</h2>
          <p>Mensajes reales de ventas, soporte y e-commerce atendidos automáticamente, con resumen listo para el equipo humano.</p>
        </div>
        <div class="chat-demo" aria-label="Demo de conversación">
          <p class="bubble bubble--client">Hola, busco un carro automático de hasta 45 millones.</p>
          <p class="bubble bubble--agent">Perfecto. Para ayudarte mejor: ¿ciudad, uso principal y si necesitas financiación?</p>
          <p class="bubble bubble--client">Bucaramanga, familiar, podría financiar una parte.</p>
          <p class="bubble bubble--summary">Lead caliente: automático familiar, 45M, B/manga, financiación parcial. → CRM.</p>
        </div>
      </section>

      <!-- ── Case Studies ──────────────────────── -->
      <CaseStudiesSection />

      <!-- ── ROI Calculator ────────────────────── -->
      <RoiCalculatorSection />

      <!-- ── Pricing ───────────────────────────── -->
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

      <!-- ── Comparison ────────────────────────── -->
      <section class="section">
        <div class="section__head" data-reveal>
          <p class="eyebrow">Comparativa</p>
          <h2>¿Por qué Agenc-IA?</h2>
        </div>
        <div class="comparison-table" data-reveal>
          <div v-for="(row, ri) in comparison" :key="ri" class="comparison-row" :class="{ header: ri === 0 }">
            <span v-for="(cell, ci) in row" :key="ci" :class="{ 'col-agenc': ci === 1 }">{{ cell }}</span>
          </div>
        </div>
      </section>

      <!-- ── FAQ ───────────────────────────────── -->
      <FaqSection />

      <!-- ── Contact ───────────────────────────── -->
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
          <a href="#roi">ROI</a><a href="#precios">Precios</a><a href="#faq">FAQ</a>
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
