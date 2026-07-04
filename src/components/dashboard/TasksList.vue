<script setup lang="ts">
import { reactive, ref } from 'vue'
import IconInline from '../IconInline.vue'
import type { Task } from '../../composables/useSupabase'
import type { TaskFilters, TaskInput } from '../../composables/useTasks'

const props = defineProps<{
  tasks: Task[]
  loading: boolean
  filters: TaskFilters
}>()

const emit = defineEmits<{
  save: [task: TaskInput]
  toggle: [task: Task]
  delete: [id: string]
  filter: [filters: TaskFilters]
}>()

const filterDraft = reactive<TaskFilters>({ ...props.filters })
const localError = ref('')
const draft = reactive<TaskInput & { due_local?: string }>({
  title: '',
  notes: '',
  status: 'open',
  priority: 'normal',
  due_local: ''
})

function toLocalInput(value: string | null) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}

function resetDraft() {
  Object.assign(draft, {
    id: undefined,
    title: '',
    notes: '',
    status: 'open',
    priority: 'normal',
    due_at: undefined,
    due_local: ''
  })
}

function editTask(task: Task) {
  Object.assign(draft, {
    id: task.id,
    title: task.title,
    notes: task.notes || '',
    status: task.status,
    priority: task.priority,
    due_at: task.due_at,
    due_local: toLocalInput(task.due_at)
  })
}

function submitTask() {
  localError.value = ''
  if (!draft.title.trim()) {
    localError.value = 'El titulo es obligatorio.'
    return
  }

  emit('save', {
    ...draft,
    title: draft.title.trim(),
    due_at: draft.due_local ? new Date(draft.due_local).toISOString() : null
  })
  resetDraft()
}
</script>

<template>
  <section class="dashboard-panel">
    <div class="dashboard-panel__head">
      <div>
        <h2>{{ draft.id ? 'Editar tarea' : 'Nueva tarea' }}</h2>
        <p v-if="localError" class="dashboard-error">{{ localError }}</p>
      </div>
      <button v-if="draft.id" class="dashboard-icon-btn" type="button" title="Cancelar edicion" @click="resetDraft">
        <IconInline name="RefreshCw" :size="17" />
      </button>
    </div>

    <form class="dashboard-form dashboard-form--tasks" @submit.prevent="submitTask">
      <input v-model="draft.title" placeholder="Seguimiento" />
      <input v-model="draft.due_local" type="datetime-local" />
      <select v-model="draft.priority">
        <option value="low">low</option>
        <option value="normal">normal</option>
        <option value="high">high</option>
      </select>
      <select v-model="draft.status">
        <option value="open">open</option>
        <option value="done">done</option>
      </select>
      <textarea v-model="draft.notes" placeholder="Notas"></textarea>
      <button class="dashboard-btn dashboard-btn--primary" type="submit">
        <IconInline name="Check" :size="17" />
        {{ draft.id ? 'Guardar' : 'Crear' }}
      </button>
    </form>
  </section>

  <section class="dashboard-panel">
    <div class="dashboard-panel__head">
      <h2>Tareas</h2>
      <form class="dashboard-filters" @submit.prevent="emit('filter', { ...filterDraft })">
        <select v-model="filterDraft.status">
          <option value="">Todas</option>
          <option value="open">open</option>
          <option value="done">done</option>
        </select>
        <button class="dashboard-icon-btn" type="submit" title="Filtrar">
          <IconInline name="Search" :size="17" />
        </button>
      </form>
    </div>

    <div class="dashboard-task-list">
      <p v-if="loading" class="dashboard-muted">Cargando...</p>
      <p v-else-if="tasks.length === 0" class="dashboard-muted">Sin tareas.</p>
      <template v-else>
        <article v-for="task in tasks" :key="task.id" class="dashboard-task" :class="{ done: task.status === 'done' }">
          <button class="dashboard-check" type="button" :title="task.status === 'done' ? 'Reabrir' : 'Completar'" @click="emit('toggle', task)">
            <IconInline v-if="task.status === 'done'" name="Check" :size="16" />
          </button>
          <div>
            <strong>{{ task.title }}</strong>
            <span>{{ task.notes || 'Sin notas' }}</span>
            <small>{{ task.due_at ? new Date(task.due_at).toLocaleString() : 'Sin vencimiento' }} · {{ task.priority }}</small>
          </div>
          <div class="dashboard-actions">
            <button class="dashboard-icon-btn" type="button" title="Editar" @click="editTask(task)">
              <IconInline name="RefreshCw" :size="16" />
            </button>
            <button class="dashboard-icon-btn dashboard-icon-btn--danger" type="button" title="Eliminar" @click="emit('delete', task.id)">
              <IconInline name="Scissors" :size="16" />
            </button>
          </div>
        </article>
      </template>
    </div>
  </section>
</template>
