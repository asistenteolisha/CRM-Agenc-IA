<script setup lang="ts">
import ServicesSection from '../components/sections/ServicesSection.vue'
</script>

<template>
  <div class="page-services">
    <section class="page-hero">
      <p class="eyebrow">Servicios</p>
      <h1>Agentes IA y web profesional. Un solo sistema.</h1>
      <p class="page-hero__sub">No comprás un bot. Comprás un flujo que atiende, vende, registra y avisa cuando toca intervenir.</p>
    </section>
    <ServicesSection />
    <section class="section cta-section" data-reveal>
      <h2>¿No sabés cuál necesitás?</h2>
      <p>Te ayudamos a elegir en un diagnóstico de 20 minutos sin costo.</p>
      <RouterLink to="/contacto" class="btn btn--primary">Agendar diagnóstico</RouterLink>
    </section>
  </div>
</template>
