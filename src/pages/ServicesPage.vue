<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ServicesSection from '../components/sections/ServicesSection.vue'

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
