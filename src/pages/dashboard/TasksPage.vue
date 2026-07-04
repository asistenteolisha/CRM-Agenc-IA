<script setup lang="ts">
import { onMounted } from 'vue'
import Sidebar from '../../components/dashboard/Sidebar.vue'
import TasksList from '../../components/dashboard/TasksList.vue'
import { useTasks, type TaskFilters, type TaskInput } from '../../composables/useTasks'

const { tasks, loading, error, filters, loadTasks, saveTask, deleteTask, toggleTask } = useTasks()

function applyFilters(nextFilters: TaskFilters) {
  filters.value = nextFilters
  loadTasks()
}

async function persistTask(task: TaskInput) {
  await saveTask(task)
}

onMounted(loadTasks)
</script>

<template>
  <div class="dashboard-shell">
    <Sidebar />
    <main class="dashboard-main">
      <header class="dashboard-topbar">
        <div>
          <p class="dashboard-eyebrow">CRM</p>
          <h1>Tareas</h1>
        </div>
      </header>

      <p v-if="error" class="dashboard-error">{{ error }}</p>
      <TasksList
        :tasks="tasks"
        :loading="loading"
        :filters="filters"
        @save="persistTask"
        @toggle="toggleTask"
        @delete="deleteTask"
        @filter="applyFilters"
      />
    </main>
  </div>
</template>
