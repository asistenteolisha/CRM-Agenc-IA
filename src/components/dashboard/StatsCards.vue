<script setup lang="ts">
import { computed } from 'vue'
import IconInline from '../IconInline.vue'
import type { DashboardSummary } from '../../composables/useSupabase'

const props = defineProps<{ totals: DashboardSummary['totals'] | null }>()

const cards = computed(() => [
  { label: 'Clientes', value: props.totals?.clients ?? 0, icon: 'Building2' },
  { label: 'Leads', value: props.totals?.leads ?? 0, icon: 'Users' },
  { label: 'Conversaciones', value: props.totals?.conversations ?? 0, icon: 'MessageCircle' },
  { label: 'Tareas abiertas', value: props.totals?.open_tasks ?? 0, icon: 'CalendarCheck' },
  { label: 'Planes activos', value: props.totals?.active_plans ?? 0, icon: 'Rocket' }
])
</script>

<template>
  <section class="dashboard-stats" aria-label="Metricas del CRM">
    <article v-for="card in cards" :key="card.label" class="dashboard-stat">
      <span class="dashboard-stat__icon">
        <IconInline :name="card.icon" :size="20" />
      </span>
      <strong>{{ card.value }}</strong>
      <span>{{ card.label }}</span>
    </article>
  </section>
</template>
