<script setup lang="ts">
import { ref } from 'vue'

const mobileOpen = ref(false)
const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/casos', label: 'Casos' },
  { to: '/precios', label: 'Precios' },
  { to: '/contacto', label: 'Contacto' }
]
</script>

<template>
  <div class="site-shell">
    <!-- Nav -->
    <header class="nav">
      <RouterLink class="nav__brand" to="/" aria-label="Agenc-IA inicio">
        <span>Agenc</span><strong>-IA</strong>
      </RouterLink>
      <nav class="nav__links" aria-label="Navegación principal">
        <RouterLink v-for="l in navLinks" :key="l.to" :to="l.to">{{ l.label }}</RouterLink>
      </nav>
      <button class="nav__hamburger" aria-label="Menú" @click="mobileOpen = !mobileOpen">
        <span :class="{ open: mobileOpen }"></span>
      </button>
    </header>

    <!-- Mobile menu -->
    <div class="mobile-menu" :class="{ open: mobileOpen }" @click.self="mobileOpen = false">
      <RouterLink v-for="l in navLinks" :key="l.to" :to="l.to" @click="mobileOpen = false">{{ l.label }}</RouterLink>
      <a href="https://wa.me/573001234567" class="mobile-menu__cta">Hablar por WhatsApp →</a>
    </div>

    <!-- Page content -->
    <slot />

    <!-- Footer -->
    <footer class="app-footer">
      <div class="app-footer__inner">
        <div class="app-footer__brand">
          <span class="brand-name"><span>Agenc</span><strong>-IA</strong></span>
          <p>Agentes IA para vender por WhatsApp, Instagram y Facebook. PYMES colombianas.</p>
        </div>
        <div class="app-footer__links">
          <strong>Secciones</strong>
          <RouterLink to="/servicios">Servicios</RouterLink>
          <RouterLink to="/casos">Casos</RouterLink>
          <RouterLink to="/precios">Precios</RouterLink>
          <RouterLink to="/contacto">Contacto</RouterLink>
        </div>
        <div class="app-footer__links">
          <strong>Contacto</strong>
          <a href="mailto:leinadgalaxy@gmail.com">leinadgalaxy@gmail.com</a>
          <a href="https://wa.me/573001234567">WhatsApp</a>
          <a href="https://github.com/rolito240/Agenc-IA">GitHub</a>
        </div>
      </div>
      <div class="app-footer__bottom">
        <span>© 2026 Agenc-IA. Todos los derechos reservados.</span>
        <span class="footer-badge">Hecho con IA + criterio humano 🇨🇴</span>
      </div>
    </footer>
  </div>
</template>
