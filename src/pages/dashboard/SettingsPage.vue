<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import Sidebar from '../../components/dashboard/Sidebar.vue'
import { dashboardRequest, useDashboardToken, type Client, type Plan } from '../../composables/useSupabase'

interface ClientDraft {
  id?: string
  name: string
  contact_name: string
  email: string
  phone: string
  business_type: string
  status: Client['status']
}

const { token, saveToken } = useDashboardToken()
const clients = ref<Client[]>([])
const plans = ref<Plan[]>([])
const loading = ref(false)
const error = ref('')
const message = ref('')
const draft = reactive<ClientDraft>({
  name: '',
  contact_name: '',
  email: '',
  phone: '',
  business_type: '',
  status: 'active'
})

function fillClient(client: Client) {
  Object.assign(draft, {
    id: client.id,
    name: client.name,
    contact_name: client.contact_name || '',
    email: client.email || '',
    phone: client.phone || '',
    business_type: client.business_type || '',
    status: client.status
  })
}

async function loadSettings() {
  loading.value = true
  error.value = ''
  try {
    const [nextClients, nextPlans] = await Promise.all([
      dashboardRequest<Client[]>('clients'),
      dashboardRequest<Plan[]>('plans')
    ])
    clients.value = nextClients
    plans.value = nextPlans
    if (nextClients[0]) fillClient(nextClients[0])
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'No se pudo cargar settings'
  } finally {
    loading.value = false
  }
}

async function saveAccess() {
  saveToken()
  message.value = 'Token guardado.'
  await loadSettings()
}

async function saveClient() {
  error.value = ''
  message.value = ''
  if (!draft.name.trim()) {
    error.value = 'El nombre del negocio es obligatorio.'
    return
  }

  await dashboardRequest<Client[]>('clients', {
    method: draft.id ? 'PATCH' : 'POST',
    params: draft.id ? { id: draft.id } : undefined,
    body: draft
  })
  message.value = 'Negocio guardado.'
  await loadSettings()
}

onMounted(() => {
  if (token.value) loadSettings()
})
</script>

<template>
  <div class="dashboard-shell">
    <Sidebar />
    <main class="dashboard-main">
      <header class="dashboard-topbar">
        <div>
          <p class="dashboard-eyebrow">CRM</p>
          <h1>Settings</h1>
        </div>
      </header>

      <p v-if="error" class="dashboard-error">{{ error }}</p>
      <p v-if="message" class="dashboard-success">{{ message }}</p>
      <p v-if="loading" class="dashboard-muted">Cargando...</p>

      <section class="dashboard-panel">
        <div class="dashboard-panel__head">
          <h2>Acceso</h2>
        </div>
        <form class="dashboard-form dashboard-form--settings" @submit.prevent="saveAccess">
          <input v-model="token" type="password" placeholder="DASHBOARD_API_TOKEN" autocomplete="current-password" />
          <button class="dashboard-btn dashboard-btn--primary" type="submit">Guardar token</button>
        </form>
      </section>

      <section class="dashboard-panel">
        <div class="dashboard-panel__head">
          <h2>Negocio</h2>
        </div>
        <form class="dashboard-form dashboard-form--settings" @submit.prevent="saveClient">
          <input v-model="draft.name" placeholder="Nombre del negocio" />
          <input v-model="draft.contact_name" placeholder="Contacto" />
          <input v-model="draft.email" type="email" placeholder="Email" />
          <input v-model="draft.phone" placeholder="Telefono" />
          <input v-model="draft.business_type" placeholder="Tipo de negocio" />
          <select v-model="draft.status">
            <option value="lead">lead</option>
            <option value="active">active</option>
            <option value="paused">paused</option>
            <option value="churned">churned</option>
          </select>
          <button class="dashboard-btn dashboard-btn--primary" type="submit">Guardar negocio</button>
        </form>
      </section>

      <section class="dashboard-panel">
        <div class="dashboard-panel__head">
          <h2>Planes</h2>
        </div>
        <div class="dashboard-table-wrap">
          <table class="dashboard-table">
            <thead>
              <tr>
                <th>Plan</th>
                <th>Estado</th>
                <th>Mensual COP</th>
                <th>Setup COP</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="plans.length === 0">
                <td colspan="4">Sin planes.</td>
              </tr>
              <template v-else>
                <tr v-for="plan in plans" :key="plan.id">
                  <td>
                    <strong>{{ plan.plan_name }}</strong>
                    <span>{{ plan.plan_key }}</span>
                  </td>
                  <td><span class="dashboard-pill">{{ plan.status }}</span></td>
                  <td>{{ plan.monthly_cop.toLocaleString('es-CO') }}</td>
                  <td>{{ plan.setup_cop.toLocaleString('es-CO') }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>
