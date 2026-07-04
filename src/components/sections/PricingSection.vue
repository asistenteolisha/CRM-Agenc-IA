<script setup lang="ts">
import { pricingPlans } from '../../data/pricing'
import IconInline from '../IconInline.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { trackEvent } from '../../utils/analytics'

gsap.registerPlugin(ScrollTrigger)

const planIcons: Record<string, string> = {
  starter: 'Zap',
  growth: 'Rocket',
  pro: 'Building2',
  web: 'Globe'
}

const pricingSection = ref<HTMLElement | null>(null)
let pricingViewTrigger: ScrollTrigger | null = null
type Plan = (typeof pricingPlans)[number]

function trackPricingCta(plan: Plan) {
  trackEvent('pricing_cta_click', { plan_id: plan.id, plan_name: plan.name })
}

onMounted(() => {
  gsap.from('.pricing-card', {
    y: 50,
    autoAlpha: 0,
    duration: 0.6,
    ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: { trigger: '.pricing-grid', start: 'top 82%' }
  })

  if (pricingSection.value) {
    pricingViewTrigger = ScrollTrigger.create({
      trigger: pricingSection.value,
      start: 'top 75%',
      once: true,
      onEnter: () => trackEvent('pricing_view', { section: 'pricing' })
    })
  }
})

onBeforeUnmount(() => {
  pricingViewTrigger?.kill()
})
</script>

<template>
  <section id="precios" ref="pricingSection" class="section pricing-section">
    <div class="section__head" data-reveal>
      <p class="eyebrow">Planes</p>
      <h2>Elige el nivel de automatizacion que necesita tu negocio ahora.</h2>
      <p>Precios finales en COP y USD. Todos los planes de agente incluyen setup done-for-you, soporte y diagnostico gratuito.</p>
    </div>
    <div class="pricing-grid">
      <article v-for="p in pricingPlans" :key="p.id" class="pricing-card" :class="{ popular: p.recommended }" data-reveal>
        <div v-if="p.badge" class="pricing-badge">{{ p.badge }}</div>
        <div class="pricing-icon">
          <IconInline :name="planIcons[p.id] || 'Zap'" :size="24" />
        </div>
        <h3 class="pricing-name">{{ p.name }}</h3>
        <p class="pricing-desc">{{ p.description }}</p>
        <div class="pricing-amount">
          <div v-if="p.monthly > 0" class="pricing-monthly">
            <span class="pricing-prefix">Mensual</span>
            <strong class="amount-main">${{ p.monthly.toLocaleString('es-CO') }}</strong><span class="amount-period"> COP/mes</span>
            <span v-if="p.monthlyUsd" class="amount-usd">${{ p.monthlyUsd }} USD/mes</span>
          </div>
          <div v-else class="pricing-monthly">
            <span class="pricing-prefix">Pago unico</span>
            <strong class="amount-main">${{ p.setup.toLocaleString('es-CO') }}</strong><span class="amount-period"> COP</span>
            <span v-if="p.setupUsd" class="amount-usd">${{ p.setupUsd }} USD</span>
          </div>
          <div v-if="p.setup > 0 && p.monthly > 0" class="pricing-setup">
            Setup unico: ${{ p.setup.toLocaleString('es-CO') }} COP
            <span v-if="p.setupUsd" class="amount-usd">${{ p.setupUsd }} USD</span>
          </div>
          <div v-if="p.annualDiscount" class="pricing-annual">{{ p.annualDiscount }}</div>
        </div>
        <div class="pricing-value">
          <IconInline name="TrendingUp" :size="14" />
          {{ p.id === 'web' ? 'Incluye entrega, 2 rondas de revision y hosting por 1 ano' : 'Incluye setup, soporte y ajustes mensuales' }}
        </div>
        <ul class="pricing-features">
          <li v-for="inc in p.includes" :key="inc">
            <IconInline name="Check" :size="14" class="check-icon" /> {{ inc }}
          </li>
        </ul>
        <ul class="pricing-limits">
          <li v-for="lim in p.limits" :key="lim">- {{ lim }}</li>
        </ul>
        <a
          href="/#/contacto"
          class="pricing-cta"
          :class="p.recommended ? 'pricing-cta--primary' : 'pricing-cta--secondary'"
          @click="trackPricingCta(p)"
        >
          {{ p.id === 'pro' ? 'Solicitar cotizacion' : 'Diagnostico gratuito' }}
        </a>
      </article>
    </div>
    <p class="pricing-note" data-reveal>
      * Los costos de Meta Cloud API no estan incluidos en ningun plan y se facturan directamente en la cuenta de Meta del cliente.
    </p>
  </section>
</template>
