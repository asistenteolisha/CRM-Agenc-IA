<script setup lang="ts">
import { pricingPlans } from '../../data/pricing'
import IconInline from '../IconInline.vue'
</script>

<template>
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
          <div v-else class="pricing-monthly"><strong>Cotización</strong><span>personalizada</span></div>
          <div v-if="p.setup > 0" class="pricing-setup">Setup único: ${{ p.setup.toLocaleString('es-CO') }}</div>
          <div v-else class="pricing-setup">Setup: incluido en cotización</div>
        </div>
        <ul class="pricing-features">
          <li v-for="inc in p.includes" :key="inc">
            <IconInline name="Check" :size="14" class="check-icon" /> {{ inc }}
          </li>
        </ul>
        <ul class="pricing-limits">
          <li v-for="lim in p.limits" :key="lim">• {{ lim }}</li>
        </ul>
        <a href="/#/contacto" class="btn btn--primary pricing-cta">
          {{ p.id === 'enterprise' ? 'Solicitar cotización' : 'Empezar diagnóstico' }}
        </a>
      </article>
    </div>
    <p class="pricing-note" data-reveal>
      * Los costos de Meta Cloud API no están incluidos en ningún plan (~$0.05 USD/mensaje). Para 1,000 conversaciones/mes ≈ $100-160 mil COP adicionales facturados directamente por Meta.
    </p>
  </section>
</template>
