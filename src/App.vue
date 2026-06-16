<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AgentNetwork from './components/AgentNetwork.vue'
import { services } from './data/services'
import { pricingPlans } from './data/pricing'
import { caseStudies } from './data/cases'
import { faqs } from './data/faq'
import { integrationGroups } from './data/integrations'
import { calculateRoi } from './utils/roi'
import type { RoiInput } from './data/content'

gsap.registerPlugin(ScrollTrigger)

// ── State ────────────────────────────────────────
const mobileMenuOpen = ref(false)
const serviceFilter = ref<'todas' | 'ventas' | 'soporte' | 'ecommerce' | 'social' | 'automatizacion' | 'consultoria'>('todas')
const activeDemoTab = ref<'ventas' | 'soporte' | 'ecommerce' | 'social'>( 'ventas')

// ── Form ─────────────────────────────────────────
type FormState = 'idle' | 'sending' | 'sent' | 'error'
const formState = ref<FormState>('idle')
const form = ref({ name: '', business_type: '', phone: '', email: '', service_interest: 'Agente de ventas por WhatsApp', need: '' })

// ── ROI defaults ─────────────────────────────────
const roiInput = ref<RoiInput>({
  monthlyLeads: 100,
  missedLeadRate: 0.3,
  averageTicket: 500000,
  grossMarginRate: 0.35,
  currentConversionRate: 0.08,
  expectedLiftRate: 0.5,
  weeklyManualHours: 5,
  hourlyCost: 12000,
  monthlyPlanCost: 690000,
  setupCost: 800000
})
const roiResult = ref(calculateRoi(roiInput.value))

function updateRoi() {
  roiResult.value = calculateRoi(roiInput.value)
}

// ── Filtered services ────────────────────────────

// ── Lenis
let lenis: Lenis | null = null

const copy = {
  heroBadge: 'Agentes IA para vender, atender y crecer en Meta',
  heroTitle: 'Agentes IA para vender por WhatsApp, responder Instagram y cerrar más leads con tu equipo actual.',
  heroLead:
    'Implementamos automatización conversacional para PYMES colombianas: WhatsApp Business API, Instagram DMs, Facebook Lead Ads, catálogos, CRM, n8n y seguimiento comercial con aprobación humana.',
  primaryCta: 'Agendar diagnóstico gratis',
  secondaryCta: 'Calcular mi ROI'
}

const pains = [
  {
    title: 'Leads sin respuesta',
    text: 'Tus clientes escriben por WhatsApp, Instagram y Facebook. El 60% no recibe respuesta en menos de 4 horas y se va con la competencia.'
  },
  {
    title: 'Operaciones manuales',
    text: 'Tu equipo copia datos, persigue conversaciones y pierde contexto entre canales. Horas que podrían dedicarse a cerrar ventas.'
  },
  {
    title: 'IA sin operación real',
    text: 'Probaste chatbots pero no conectan con tu CRM, no hacen seguimiento y no miden resultados de negocio.'
  }
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

const demoChats = {
  ventas: [
    { role: 'client', text: 'Hola, busco un carro automático de hasta 45 millones.' },
    { role: 'agent', text: 'Perfecto. Para ayudarte mejor: ¿ciudad, uso principal y si necesitas financiación?' },
    { role: 'client', text: 'Bucaramanga, familiar, podría financiar una parte.' },
    { role: 'summary', text: 'Lead caliente: automático familiar, 45M, B/manga, financiación parcial. → CRM.' }
  ],
  soporte: [
    { role: 'client', text: '¿Tienen disponibilidad para esta noche? Somos 4 personas.' },
    { role: 'agent', text: 'Déjame revisar. Tenemos mesa a las 7:30pm y 9pm. ¿Cuál prefieres?' },
    { role: 'client', text: '7:30pm perfecto.' },
    { role: 'summary', text: 'Reserva confirmada: 4 personas, hoy 7:30pm. Recordatorio programado.' }
  ],
  ecommerce: [
    { role: 'client', text: 'Quiero las zapatillas que vi en Instagram. Talla 38.' },
    { role: 'agent', text: '¡Claro! Las Air Runner están disponibles en 38. $189.000 con envío gratis.' },
    { role: 'client', text: 'Las quiero. ¿Cómo pago?' },
    { role: 'summary', text: 'Venta confirmada: Air Runner talla 38, $189.000. Link de pago enviado.' }
  ],
  social: [
    { role: 'client', text: '¿Precio? 🤔' }, // comentario en un reel
    { role: 'agent', text: '¡Hola! Te envié la info al DM. Revisa tu bandeja de solicitudes.' },
    { role: 'summary', text: 'Lead desde comentario → DM con catálogo. Cliente ya en WhatsApp.' }
  ]
}

const comparison = [
  ['', 'Agenc-IA', 'Chatbot genérico', 'Agencia web tradicional'],
  ['Canales Meta', 'WhatsApp + FB + IG', 'Solo WhatsApp', 'Solo formulario web'],
  ['CRM integrado', 'Sí (HubSpot, Sheets, etc.)', 'No', 'No'],
  ['Seguimiento post-venta', 'Automatizado', 'No', 'Manual'],
  ['Handoff a humano', 'Incluido', 'No', 'No aplica'],
  ['Medición de ROI', 'Dashboard mensual', 'No', 'No'],
  ['Moderación de comentarios', 'FB + IG incluido', 'No', 'No'],
  ['E-commerce conversacional', 'WhatsApp Catalog', 'No', 'Requiere tienda aparte'],
  ['Soporte incluido', 'Sí, todos los planes', 'Limitado', 'Cotización aparte']
]

const submitLead = async () => {
  formState.value = 'sending'
  try {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    formState.value = response.ok ? 'sent' : 'error'
    if (response.ok) {
      form.value = { name: '', business_type: '', phone: '', email: '', service_interest: form.value.service_interest, need: '' }
    }
  } catch {
    formState.value = 'error'
  }
  setTimeout(() => { formState.value = 'idle' }, 4500)
}

// ── Lifecycle ─────────────────────────────────────
onMounted(() => {
  lenis = new Lenis({ duration: 1.05, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis?.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  gsap.from('[data-reveal]', {
    y: 28,
    autoAlpha: 0,
    duration: 0.72,
    ease: 'power3.out',
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
      <button class="nav__hamburger" aria-label="Menú" @click="mobileMenuOpen = !mobileMenuOpen">
        <span :class="{ open: mobileMenuOpen }"></span>
      </button>
    </header>

    <!-- ── Mobile menu ────────────────────────── -->
    <div class="mobile-menu" :class="{ open: mobileMenuOpen }" @click.self="mobileMenuOpen = false">
      <a v-for="l in ['servicios','casos','roi','precios','faq','contacto']" :key="l"
         :href="'#' + l" @click="mobileMenuOpen = false">{{ l.charAt(0).toUpperCase() + l.slice(1) }}</a>
      <a href="https://wa.me/573001234567" class="mobile-menu__cta">Hablar por WhatsApp →</a>
    </div>

    <main class="site-main">
      <!-- ── Hero ─────────────────────────────── -->
      <section class="hero">
        <AgentNetwork />
        <div class="hero__shade"></div>
        <div class="hero__inner">
          <div class="hero__copy">
            <p class="eyebrow">{{ copy.heroBadge }}</p>
            <h1>{{ copy.heroTitle }}</h1>
            <p class="hero__lead">{{ copy.heroLead }}</p>
            <div class="hero__actions">
              <a href="#contacto" class="btn btn--primary">{{ copy.primaryCta }}</a>
              <a href="#roi" class="btn btn--secondary">{{ copy.secondaryCta }}</a>
            </div>
          </div>
          <aside class="hero-panel" aria-label="Estado del sistema">
            <div class="hero-panel__top">
              <span class="status-dot"></span>
              <span>Sistema de agentes activo</span>
            </div>
            <div class="hero-panel__agent hero-panel__agent--active">
              <span>WhatsApp</span><strong>Agente de ventas</strong>
            </div>
            <div class="hero-panel__agent">
              <span>Instagram</span><strong>DMs + Comentarios</strong>
            </div>
            <div class="hero-panel__agent">
              <span>Facebook</span><strong>Lead Ads + Messenger</strong>
            </div>
            <div class="hero-panel__agent">
              <span>n8n + CRM</span><strong>Orquestador y registro</strong>
            </div>
          </aside>
        </div>
      </section>

      <!-- ── Trust Bar ────────────────────────── -->
      <section class="trust-bar">
        <div class="trust-bar__inner">
          <span>Canales que automatizamos</span>
          <div class="trust-bar__items">
            <span class="trust-chip wa">WhatsApp</span>
            <span class="trust-chip ig">Instagram</span>
            <span class="trust-chip fb">Facebook</span>
            <span class="trust-chip">n8n</span>
            <span class="trust-chip">CRM</span>
            <span class="trust-chip">Vercel</span>
          </div>
        </div>
      </section>

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
          <span></span>
          <h3>{{ p.title }}</h3>
          <p>{{ p.text }}</p>
        </article>
      </div>

      <!-- ── Meta Ecosystem ───────────────────── -->
      <section class="section meta-eco" data-reveal>
        <p class="eyebrow">Ecosistema Meta Activo</p>
        <h2>Todos los canales de Meta que ya podemos automatizar para tu negocio.</h2>
        <p class="section-sub">No vendemos chatbots. Construimos sistemas que conectan WhatsApp, Instagram y Facebook en un solo flujo de venta y atención.</p>
        <div class="meta-grid">
          <div class="meta-card wa"><strong>WhatsApp</strong><p>Mensajes, catálogo, pedidos, Flows, templates HSM, QR codes y webhooks en tiempo real.</p></div>
          <div class="meta-card ig"><strong>Instagram</strong><p>DMs, comentarios en posts y reels, story replies, publicación programada y métricas.</p></div>
          <div class="meta-card fb"><strong>Facebook</strong><p>Lead Ads, Messenger, comentarios, moderación, publicación, insights y webhooks.</p></div>
          <div class="meta-card"><strong>n8n + CRM</strong><p>Orquestador central. Conecta Meta, CRM, hojas de cálculo, email y 400+ apps.</p></div>
        </div>
      </section>

      <!-- ── Services ─────────────────────────── -->
      <section id="servicios" class="section">
        <div class="section__head" data-reveal>
          <p class="eyebrow">Servicios</p>
          <h2>No compras un bot. Compras un flujo que atiende, vende, registra y avisa cuando toca intervenir.</h2>
        </div>
        <div class="service-filters" data-reveal>
          <button v-for="cat in (['todas','ventas','soporte','ecommerce','social','automatizacion','consultoria'] as const)"
                  :key="cat" class="filter-chip" :class="{ active: serviceFilter === cat }"
                  @click="serviceFilter = cat">{{ cat === 'todas' ? 'Todas' : cat.charAt(0).toUpperCase() + cat.slice(1) }}
          </button>
        </div>
        <div class="service-grid">
          <article v-for="s in services.filter(x => serviceFilter === 'todas' || x.category === serviceFilter)"
                   :key="s.id" class="service-card" data-reveal>
            <div class="service-card__cat">{{ s.category }}</div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.short }}</p>
            <p class="service-card__outcome">📈 {{ s.outcome }}</p>
            <div class="tags">
              <span v-for="t in s.metaCapabilities.slice(0, 4)" :key="t">{{ t }}</span>
              <span v-if="s.metaCapabilities.length > 4" class="tag-more">+{{ s.metaCapabilities.length - 4 }}</span>
            </div>
            <div v-if="s.startingAt" class="service-card__price">{{ s.startingAt }}</div>
          </article>
        </div>
      </section>

      <!-- ── Use Cases ────────────────────────── -->
      <section id="casos" class="section">
        <div class="section__head" data-reveal>
          <p class="eyebrow">Casos de uso</p>
          <h2>Agentes IA para cada tipo de negocio en Colombia.</h2>
        </div>
        <div class="usecase-grid">
          <article v-for="uc in useCases" :key="uc.title" class="usecase-card" data-reveal>
            <h3>{{ uc.title }}</h3>
            <p>{{ uc.desc }}</p>
          </article>
        </div>
      </section>

      <!-- ── Interactive Demo ──────────────────── -->
      <section id="demo" class="demo" data-reveal>
        <div class="demo__content">
          <p class="eyebrow">Demo interactiva</p>
          <h2>Así se ve un agente Agenc-IA en acción.</h2>
          <div class="demo-tabs">
            <button :class="{ active: activeDemoTab === 'ventas' }" @click="activeDemoTab = 'ventas'">Ventas</button>
            <button :class="{ active: activeDemoTab === 'soporte' }" @click="activeDemoTab = 'soporte'">Atención</button>
            <button :class="{ active: activeDemoTab === 'ecommerce' }" @click="activeDemoTab = 'ecommerce'">E-commerce</button>
            <button :class="{ active: activeDemoTab === 'social' }" @click="activeDemoTab = 'social'">Social</button>
          </div>
        </div>
        <div class="chat-demo" aria-label="Demo de conversación">
          <p v-for="(msg, i) in (demoChats as any)[activeDemoTab]" :key="i"
             class="bubble" :class="'bubble--' + msg.role">{{ msg.text }}</p>
        </div>
      </section>

      <!-- ── Case Studies ──────────────────────── -->
      <section class="section">
        <div class="section__head" data-reveal>
          <p class="eyebrow">Casos de estudio</p>
          <h2>Resultados reales con agentes IA conectados a Meta.</h2>
          <p>Casos piloto del sistema Auto Sales AI OS y otros verticales.</p>
        </div>
        <div class="case-grid">
          <article v-for="c in caseStudies" :key="c.id" class="case-card" data-reveal>
            <div class="case-card__industry">{{ c.industry }}</div>
            <h3>{{ c.client }}</h3>
            <p class="case-card__problem"><strong>Problema:</strong> {{ c.problem }}</p>
            <p class="case-card__solution"><strong>Solución:</strong> {{ c.solution }}</p>
            <div class="case-results">
              <div v-for="r in c.results" :key="r.metric" class="case-result">
                <strong>{{ r.value }}</strong><span>{{ r.metric }}</span>
              </div>
            </div>
            <div v-if="c.testimonial" class="case-quote">
              "{{ c.testimonial.quote }}" — {{ c.testimonial.author }}
            </div>
          </article>
        </div>
      </section>

      <!-- ── ROI Calculator ────────────────────── -->
      <section id="roi" class="section roi-section">
        <div class="section__head" data-reveal>
          <p class="eyebrow">Calculadora de ROI</p>
          <h2>¿Cuánto podrías estar ganando con un agente IA?</h2>
          <p>Ajustá los valores y descubrí el retorno estimado.</p>
        </div>
        <div class="roi-grid" data-reveal>
          <div class="roi-inputs">
            <div class="input-group">
              <label>Leads que recibís al mes</label>
              <input type="number" v-model.number="roiInput.monthlyLeads" @input="updateRoi" min="10" max="5000" />
            </div>
            <div class="input-group">
              <label>% de leads que no se responden a tiempo</label>
              <input type="range" v-model.number="roiInput.missedLeadRate" @input="updateRoi" min="0.1" max="0.9" step="0.05" />
              <span>{{ Math.round(roiInput.missedLeadRate * 100) }}%</span>
            </div>
            <div class="input-group">
              <label>Ticket promedio de venta (COP)</label>
              <input type="number" v-model.number="roiInput.averageTicket" @input="updateRoi" min="50000" max="50000000" step="50000" />
            </div>
            <div class="input-group">
              <label>% de mejora esperada con el agente</label>
              <input type="range" v-model.number="roiInput.expectedLiftRate" @input="updateRoi" min="0.1" max="0.9" step="0.05" />
              <span>{{ Math.round(roiInput.expectedLiftRate * 100) }}%</span>
            </div>
          </div>
          <div class="roi-results">
            <div class="roi-result-card">
              <strong>{{ roiResult.recoveredSales.toFixed(1) }}</strong>
              <span>ventas recuperadas/mes</span>
            </div>
            <div class="roi-result-card highlight">
              <strong>${{ (roiResult.monthlyBenefit).toLocaleString('es-CO') }}</strong>
              <span>beneficio mensual estimado</span>
            </div>
            <div class="roi-result-card">
              <strong>{{ (roiResult.roi * 100).toFixed(0) }}%</strong>
              <span>ROI mensual</span>
            </div>
            <div class="roi-result-card">
              <strong>{{ isFinite(roiResult.paybackMonths) ? roiResult.paybackMonths.toFixed(1) + ' meses' : '∞' }}</strong>
              <span>para recuperar el setup</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Pricing ───────────────────────────── -->
      <section id="precios" class="section">
        <div class="section__head" data-reveal>
          <p class="eyebrow">Planes</p>
          <h2>Arrancá con un flujo rentable, medí resultados y escalá cuando el negocio crezca.</h2>
          <p>Todos los planes incluyen diagnóstico inicial sin costo.</p>
        </div>
        <div class="pricing-grid">
          <article v-for="p in pricingPlans" :key="p.id" class="pricing-card" :class="{ recommended: p.recommended }" data-reveal>
            <div v-if="p.recommended" class="pricing-badge">⭐ Más popular</div>
            <h3>{{ p.name }}</h3>
            <p class="pricing-desc">{{ p.description }}</p>
            <div class="pricing-numbers">
              <div v-if="p.monthly > 0" class="pricing-monthly">
                <strong>${{ p.monthly.toLocaleString('es-CO') }}</strong><span>/mes</span>
              </div>
              <div v-else class="pricing-monthly"><strong>Cotización</strong></div>
              <div v-if="p.setup > 0" class="pricing-setup">Setup: ${{ p.setup.toLocaleString('es-CO') }} (una vez)</div>
            </div>
            <ul class="pricing-features">
              <li v-for="inc in p.includes" :key="inc">✓ {{ inc }}</li>
            </ul>
            <ul class="pricing-limits">
              <li v-for="lim in p.limits" :key="lim">• {{ lim }}</li>
            </ul>
            <a :href="p.id === 'enterprise' ? '#contacto' : '#contacto'" class="btn btn--primary pricing-cta">
              {{ p.id === 'enterprise' ? 'Solicitar cotización' : 'Empezar diagnóstico' }}
            </a>
          </article>
        </div>
      </section>

      <!-- ── Process ───────────────────────────── -->
      <section id="sistema" class="section">
        <div class="section__head" data-reveal>
          <p class="eyebrow">Cómo trabajamos</p>
          <h2>Diagnóstico → Blueprint → Build → Prueba → Operación.</h2>
        </div>
        <div class="process-grid">
          <article v-for="step in process" :key="step.number" class="process-card" data-reveal>
            <span>{{ step.number }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
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
          <h2>¿Por qué Agenc-IA y no un chatbot genérico o una agencia web?</h2>
        </div>
        <div class="comparison-table" data-reveal>
          <div v-for="(row, ri) in comparison" :key="ri" class="comparison-row" :class="{ header: ri === 0 }">
            <span v-for="(cell, ci) in row" :key="ci" :class="{ 'col-agenc': ci === 1 }">{{ cell }}</span>
          </div>
        </div>
      </section>

      <!-- ── FAQ ───────────────────────────────── -->
      <section id="faq" class="section">
        <div class="section__head" data-reveal>
          <p class="eyebrow">Preguntas frecuentes</p>
          <h2>Todo lo que necesitás saber antes de empezar.</h2>
        </div>
        <div class="faq-list" data-reveal>
          <details v-for="f in faqs" :key="f.question" class="faq-item">
            <summary>{{ f.question }}</summary>
            <p>{{ f.answer }}</p>
          </details>
        </div>
      </section>

      <!-- ── Contact ───────────────────────────── -->
      <section id="contacto" class="contact">
        <div class="contact__copy" data-reveal>
          <p class="eyebrow">Contacto</p>
          <h2>Contanos qué canal te duele más.</h2>
          <p>WhatsApp, Instagram, Facebook, ecommerce o seguimiento comercial. Te devolvemos un diagnóstico corto con el primer flujo recomendado.</p>
          <a href="mailto:leinadgalaxy@gmail.com">leinadgalaxy@gmail.com</a>
          <div class="contact__whatsapp">
            <a href="https://wa.me/573001234567" class="btn btn--secondary">Hablar por WhatsApp →</a>
          </div>
        </div>
        <form class="lead-form" @submit.prevent="submitLead" data-reveal>
          <input v-model="form.name" name="name" placeholder="Nombre" required />
          <input v-model="form.business_type" name="business_type" placeholder="Tipo de negocio" required />
          <div class="lead-form__split">
            <input v-model="form.phone" name="phone" placeholder="WhatsApp / teléfono" required />
            <input v-model="form.email" name="email" type="email" placeholder="Email" required />
          </div>
          <select v-model="form.service_interest" name="service_interest">
            <option v-for="s in services" :key="s.id" :value="s.title">{{ s.title }}</option>
            <option>No estoy seguro, quiero diagnóstico</option>
          </select>
          <textarea v-model="form.need" name="need" rows="5" placeholder="¿Qué problema querés resolver o qué proceso querés automatizar?" required></textarea>
          <!-- honeypot -->
          <input type="text" name="company_website" style="position:absolute;left:-9999px" tabindex="-1" autocomplete="off" />
          <button class="btn btn--primary" type="submit" :disabled="formState === 'sending' || formState === 'sent'">
            <span v-if="formState === 'idle'">Enviar diagnóstico</span>
            <span v-else-if="formState === 'sending'">Enviando...</span>
            <span v-else-if="formState === 'sent'">✅ Recibido. Te contactamos pronto.</span>
            <span v-else>❌ Error. Intentá por email o WhatsApp.</span>
          </button>
        </form>
      </section>
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
          <a href="#servicios">Servicios</a>
          <a href="#casos">Casos</a>
          <a href="#roi">ROI</a>
          <a href="#precios">Precios</a>
          <a href="#faq">FAQ</a>
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
