import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import ServicesPage from './pages/ServicesPage.vue'
import CasesPage from './pages/CasesPage.vue'
import PricingPage from './pages/PricingPage.vue'
import ContactPage from './pages/ContactPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/servicios', name: 'services', component: ServicesPage },
  { path: '/casos', name: 'cases', component: CasesPage },
  { path: '/precios', name: 'pricing', component: PricingPage },
  { path: '/contacto', name: 'contact', component: ContactPage }
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})
