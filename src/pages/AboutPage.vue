<script setup lang="ts">
const missionCards = [
  { icon: '🎯', title: 'Misión', text: 'Convertir la IA en sistemas operativos reales para PYMES colombianas, no en promesas. Implementamos agentes que responden, venden, registran y hacen seguimiento.' },
  { icon: '🔭', title: 'Visión', text: 'Ser la agencia líder en automatización conversacional Meta para el mercado PYME latinoamericano, combinando tecnología de punta con cercanía humana.' },
  { icon: '✨', title: 'Valores', text: 'Transparencia en precios, human-in-the-loop donde importa, mejora continua mes a mes, y cero vendor lock-in.' }
]
</script>

<template>
  <div class="page-about">
    <section class="page-hero">
      <p class="eyebrow">Sobre Nosotros</p>
      <h1>Construimos agentes IA que trabajan 24/7 para PYMES colombianas.</h1>
      <p class="page-hero__sub">No vendemos chatbots genéricos. Construimos sistemas conversacionales completos sobre WhatsApp, Instagram y Facebook.</p>
    </section>

    <!-- Misión / Visión / Valores -->
    <section class="section">
      <div class="about-grid" data-reveal>
        <article v-for="m in missionCards" :key="m.title" class="about-card">
          <div class="about-card__icon">{{ m.icon }}</div>
          <h3>{{ m.title }}</h3>
          <p>{{ m.text }}</p>
        </article>
      </div>
    </section>

    <!-- Stack -->
    <section class="section">
      <div class="section__head" data-reveal>
        <p class="eyebrow">Stack Tecnológico</p>
        <h2>Construido con las mejores herramientas.</h2>
      </div>
      <div class="stack-grid" data-reveal>
        <span class="stack-chip">Vue 3 + TypeScript</span>
        <span class="stack-chip">GSAP</span>
        <span class="stack-chip">n8n</span>
        <span class="stack-chip">WhatsApp Business API</span>
        <span class="stack-chip">Meta Graph API</span>
        <span class="stack-chip">Facebook Lead Ads</span>
        <span class="stack-chip">Instagram API</span>
        <span class="stack-chip">Vercel</span>
        <span class="stack-chip">Hermes Agent</span>
        <span class="stack-chip">HubSpot</span>
        <span class="stack-chip">Google Sheets</span>
        <span class="stack-chip">Supabase</span>
        <span class="stack-chip">PostgreSQL</span>
        <span class="stack-chip">CSS + SCSS</span>
      </div>
    </section>

    <!-- Caso destacado -->
    <section class="section">
      <div class="section__head" data-reveal>
        <p class="eyebrow">Caso Destacado</p>
        <h2>Auto Sales AI OS — nuestro proyecto insignia.</h2>
        <p>El sistema completo de ventas para concesionarios que demuestra todo lo que podemos hacer.</p>
      </div>
      <div class="case-grid" data-reveal>
        <article class="case-card">
          <div class="case-card__industry">Automotriz — Bucaramanga</div>
          <h3>Concesionario de vehículos usados</h3>
          <p class="case-card__problem"><strong>Problema:</strong> 60% de consultas por WhatsApp sin respuesta en menos de 4 horas.</p>
          <p class="case-card__solution"><strong>Solución:</strong> Agente IA que califica presupuesto, ciudad, tipo de carro y urgencia en segundos.</p>
          <div class="case-results">
            <div class="case-result"><strong>&lt;30s</strong><span>Tiempo de respuesta</span></div>
            <div class="case-result"><strong>85%</strong><span>Consultas 24/7</span></div>
            <div class="case-result"><strong>3×</strong><span>Leads calificados</span></div>
            <div class="case-result"><strong>$1.2M COP</strong><span>Ahorro/mes</span></div>
          </div>
        </article>
      </div>
      <div class="section-cta" data-reveal>
        <RouterLink to="/casos" class="btn btn--primary">Ver más casos →</RouterLink>
      </div>
    </section>

    <section class="section cta-section" data-reveal>
      <h2>¿Querés esto en tu negocio?</h2>
      <p>Agendá un diagnóstico de 20 minutos. Sin costo, sin compromiso.</p>
      <RouterLink to="/contacto" class="btn btn--primary">Empezar ahora</RouterLink>
    </section>
  </div>
</template>
