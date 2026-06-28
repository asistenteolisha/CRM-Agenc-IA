<script setup lang="ts">
const useCases = [
  { title: 'Venta de vehículos', desc: 'Califica compradores, presupuesto y urgencia por WhatsApp. El vendedor recibe el lead caliente con todos los datos listos para cerrar.', emoji: '🚗' },
  { title: 'Restaurantes', desc: 'Responde menú, horarios, ubicación y toma reservas por Instagram DM y WhatsApp 24/7. Recordatorios automáticos que reducen no-shows.', emoji: '🍽️' },
  { title: 'Ópticas', desc: 'Agenda exámenes de vista, responde sobre marcos y lentes, gestiona pedidos y envía recordatorios de revisión por WhatsApp.', emoji: '👓' },
  { title: 'Retail', desc: 'Catálogo WhatsApp, pedidos, seguimiento de envío y atención al cliente. Todo en el chat sin sacar al cliente a otra app.', emoji: '🛍️' },
  { title: 'Salones de belleza', desc: 'Agenda citas, muestra servicios y precios, envía recordatorios y gestiona cancelaciones por WhatsApp e Instagram.', emoji: '💇' },
  { title: 'Bienes raíces', desc: 'Lead Ads de Facebook → WhatsApp con catálogo de inmuebles actualizado. Califica presupuesto, zona y agenda visita automáticamente.', emoji: '🏠' },
  { title: 'Educación', desc: 'Responde sobre programas, admisiones y horarios. Agenda entrevistas y captura aspirantes por WhatsApp y Facebook.', emoji: '🎓' },
  { title: 'Fitness', desc: 'Gestiona membresías, agenda clases, responde precios y envía recordatorios de entrenamiento por WhatsApp.', emoji: '💪' }
]
</script>

<template>
  <section id="casos" class="section">
    <div class="section__head" data-reveal>
      <p class="eyebrow">Industrias</p>
      <h2>Agentes de IA para cada tipo de negocio en Colombia.</h2>
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
