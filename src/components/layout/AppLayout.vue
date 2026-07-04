<script setup lang="ts">
import { ref } from 'vue'
import ChatWidget from '../chat/ChatWidget.vue'
import BackToTop from '../BackToTop.vue'
import { trackEvent } from '../../utils/analytics'

const mobileOpen = ref(false)
const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/casos', label: 'Casos' },
  { to: '/precios', label: 'Precios' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' }
]

function trackWhatsAppClick(location: string) {
  trackEvent('whatsapp_click', { location })
}
</script>

<template>
  <div class="site-shell">
    <header class="nav">
      <RouterLink class="nav__brand" to="/" aria-label="Agenc-IA inicio">
        <img src="/logo.svg" alt="Agenc-IA" />
      </RouterLink>
      <nav class="nav__links" aria-label="Navegacion principal">
        <RouterLink v-for="l in navLinks" :key="l.to" :to="l.to">{{ l.label }}</RouterLink>
      </nav>
      <a href="https://wa.me/573012604061" class="nav__cta" @click="trackWhatsAppClick('nav')">WhatsApp</a>
      <button class="nav__hamburger" aria-label="Menu" @click="mobileOpen = !mobileOpen">
        <span :class="{ open: mobileOpen }"></span>
      </button>
    </header>

    <div class="mobile-menu" :class="{ open: mobileOpen }" @click.self="mobileOpen = false">
      <RouterLink v-for="l in navLinks" :key="l.to" :to="l.to" @click="mobileOpen = false">{{ l.label }}</RouterLink>
      <a href="https://wa.me/573012604061" class="mobile-menu__cta" @click="trackWhatsAppClick('mobile_menu')">WhatsApp -></a>
    </div>

    <slot />

    <footer class="app-footer">
      <div class="app-footer__inner">
        <div class="app-footer__brand">
          <img src="/logo.svg" alt="Agenc-IA" />
          <p>Agentes IA para vender por WhatsApp, Instagram y Facebook. Hecho para PYMES colombianas.</p>
        </div>
        <div class="app-footer__links">
          <strong>Secciones</strong>
          <RouterLink to="/servicios">Servicios</RouterLink>
          <RouterLink to="/casos">Casos</RouterLink>
          <RouterLink to="/precios">Precios</RouterLink>
          <RouterLink to="/nosotros">Nosotros</RouterLink>
          <RouterLink to="/contacto">Contacto</RouterLink>
        </div>
        <div class="app-footer__links">
          <strong>Contacto</strong>
          <a href="mailto:leinadgalaxy@gmail.com">leinadgalaxy@gmail.com</a>
          <a href="https://wa.me/573012604061" @click="trackWhatsAppClick('footer')">WhatsApp</a>
          <a href="https://github.com/rolito240/Agenc-IA">GitHub</a>
        </div>
      </div>
      <div class="app-footer__bottom">
        <span>&copy; {{ new Date().getFullYear() }} Agenc-IA. Todos los derechos reservados.</span>
        <span class="footer-badge">Hecho con IA + criterio humano</span>
      </div>
    </footer>
    <ChatWidget />
    <BackToTop />
  </div>
</template>
