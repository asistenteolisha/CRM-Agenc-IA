<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RoiCalculatorSection from '../components/sections/RoiCalculatorSection.vue'
import PricingSection from '../components/sections/PricingSection.vue'
import ComparisonSection from '../components/sections/ComparisonSection.vue'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  gsap.from('.page-hero h1', {
    y: 30, autoAlpha: 0, duration: 0.8, ease: 'power3.out'
  })
  gsap.from('.page-hero__sub', {
    y: 20, autoAlpha: 0, duration: 0.6, delay: 0.2, ease: 'power3.out'
  })
})
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
