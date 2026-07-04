import { ref } from 'vue'
import { dashboardRequest, type Task } from './useSupabase'

export interface TaskFilters {
  status: string
}

export type TaskInput = Partial<Omit<Task, 'created_at' | 'updated_at'>> & { title: string }

export function useTasks() {
  const tasks = ref<Task[]>([])
  const loading = ref(false)
  const error = ref('')
  const filters = ref<TaskFilters>({ status: '' })

  async function loadTasks() {
    loading.value = true
    error.value = ''
    try {
      const params = filters.value.status ? { status: filters.value.status } : undefined
      tasks.value = await dashboardRequest<Task[]>('tasks', { params })
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'No se pudieron cargar las tareas'
    } finally {
      loading.value = false
    }
  }

  async function saveTask(task: TaskInput) {
    const id = task.id
    await dashboardRequest<Task[]>('tasks', {
      method: id ? 'PATCH' : 'POST',
      params: id ? { id } : undefined,
      body: task
    })
    await loadTasks()
  }

  async function deleteTask(id: string) {
    await dashboardRequest<{ ok: true }>('tasks', { method: 'DELETE', params: { id } })
    await loadTasks()
  }

  async function toggleTask(task: Task) {
    await saveTask({ id: task.id, title: task.title, status: task.status === 'done' ? 'open' : 'done' })
  }

  return { tasks, loading, error, filters, loadTasks, saveTask, deleteTask, toggleTask }
}
