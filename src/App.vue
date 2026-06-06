<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AgentNetwork from './components/AgentNetwork.vue'

gsap.registerPlugin(ScrollTrigger)

type Locale = 'es' | 'en'
type FormState = 'idle' | 'sending' | 'sent' | 'error'

const locale = ref<Locale>('es')
const formState = ref<FormState>('idle')
const form = reactive({
  name: '',
  business_type: '',
  phone: '',
  email: '',
  service_interest: 'Agente de ventas por WhatsApp',
  need: ''
})

let lenis: Lenis | null = null

const copy = computed(() => ({
  nav: locale.value === 'es'
    ? [
        ['Problema', 'problema'],
        ['Servicios', 'servicios'],
        ['Demo', 'demo'],
        ['Sistema', 'sistema'],
        ['Contacto', 'contacto']
      ]
    : [
        ['Problem', 'problema'],
        ['Services', 'servicios'],
        ['Demo', 'demo'],
        ['System', 'sistema'],
        ['Contact', 'contacto']
      ],
  heroBadge: locale.value === 'es'
    ? 'Agentes IA personalizados para negocios reales'
    : 'Custom AI agents for real businesses',
  heroTitle: locale.value === 'es'
    ? 'Agenc-IA convierte conversaciones, tareas y datos en sistemas que trabajan.'
    : 'Agenc-IA turns conversations, tasks, and data into working systems.',
  heroText: locale.value === 'es'
    ? 'Disenamos agentes IA para vender, atender clientes y automatizar operaciones con WhatsApp, n8n, CRM y aprobacion humana donde importa.'
    : 'We design AI agents for sales, customer care, and operations with WhatsApp, n8n, CRM, and human approval where it matters.',
  primaryCta: locale.value === 'es' ? 'Pedir diagnostico' : 'Request diagnostic',
  secondaryCta: locale.value === 'es' ? 'Ver demo' : 'View demo',
  formTitle: locale.value === 'es' ? 'Cuéntame qué quieres automatizar' : 'Tell me what you want to automate',
  formText: locale.value === 'es'
    ? 'Recibiras una primera lectura de oportunidad y el siguiente paso recomendado.'
    : 'You will receive a first opportunity read and the recommended next step.'
}))

const marketSignals = [
  'Muchas empresas ya prueban IA, pero pocas la convierten en flujo operativo medible.',
  'El valor esta en conectar modelos con procesos: mensajes, CRM, documentos, alertas y responsables.',
  'Agenc-IA vende implementacion: agentes utiles, reglas claras y mejora continua.'
]

const pains = [
  { title: 'Leads sin respuesta', text: 'El cliente escribe por WhatsApp o formulario y nadie lo califica a tiempo.' },
  { title: 'Operaciones manuales', text: 'El equipo copia datos, redacta lo mismo y pierde contexto entre herramientas.' },
  { title: 'IA sin control', text: 'Hay pruebas de chat, pero no hay aprobaciones, logs ni entrega confiable.' }
]

const services = [
  {
    title: 'Agente de ventas',
    text: 'Califica leads, detecta urgencia, prepara seguimiento y avisa cuando hay oportunidad caliente.',
    tags: ['WhatsApp', 'CRM', 'Follow-up']
  },
  {
    title: 'Agente de atencion',
    text: 'Responde preguntas frecuentes, recopila datos, escala casos sensibles y mantiene tono de marca.',
    tags: ['Soporte', 'FAQs', 'Escalacion']
  },
  {
    title: 'Agente oficina/legal',
    text: 'Resume documentos, prepara borradores, revisa informacion publica y deja todo para revision humana.',
    tags: ['Docs', 'Research', 'Admin']
  },
  {
    title: 'Agente hospitality',
    text: 'Ayuda con SOPs, menus, proveedores, inventario, turnos y planeacion ligera para cafes/restaurantes.',
    tags: ['SOPs', 'Costos', 'Operaciones']
  },
  {
    title: 'Automatizacion n8n',
    text: 'Conecta formularios, hojas, CRMs, webhooks, alertas y tareas con manejo de errores.',
    tags: ['n8n', 'APIs', 'Alertas']
  },
  {
    title: 'Funnel web listo para IA',
    text: 'Landing, diagnostico, captura de leads y rutas de automatizacion para vender una oferta concreta.',
    tags: ['Vercel', 'Forms', 'SEO']
  }
]

const process = [
  ['01', 'Diagnostico', 'Elegimos el punto de mayor impacto y definimos la conversacion o flujo clave.'],
  ['02', 'Blueprint', 'Mapeamos entradas, salidas, herramientas, aprobaciones y datos que necesita el agente.'],
  ['03', 'Build', 'Construimos el agente, n8n, prompts, formularios y handoff humano.'],
  ['04', 'Prueba', 'Simulamos casos reales, fallos, mensajes sensibles y limites de autonomia.'],
  ['05', 'Operacion', 'Monitoreamos, ajustamos y convertimos aprendizajes en mejoras del sistema.']
]

const cases = [
  { name: 'Carros usados', detail: 'Demo principal para calificar comprador, presupuesto, financiacion y urgencia.' },
  { name: 'Oficina / legal ops', detail: 'Asistente vendible para documentos, webs publicas, mensajes y tareas administrativas.' },
  { name: 'Hospitality', detail: 'Agente para chef/manager: SOPs, proveedores, menu costing y briefs de local.' }
]

const stats = [
  ['3', 'agentes Hermes operativos'],
  ['10+', 'flujos y herramientas preparados'],
  ['24/7', 'captura de leads automatizable'],
  ['Human-in-loop', 'para acciones sensibles']
]

const submitLead = async () => {
  formState.value = 'sending'
  try {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    formState.value = response.ok ? 'sent' : 'error'
    if (response.ok) {
      form.name = ''
      form.business_type = ''
      form.phone = ''
      form.email = ''
      form.need = ''
      form.service_interest = 'Agente de ventas por WhatsApp'
    }
  } catch {
    formState.value = 'error'
  }

  window.setTimeout(() => {
    formState.value = 'idle'
  }, 4500)
}

onMounted(() => {
  lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  })

  const raf = (time: number) => {
    lenis?.raf(time)
    window.requestAnimationFrame(raf)
  }
  window.requestAnimationFrame(raf)

  gsap.from('[data-reveal]', {
    y: 34,
    opacity: 0,
    duration: 0.8,
    ease: 'power4.out',
    stagger: 0.08,
    scrollTrigger: {
      trigger: '.site-main',
      start: 'top 70%'
    }
  })
})

onUnmounted(() => {
  lenis?.destroy()
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
</script>

<template>
  <div class="site-shell">
    <header class="nav">
      <a class="nav__brand" href="#top" aria-label="Agenc-IA inicio">
        <span>Agenc</span><strong>-IA</strong>
      </a>
      <nav class="nav__links" aria-label="Navegacion principal">
        <a v-for="item in copy.nav" :key="item[1]" :href="`#${item[1]}`">{{ item[0] }}</a>
      </nav>
      <button class="nav__locale" type="button" @click="locale = locale === 'es' ? 'en' : 'es'">
        {{ locale === 'es' ? 'EN' : 'ES' }}
      </button>
    </header>

    <main id="top" class="site-main">
      <section class="hero">
        <AgentNetwork />
        <div class="hero__shade"></div>
        <div class="hero__inner">
          <div class="hero__copy">
            <p class="eyebrow">{{ copy.heroBadge }}</p>
            <h1>{{ copy.heroTitle }}</h1>
            <p class="hero__lead">{{ copy.heroText }}</p>
            <div class="hero__actions">
              <a href="#contacto" class="btn btn--primary">{{ copy.primaryCta }}</a>
              <a href="#demo" class="btn btn--secondary">{{ copy.secondaryCta }}</a>
            </div>
          </div>
          <aside class="hero-panel" aria-label="Estado del sistema Agenc-IA">
            <div class="hero-panel__top">
              <span class="status-dot"></span>
              <span>Sistema de agentes</span>
            </div>
            <div class="hero-panel__agent hero-panel__agent--active">
              <span>jnd0</span>
              <strong>CEO / Orquestador</strong>
            </div>
            <div class="hero-panel__agent">
              <span>n8n</span>
              <strong>Leads, webhooks, alertas</strong>
            </div>
            <div class="hero-panel__agent">
              <span>human</span>
              <strong>Aprobacion en acciones sensibles</strong>
            </div>
          </aside>
        </div>
      </section>

      <section id="problema" class="section section--split">
        <div data-reveal>
          <p class="eyebrow">Mercado</p>
          <h2>La ventaja no esta en tener IA. Esta en ponerla a trabajar.</h2>
        </div>
        <div class="signal-list" data-reveal>
          <p v-for="signal in marketSignals" :key="signal">{{ signal }}</p>
        </div>
      </section>

      <section class="problem-grid">
        <article v-for="pain in pains" :key="pain.title" class="problem-card" data-reveal>
          <span></span>
          <h3>{{ pain.title }}</h3>
          <p>{{ pain.text }}</p>
        </article>
      </section>

      <section id="servicios" class="section">
        <div class="section__head" data-reveal>
          <p class="eyebrow">Servicios</p>
          <h2>Agentes personalizados, conectados a tus canales reales.</h2>
          <p>Empezamos por contacto y diagnostico. No vendemos una plataforma cerrada: construimos el agente correcto para tu negocio.</p>
        </div>
        <div class="service-grid">
          <article v-for="service in services" :key="service.title" class="service-card" data-reveal>
            <h3>{{ service.title }}</h3>
            <p>{{ service.text }}</p>
            <div class="tags">
              <span v-for="tag in service.tags" :key="tag">{{ tag }}</span>
            </div>
          </article>
        </div>
      </section>

      <section id="demo" class="demo">
        <div class="demo__content" data-reveal>
          <p class="eyebrow">Demo principal</p>
          <h2>Agente de ventas para carros usados.</h2>
          <p>El agente recibe el mensaje, entiende intencion, pregunta presupuesto, tipo de carro, ciudad, financiacion y urgencia. Luego entrega un resumen listo para seguimiento humano.</p>
          <ul>
            <li>Calificacion clara del lead.</li>
            <li>Respuestas con tono comercial, no robotico.</li>
            <li>Aprobacion humana antes de prometer precios, disponibilidad o condiciones.</li>
          </ul>
        </div>
        <div class="chat-demo" data-reveal aria-label="Ejemplo de conversacion">
          <p class="bubble bubble--client">Hola, busco un carro automatico de hasta 45 millones.</p>
          <p class="bubble bubble--agent">Perfecto. Para ayudarte mejor: ciudad, uso principal y si necesitas financiacion?</p>
          <p class="bubble bubble--client">Bucaramanga, familiar, podria financiar una parte.</p>
          <p class="bubble bubble--summary">Lead caliente: automatico familiar, 45M, Bucaramanga, financiacion parcial.</p>
        </div>
      </section>

      <section id="sistema" class="section">
        <div class="section__head" data-reveal>
          <p class="eyebrow">Sistema operativo</p>
          <h2>Agenc-IA combina agentes, automatizacion y criterio humano.</h2>
        </div>
        <div class="process-grid">
          <article v-for="step in process" :key="step[0]" class="process-card" data-reveal>
            <span>{{ step[0] }}</span>
            <h3>{{ step[1] }}</h3>
            <p>{{ step[2] }}</p>
          </article>
        </div>
      </section>

      <section class="case-strip">
        <div v-for="item in cases" :key="item.name" class="case-strip__item" data-reveal>
          <h3>{{ item.name }}</h3>
          <p>{{ item.detail }}</p>
        </div>
      </section>

      <section class="stats">
        <div v-for="stat in stats" :key="stat[1]" class="stats__item" data-reveal>
          <strong>{{ stat[0] }}</strong>
          <span>{{ stat[1] }}</span>
        </div>
      </section>

      <section id="contacto" class="contact">
        <div class="contact__copy" data-reveal>
          <p class="eyebrow">Contacto</p>
          <h2>{{ copy.formTitle }}</h2>
          <p>{{ copy.formText }}</p>
          <a href="mailto:leinadgalaxy@gmail.com">leinadgalaxy@gmail.com</a>
        </div>
        <form class="lead-form" @submit.prevent="submitLead" data-reveal>
          <input v-model="form.name" name="name" placeholder="Nombre" required />
          <input v-model="form.business_type" name="business_type" placeholder="Tipo de negocio" required />
          <div class="lead-form__split">
            <input v-model="form.phone" name="phone" placeholder="WhatsApp / telefono" />
            <input v-model="form.email" name="email" type="email" placeholder="Email" required />
          </div>
          <select v-model="form.service_interest" name="service_interest">
            <option>Agente de ventas por WhatsApp</option>
            <option>Agente de atencion al cliente</option>
            <option>Agente oficina/legal</option>
            <option>Agente hospitality/restaurante</option>
            <option>Automatizacion n8n</option>
            <option>No estoy seguro, quiero diagnostico</option>
          </select>
          <textarea v-model="form.need" name="need" rows="5" placeholder="Que problema quieres resolver o que proceso quieres automatizar?" required></textarea>
          <button class="btn btn--primary" type="submit" :disabled="formState === 'sending' || formState === 'sent'">
            <span v-if="formState === 'idle'">Enviar diagnostico</span>
            <span v-else-if="formState === 'sending'">Enviando...</span>
            <span v-else-if="formState === 'sent'">Recibido. Te contactare pronto.</span>
            <span v-else>No se pudo enviar. Intenta por email.</span>
          </button>
        </form>
      </section>
    </main>
  </div>
</template>
