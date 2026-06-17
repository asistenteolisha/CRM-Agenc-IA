<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  { q: '¿Cuánto tarda la implementación?', a: 'Entre 5 y 10 días hábiles desde el diagnóstico inicial. Planes simples pueden estar listos en 3-5 días.' },
  { q: '¿Necesito conocimientos técnicos?', a: 'No. Nos encargamos de todo el setup, entrenamiento e integración. Solo necesitas contarnos sobre tu negocio.' },
  { q: '¿Funciona con mi número de WhatsApp actual?', a: 'Sí, usamos la API oficial de WhatsApp Business. Podemos usar tu número actual o configurar uno nuevo.' },
  { q: '¿Qué pasa si el agente no sabe responder?', a: 'El agente escala la conversación a un humano automáticamente y aprende para la próxima vez. Nunca deja a un cliente sin respuesta.' },
  { q: '¿Puedo cancelar cuando quiera?', a: 'Sí, sin permanencia. Solo pedimos 30 días de anticipación para la transición.' },
  { q: '¿Cuánto cuesta?', a: 'Desde $690.000 COP/mes dependiendo del plan. Todos incluyen diagnóstico inicial sin costo y soporte.' },
]

const openIndex = ref<number | null>(null)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}

onMounted(() => {
  gsap.from('.faq-item', {
    y: 30, autoAlpha: 0, duration: 0.5, ease: 'power3.out',
    stagger: 0.08,
    scrollTrigger: { trigger: '.home-faq', start: 'top 82%' }
  })
})
</script>

<template>
  <section class="section home-faq">
    <div class="section__head" data-reveal>
      <p class="eyebrow">Preguntas frecuentes</p>
      <h2>¿Tenés dudas? Acá las resolvemos.</h2>
    </div>
    <div class="faq-list">
      <div v-for="(faq, i) in faqs" :key="i" class="faq-item" :class="{ open: openIndex === i }">
        <button class="faq-question" @click="toggle(i)" :aria-expanded="openIndex === i">
          {{ faq.q }}
          <span class="faq-toggle">{{ openIndex === i ? '−' : '+' }}</span>
        </button>
        <Transition name="faq-expand">
          <div v-if="openIndex === i" class="faq-answer">
            <p>{{ faq.a }}</p>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>
