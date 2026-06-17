<script setup lang="ts">
import UseCasesSection from '../components/sections/UseCasesSection.vue'
import InteractiveDemoSection from '../components/sections/InteractiveDemoSection.vue'
import CaseStudiesSection from '../components/sections/CaseStudiesSection.vue'
</script>

<template>
  <div class="page-cases">
    <section class="page-hero">
      <p class="eyebrow">Casos</p>
      <h1>Resultados reales en negocios como el tuyo.</h1>
      <p class="page-hero__sub">Así ayudamos a PYMES colombianas a vender más y atender mejor.</p>
    </section>
    <UseCasesSection />
    <InteractiveDemoSection />
    <CaseStudiesSection />
    <section class="section cta-section" data-reveal>
      <h2>¿Querés resultados así en tu negocio?</h2>
      <RouterLink to="/contacto" class="btn btn--primary">Agendar diagnóstico gratis</RouterLink>
    </section>
  </div>
</template>
