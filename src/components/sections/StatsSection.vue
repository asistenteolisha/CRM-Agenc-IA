<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IconInline from '../IconInline.vue'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { target: 85, suffix: '%', label: 'consultas atendidas 24/7', icon: 'Clock' },
  { target: 3, suffix: '×', label: 'más leads calificados', icon: 'TrendingUp' },
  { target: 30, suffix: 's', label: 'tiempo de primera respuesta', icon: 'Zap' },
  { target: 15, suffix: '', label: 'servicios disponibles', icon: 'Layers' }
]

// Show final values initially (no flash of "0")
const displayValues = ref<string[]>(stats.map(s => s.target + s.suffix))

onMounted(() => {
  const section = document.querySelector('.stats')
  if (!section) return

  // Set to 0 briefly, then animate to final
  displayValues.value = stats.map(s => '0' + s.suffix)

  ScrollTrigger.create({
    trigger: section,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      stats.forEach((stat, i) => {
        gsap.to({ val: 0 }, {
          val: stat.target,
          duration: 1.8,
          ease: 'power3.out',
          delay: i * 0.15,
          onUpdate: function () {
            const el = this.targets() as any
            displayValues.value[i] = Math.round(el[0].val) + stat.suffix
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
      <div class="stats__icon-wrap">
        <IconInline :name="stat.icon" :size="22" class="stats__icon" />
      </div>
      <strong class="stats__number">{{ displayValues[i] }}</strong>
      <span>{{ stat.label }}</span>
    </div>
  </section>
</template>
