<script setup lang="ts">
import { caseStudies } from '../../data/cases'
</script>

<template>
  <section class="section">
    <div class="section__head" data-reveal>
      <p class="eyebrow">Casos de estudio</p>
      <h2>Resultados reales con agentes IA conectados a Meta.</h2>
      <p>Casos piloto del sistema Auto Sales AI OS y otros verticales.</p>
    </div>
    <div class="case-grid">
      <article v-for="c in caseStudies" :key="c.id" class="case-card" data-reveal>
        <div class="case-card__industry">{{ c.industry }}</div>
        <h3>{{ c.client }}</h3>
        <p class="case-card__problem"><strong>Problema:</strong> {{ c.problem }}</p>
        <p class="case-card__solution"><strong>Solución:</strong> {{ c.solution }}</p>
        <div class="case-results">
          <div v-for="r in c.results" :key="r.metric" class="case-result">
            <strong>{{ r.value }}</strong><span>{{ r.metric }}</span>
          </div>
        </div>
        <blockquote v-if="c.testimonial" class="case-quote">
          "{{ c.testimonial.quote }}" — <em>{{ c.testimonial.author }}, {{ c.testimonial.role }}</em>
        </blockquote>
      </article>
    </div>
  </section>
</template>
