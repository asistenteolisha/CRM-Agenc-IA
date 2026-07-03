<script setup lang="ts">
import IconInline from '../IconInline.vue'

const stats = [
  { value: 'WhatsApp', label: 'conversaciones conectadas', icon: 'MessageCircle' },
  { value: 'Instagram', label: 'mensajes y comentarios', icon: 'MessageCircle' },
  { value: 'Facebook', label: 'leads y Messenger', icon: 'MessageCircle' },
  { value: 'CRM', label: 'contexto organizado', icon: 'Layers' }
]
</script>

<template>
  <section class="stats">
    <div v-for="stat in stats" :key="stat.value" class="stats__card" data-reveal>
      <div class="stats__icon-wrap">
        <IconInline :name="stat.icon" :size="22" class="stats__icon" />
      </div>
      <strong class="stats__number">{{ stat.value }}</strong>
      <span>{{ stat.label }}</span>
    </div>
  </section>
</template>
