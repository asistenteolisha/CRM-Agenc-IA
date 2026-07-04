<script setup lang="ts">
import IconInline from '../IconInline.vue'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: 'BarChart3' },
  { to: '/dashboard/leads', label: 'Leads', icon: 'Users' },
  { to: '/dashboard/conversations', label: 'Chats', icon: 'MessageCircle' },
  { to: '/dashboard/tasks', label: 'Tareas', icon: 'CalendarCheck' },
  { to: '/dashboard/settings', label: 'Settings', icon: 'Database' }
]
</script>

<template>
  <aside class="dashboard-sidebar">
    <RouterLink class="dashboard-sidebar__brand" to="/">
      <img src="/logo.svg" alt="Agenc-IA" />
    </RouterLink>

    <nav class="dashboard-sidebar__nav" aria-label="Dashboard">
      <RouterLink v-for="link in links" :key="link.to" :to="link.to" class="dashboard-sidebar__link">
        <IconInline :name="link.icon" :size="18" />
        <span>{{ link.label }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>
