<script setup lang="ts">
import { pricingPlans } from '../../data/pricing'
import IconInline from '../IconInline.vue'
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const planIcons: Record<string, string> = {
  starter: 'Zap',
  growth: 'Rocket',
  pro: 'Building2'
}

onMounted(() => {
  gsap.from('.pricing-card', {
    y: 50, autoAlpha: 0, duration: 0.6, ease: 'power3.out',
    stagger: 0.15,
    scrollTrigger: { trigger: '.pricing-grid', start: 'top 82%' }
  })
})
</script>

<template>
  <section id="precios" class="section">
    <div class="section__head" data-reveal>
      <p class="eyebrow">Planes</p>
      <h2>Arrancá con un flujo rentable, medí resultados y escalá cuando el negocio crezca.</h2>
      <p>Todos los planes incluyen diagnóstico inicial sin costo. Incluye setup, soporte y ajustes mensuales.</p>
    </div>
    <div class="pricing-grid">
      <article v-for="p in pricingPlans" :key="p.id" class="pricing-card" :class="{ recommended: p.recommended }" data-reveal>
        <div v-if="p.recommended" class="pricing-badge">⭐ Más popular</div>
        <div class="pricing-icon">
          <IconInline :name="planIcons[p.id] || 'Zap'" :size="24" />
        </div>
        <h3>{{ p.name }}</h3>
        <p class="pricing-desc">{{ p.description }}</p>
        <div class="pricing-numbers">
          <div v-if="p.monthly > 0" class="pricing-monthly">
            <span class="pricing-prefix">Desde</span>
            <strong>${{ p.monthly.toLocaleString('es-CO') }}</strong><span class="pricing-period">/mes</span>
          </div>
          <div v-if="p.setup > 0" class="pricing-setup">Setup único: ${{ p.setup.toLocaleString('es-CO') }}</div>
        </div>
        <div class="pricing-value">
          <IconInline name="TrendingUp" :size="14" />
          {{ p.id === 'pro' ? 'Incluye setup, soporte y ajustes mensuales' : 'Ahorra ~$2M/mes vs contratar un asistente' }}
        </div>
        <ul class="pricing-features">
          <li v-for="inc in p.includes" :key="inc">
            <IconInline name="Check" :size="14" class="check-icon" /> {{ inc }}
          </li>
        </ul>
        <ul class="pricing-limits">
          <li v-for="lim in p.limits" :key="lim">• {{ lim }}</li>
        </ul>
        <a href="/#/contacto" class="btn pricing-cta" :class="p.recommended ? 'btn--primary' : 'btn--secondary'">
          {{ p.id === 'pro' ? 'Solicitar cotización' : 'Empezar diagnóstico' }}
        </a>
      </article>
    </div>
    <p class="pricing-note" data-reveal>
      * Los costos de Meta Cloud API no están incluidos en ningún plan (~$0.05 USD/mensaje). Para 1,000 conversaciones/mes ≈ $100-160 mil COP adicionales facturados directamente por Meta.
    </p>
  </section>
</template>
