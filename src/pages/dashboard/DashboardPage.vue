<script setup lang="ts">
import { onMounted } from 'vue'
import Sidebar from '../../components/dashboard/Sidebar.vue'
import StatsCards from '../../components/dashboard/StatsCards.vue'
import { useDashboardSummary } from '../../composables/useSupabase'

const { summary, loading, error, loadSummary } = useDashboardSummary()

onMounted(loadSummary)
</script>

<template>
  <div class="dashboard-shell">
    <Sidebar />
    <main class="dashboard-main">
      <header class="dashboard-topbar">
        <div>
          <p class="dashboard-eyebrow">CRM</p>
          <h1>Dashboard</h1>
        </div>
        <button class="dashboard-btn" type="button" @click="loadSummary">Actualizar</button>
      </header>

      <p v-if="error" class="dashboard-error">{{ error }}</p>
      <p v-if="loading" class="dashboard-muted">Cargando...</p>

      <StatsCards :totals="summary?.totals || null" />

      <section class="dashboard-panel">
        <div class="dashboard-panel__head">
          <h2>Leads recientes</h2>
          <RouterLink class="dashboard-link" to="/dashboard/leads">Ver todos</RouterLink>
        </div>

        <div class="dashboard-table-wrap">
          <table class="dashboard-table">
            <thead>
              <tr>
                <th>Lead</th>
                <th>Contacto</th>
                <th>Estado</th>
                <th>Fuente</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="summary?.recent_leads.length === 0">
                <td colspan="4">Sin leads.</td>
              </tr>
              <template v-else>
                <tr v-for="lead in summary?.recent_leads || []" :key="lead.id">
                  <td>
                    <strong>{{ lead.name }}</strong>
                    <span>{{ lead.service_interest || 'Sin servicio' }}</span>
                  </td>
                  <td>
                    <span>{{ lead.email || 'Sin email' }}</span>
                    <span>{{ lead.phone || 'Sin telefono' }}</span>
                  </td>
                  <td><span class="dashboard-pill">{{ lead.status }}</span></td>
                  <td>{{ lead.source }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>
