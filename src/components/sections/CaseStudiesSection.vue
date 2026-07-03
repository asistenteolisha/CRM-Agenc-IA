<script setup lang="ts">
import { caseStudies } from '../../data/cases'
</script>

<template>
  <section class="section">
    <div class="section__head" data-reveal>
      <p class="eyebrow">Ejemplos de solución</p>
      <h2>Flujos de referencia para distintos sectores.</h2>
      <p>Demos y proyecciones para explicar el alcance antes de validar cada implementación.</p>
    </div>
    <div class="case-grid">
      <article v-for="c in caseStudies" :key="c.id" class="case-card" data-reveal>
        <div class="case-card__industry">{{ c.label }} · {{ c.industry }}</div>
        <h3>{{ c.client }}</h3>
        <p class="case-card__problem"><strong>Problema:</strong> {{ c.problem }}</p>
        <p class="case-card__solution"><strong>Solución:</strong> {{ c.solution }}</p>
        <div class="case-results">
          <div v-for="r in c.results" :key="r.metric" class="case-result">
            <strong>{{ r.value }}</strong><span>{{ r.metric }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
