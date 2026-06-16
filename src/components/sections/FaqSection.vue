<script setup lang="ts">
import { faqs } from '../../data/faq'
</script>

<template>
  <section id="faq" class="section">
    <div class="section__head" data-reveal>
      <p class="eyebrow">Preguntas frecuentes</p>
      <h2>Todo lo que necesitás saber antes de empezar.</h2>
    </div>
    <div class="faq-list" data-reveal>
      <details v-for="f in faqs" :key="f.question" class="faq-item">
        <summary>{{ f.question }}</summary>
        <p>{{ f.answer }}</p>
      </details>
    </div>
  </section>
</template>
