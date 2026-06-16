<script setup lang="ts">
const useCases = [
  { title: 'Concesionarios y compraventas', desc: 'Califica compradores, presupuesto y urgencia por WhatsApp. Avisa al vendedor cuando hay lead caliente con todos los datos listos para cerrar.', emoji: '🚗' },
  { title: 'Restaurantes y cafés', desc: 'Responde menú, horarios, ubicación y toma reservas por Instagram DM y WhatsApp 24/7. Recordatorios automáticos que reducen no-shows.', emoji: '🍽️' },
  { title: 'Clínicas y consultorios', desc: 'Agenda citas, confirma asistencia y reduce ausentismo con recordatorios por WhatsApp. Captura datos del paciente antes de la consulta.', emoji: '🏥' },
  { title: 'Inmobiliarias', desc: 'Lead Ads de Facebook → WhatsApp con catálogo de inmuebles actualizado. Califica presupuesto, zona y agenda visita automáticamente.', emoji: '🏠' },
  { title: 'E-commerce y marcas D2C', desc: 'Catálogo WhatsApp, pedidos, carrito y seguimiento de envío. Todo en el chat sin sacar al cliente a otra app o página.', emoji: '🛍️' },
  { title: 'Servicios profesionales', desc: 'Recibe documentos por WhatsApp, resume, clasifica y prepara para revisión del profesional. Ideal para abogados, contadores y consultores.', emoji: '📋' }
]
</script>

<template>
  <section id="casos" class="section">
    <div class="section__head" data-reveal>
      <p class="eyebrow">Casos de uso</p>
      <h2>Agentes IA para cada tipo de negocio en Colombia.</h2>
      <p>No importa tu industria: si recibís mensajes de clientes, podemos automatizar la conversación.</p>
    </div>
    <div class="usecase-grid">
      <article v-for="uc in useCases" :key="uc.title" class="usecase-card" data-reveal>
        <span class="usecase-emoji">{{ uc.emoji }}</span>
        <div>
          <h3>{{ uc.title }}</h3>
          <p>{{ uc.desc }}</p>
        </div>
      </article>
    </div>
  </section>
</template>
