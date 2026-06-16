<script setup lang="ts">
const rows = [
  ['', 'Agenc-IA', 'Chatbot genérico', 'Agencia web tradicional'],
  ['Canales Meta', 'WhatsApp + FB + IG', 'Solo WhatsApp', 'Solo formulario web'],
  ['CRM integrado', 'Sí (HubSpot, Sheets, etc.)', 'No', 'No'],
  ['Seguimiento post-venta', 'Automatizado', 'No', 'Manual'],
  ['Handoff a humano', 'Incluido en todos los planes', 'No', 'No aplica'],
  ['Medición de ROI', 'Dashboard mensual', 'No', 'No'],
  ['Moderación comentarios', 'FB + IG incluido', 'No', 'No'],
  ['E-commerce conversacional', 'WhatsApp Catalog + pedidos', 'No', 'Requiere tienda aparte'],
  ['Soporte incluido', 'Todos los planes', 'Limitado', 'Cotización aparte'],
  ['Implementación', '5-15 días', '1-2 días', '4-8 semanas']
]
</script>

<template>
  <section class="section">
    <div class="section__head" data-reveal>
      <p class="eyebrow">Comparativa</p>
      <h2>¿Por qué Agenc-IA?</h2>
      <p>Comparamos para que tengas claro qué ganas al elegirnos.</p>
    </div>
    <div class="comparison-table" data-reveal>
      <div v-for="(row, ri) in rows" :key="ri" class="comparison-row" :class="{ header: ri === 0 }">
        <span v-for="(cell, ci) in row" :key="ci"
              :class="{ 'col-agenc': ci === 1, 'col-first': ci === 0 }">{{ cell }}</span>
      </div>
    </div>
  </section>
</template>
