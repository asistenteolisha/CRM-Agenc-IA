<script setup lang="ts">
import { onMounted } from 'vue'
import Sidebar from '../../components/dashboard/Sidebar.vue'
import LeadsTable from '../../components/dashboard/LeadsTable.vue'
import { useLeads, type LeadFilters, type LeadInput } from '../../composables/useLeads'

const { leads, loading, error, filters, loadLeads, saveLead, deleteLead } = useLeads()

function applyFilters(nextFilters: LeadFilters) {
  filters.value = nextFilters
  loadLeads()
}

async function persistLead(lead: LeadInput) {
  await saveLead(lead)
}

onMounted(loadLeads)
</script>

<template>
  <div class="dashboard-shell">
    <Sidebar />
    <main class="dashboard-main">
      <header class="dashboard-topbar">
        <div>
          <p class="dashboard-eyebrow">CRM</p>
          <h1>Leads</h1>
        </div>
      </header>

      <p v-if="error" class="dashboard-error">{{ error }}</p>
      <LeadsTable
        :leads="leads"
        :loading="loading"
        :filters="filters"
        @save="persistLead"
        @delete="deleteLead"
        @filter="applyFilters"
      />
    </main>
  </div>
</template>
