<script setup lang="ts">
import { reactive, ref } from 'vue'
import IconInline from '../IconInline.vue'
import type { Lead } from '../../composables/useSupabase'
import type { LeadFilters, LeadInput } from '../../composables/useLeads'

const props = defineProps<{
  leads: Lead[]
  loading: boolean
  filters: LeadFilters
}>()

const emit = defineEmits<{
  save: [lead: LeadInput]
  delete: [id: string]
  filter: [filters: LeadFilters]
}>()

const statusOptions: Lead['status'][] = ['new', 'contacted', 'qualified', 'won', 'lost']
const localError = ref('')
const draft = reactive<LeadInput>({
  name: '',
  email: '',
  phone: '',
  business_type: '',
  service_interest: '',
  need: '',
  source: 'dashboard',
  status: 'new',
  data_consent: true
})
const filterDraft = reactive<LeadFilters>({ ...props.filters })

function resetDraft() {
  Object.assign(draft, {
    id: undefined,
    name: '',
    email: '',
    phone: '',
    business_type: '',
    service_interest: '',
    need: '',
    source: 'dashboard',
    status: 'new',
    data_consent: true
  })
}

function editLead(lead: Lead) {
  Object.assign(draft, {
    id: lead.id,
    name: lead.name,
    email: lead.email || '',
    phone: lead.phone || '',
    business_type: lead.business_type || '',
    service_interest: lead.service_interest || '',
    need: lead.need || '',
    source: lead.source,
    status: lead.status,
    data_consent: lead.data_consent
  })
}

function submitLead() {
  localError.value = ''
  if (!draft.name.trim()) {
    localError.value = 'El nombre es obligatorio.'
    return
  }

  emit('save', { ...draft, name: draft.name.trim() })
  resetDraft()
}

function applyFilters() {
  emit('filter', { ...filterDraft })
}
</script>

<template>
  <section class="dashboard-panel">
    <div class="dashboard-panel__head">
      <div>
        <h2>{{ draft.id ? 'Editar lead' : 'Nuevo lead' }}</h2>
        <p v-if="localError" class="dashboard-error">{{ localError }}</p>
      </div>
      <button v-if="draft.id" class="dashboard-icon-btn" type="button" title="Cancelar edicion" @click="resetDraft">
        <IconInline name="RefreshCw" :size="17" />
      </button>
    </div>

    <form class="dashboard-form" @submit.prevent="submitLead">
      <input v-model="draft.name" placeholder="Nombre" autocomplete="name" />
      <input v-model="draft.email" placeholder="Email" type="email" autocomplete="email" />
      <input v-model="draft.phone" placeholder="Telefono" autocomplete="tel" />
      <input v-model="draft.business_type" placeholder="Negocio" />
      <input v-model="draft.service_interest" placeholder="Servicio" />
      <select v-model="draft.status">
        <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
      </select>
      <textarea v-model="draft.need" placeholder="Necesidad"></textarea>
      <button class="dashboard-btn dashboard-btn--primary" type="submit">
        <IconInline name="Check" :size="17" />
        {{ draft.id ? 'Guardar' : 'Crear' }}
      </button>
    </form>
  </section>

  <section class="dashboard-panel">
    <div class="dashboard-panel__head">
      <h2>Leads</h2>
      <form class="dashboard-filters" @submit.prevent="applyFilters">
        <input v-model="filterDraft.search" placeholder="Buscar" />
        <select v-model="filterDraft.status">
          <option value="">Todos</option>
          <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
        </select>
        <input v-model="filterDraft.source" placeholder="Fuente" />
        <button class="dashboard-icon-btn" type="submit" title="Filtrar">
          <IconInline name="Search" :size="17" />
        </button>
      </form>
    </div>

    <div class="dashboard-table-wrap">
      <table class="dashboard-table">
        <thead>
          <tr>
            <th>Lead</th>
            <th>Contacto</th>
            <th>Servicio</th>
            <th>Estado</th>
            <th>Fuente</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="6">Cargando...</td>
          </tr>
          <tr v-else-if="leads.length === 0">
            <td colspan="6">Sin leads.</td>
          </tr>
          <template v-else>
            <tr v-for="lead in leads" :key="lead.id">
              <td>
                <strong>{{ lead.name }}</strong>
                <span>{{ lead.business_type || 'Sin negocio' }}</span>
              </td>
              <td>
                <span>{{ lead.email || 'Sin email' }}</span>
                <span>{{ lead.phone || 'Sin telefono' }}</span>
              </td>
              <td>{{ lead.service_interest || 'Sin servicio' }}</td>
              <td><span class="dashboard-pill">{{ lead.status }}</span></td>
              <td>{{ lead.source }}</td>
              <td class="dashboard-actions">
                <button class="dashboard-icon-btn" type="button" title="Editar" @click="editLead(lead)">
                  <IconInline name="RefreshCw" :size="16" />
                </button>
                <button class="dashboard-icon-btn dashboard-icon-btn--danger" type="button" title="Eliminar" @click="emit('delete', lead.id)">
                  <IconInline name="Scissors" :size="16" />
                </button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </section>
</template>
