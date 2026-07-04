<script setup lang="ts">
import RoiCalculatorSection from '../components/sections/RoiCalculatorSection.vue'
import PricingSection from '../components/sections/PricingSection.vue'
import ComparisonSection from '../components/sections/ComparisonSection.vue'
</script>

<template>
  <div class="page-pricing">
    <section class="page-hero">
      <p class="eyebrow">Planes</p>
      <h1>Invertí en automatización, no en más personal.</h1>
      <p class="page-hero__sub">Planes claros en pesos colombianos y dólares. Sin costos ocultos.</p>
    </section>
    <PricingSection />
    <RoiCalculatorSection />
    <ComparisonSection />
    <section class="section cta-section" data-reveal>
      <h2>¿Listo para revisar tu caso?</h2>
      <RouterLink to="/contacto" class="btn btn--primary">Diagnóstico gratuito</RouterLink>
    </section>
  </div>
</template>
