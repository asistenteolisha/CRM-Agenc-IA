<script setup lang="ts">
import { ref } from 'vue'
import { services } from '../../data/services'

type Cat = 'todas' | 'ventas' | 'soporte' | 'ecommerce' | 'social' | 'automatizacion' | 'consultoria'
const cats: { key: Cat; label: string }[] = [
  { key: 'todas', label: 'Todas' },
  { key: 'ventas', label: 'Ventas' },
  { key: 'soporte', label: 'Soporte' },
  { key: 'ecommerce', label: 'E-commerce' },
  { key: 'social', label: 'Social' },
  { key: 'automatizacion', label: 'Automatización' },
  { key: 'consultoria', label: 'Consultoría' },
]

const activeFilter = ref<Cat>('todas')
</script>

<template>
  <section id="servicios" class="section">
    <div class="section__head" data-reveal>
      <p class="eyebrow">Servicios</p>
      <h2>No comprás un bot. Comprás un flujo que atiende, vende, registra y avisa cuando toca intervenir.</h2>
    </div>
    <div class="service-filters" data-reveal>
      <button v-for="cat in cats" :key="cat.key"
              class="filter-chip" :class="{ active: activeFilter === cat.key }"
              @click="activeFilter = cat.key">{{ cat.label }}</button>
    </div>
    <div class="service-grid">
      <article v-for="s in services.filter(x => activeFilter === 'todas' || x.category === activeFilter)"
               :key="s.id" class="service-card" data-reveal>
        <div class="service-card__cat">{{ s.category }}</div>
        <h3>{{ s.title }}</h3>
        <p>{{ s.short }}</p>
        <p class="service-card__outcome">📈 {{ s.outcome }}</p>
        <div class="tags">
          <span v-for="t in s.metaCapabilities.slice(0, 4)" :key="t">{{ t }}</span>
          <span v-if="s.metaCapabilities.length > 4" class="tag-more">+{{ s.metaCapabilities.length - 4 }}</span>
        </div>
        <div v-if="s.startingAt" class="service-card__price">{{ s.startingAt }}</div>
      </article>
    </div>
  </section>
</template>
