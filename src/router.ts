import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import ServicesPage from './pages/ServicesPage.vue'
import CasesPage from './pages/CasesPage.vue'
import PricingPage from './pages/PricingPage.vue'
import ContactPage from './pages/ContactPage.vue'
import AboutPage from './pages/AboutPage.vue'
import DashboardPage from './pages/dashboard/DashboardPage.vue'
import LeadsPage from './pages/dashboard/LeadsPage.vue'
import ConversationsPage from './pages/dashboard/ConversationsPage.vue'
import TasksPage from './pages/dashboard/TasksPage.vue'
import SettingsPage from './pages/dashboard/SettingsPage.vue'

if (window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', window.location.hash.slice(1))
}

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/servicios', name: 'services', component: ServicesPage },
  { path: '/casos', name: 'cases', component: CasesPage },
  { path: '/precios', name: 'pricing', component: PricingPage },
  { path: '/nosotros', name: 'about', component: AboutPage },
  { path: '/contacto', name: 'contact', component: ContactPage },
  { path: '/dashboard', name: 'dashboard', component: DashboardPage },
  { path: '/dashboard/leads', name: 'dashboard-leads', component: LeadsPage },
  { path: '/dashboard/conversations', name: 'dashboard-conversations', component: ConversationsPage },
  { path: '/dashboard/tasks', name: 'dashboard-tasks', component: TasksPage },
  { path: '/dashboard/settings', name: 'dashboard-settings', component: SettingsPage }
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})
