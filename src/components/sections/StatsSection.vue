<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { target: 85, suffix: '%', label: 'consultas atendidas 24/7' },
  { target: 3, suffix: '×', label: 'más leads calificados' },
  { target: 30, suffix: 's', label: 'tiempo de primera respuesta' },
  { target: 15, suffix: '', label: 'servicios disponibles' }
]

const displayValues = ref<string[]>(stats.map(s => '0' + s.suffix))

onMounted(() => {
  const section = document.querySelector('.stats')
  if (!section) return

  ScrollTrigger.create({
    trigger: section,
    start: 'top 82%',
    once: true,
    onEnter: () => {
      stats.forEach((stat, i) => {
        gsap.to({ val: 0 }, {
          val: stat.target,
          duration: 1.6,
          ease: 'power3.out',
          delay: i * 0.15,
          onUpdate: function () {
            displayValues.value[i] = Math.round((this.targets() as any)[0].val) + stat.suffix
          }
        })
      })
    }
  })
})
</script>

<template>
  <section class="stats">
    <div v-for="(stat, i) in stats" :key="stat.label" class="stats__card" data-reveal>
      <strong class="stats__number">{{ displayValues[i] }}</strong>
      <span>{{ stat.label }}</span>
    </div>
  </section>
</template>
