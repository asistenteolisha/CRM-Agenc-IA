<script setup lang="ts">
import UseCasesSection from '../components/sections/UseCasesSection.vue'
import InteractiveDemoSection from '../components/sections/InteractiveDemoSection.vue'
import CaseStudiesSection from '../components/sections/CaseStudiesSection.vue'
</script>

<template>
  <div class="page-cases">
    <section class="page-hero">
      <p class="eyebrow">Casos</p>
      <h1>Ejemplos de automatización para negocios como el tuyo.</h1>
      <p class="page-hero__sub">Demos sectoriales y casos proyectados para explorar cada flujo antes de implementarlo.</p>
    </section>
    <UseCasesSection />
    <InteractiveDemoSection />
    <CaseStudiesSection />
    <section class="section cta-section" data-reveal>
      <h2>¿Querés explorar un flujo para tu negocio?</h2>
      <RouterLink to="/contacto" class="btn btn--primary">Agendar diagnóstico gratis</RouterLink>
    </section>
  </div>
</template>
