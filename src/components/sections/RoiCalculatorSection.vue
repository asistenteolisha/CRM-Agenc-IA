<script setup lang="ts">
import { ref, computed } from 'vue'
import { calculateRoi } from '../../utils/roi'
import type { RoiInput } from '../../data/content'

const roiInput = ref<RoiInput>({
  monthlyLeads: 100,
  missedLeadRate: 0.3,
  averageTicket: 500000,
  grossMarginRate: 0.35,
  currentConversionRate: 0.08,
  expectedLiftRate: 0.5,
  weeklyManualHours: 5,
  hourlyCost: 12000,
  monthlyPlanCost: 399000,
  setupCost: 999000
})

const roiResult = computed(() => calculateRoi(roiInput.value))
</script>

<template>
  <section id="roi" class="section roi-section">
    <div class="section__head" data-reveal>
      <p class="eyebrow">Calculadora de ROI</p>
      <h2>¿Cuánto podrías estar ganando con un agente IA?</h2>
      <p>Ajustá los valores y descubrí el retorno estimado para tu negocio.</p>
    </div>
    <div class="roi-grid" data-reveal>
      <div class="roi-inputs">
        <div class="input-group">
          <label>Leads que recibís al mes</label>
          <input type="number" v-model.number="roiInput.monthlyLeads" min="10" max="5000" />
        </div>
        <div class="input-group">
          <label>% de leads sin respuesta a tiempo</label>
          <input type="range" v-model.number="roiInput.missedLeadRate" min="0.1" max="0.9" step="0.05" />
          <span>{{ Math.round(roiInput.missedLeadRate * 100) }}%</span>
        </div>
        <div class="input-group">
          <label>Ticket promedio de venta (COP)</label>
          <input type="number" v-model.number="roiInput.averageTicket" min="50000" max="50000000" step="50000" />
        </div>
        <div class="input-group">
          <label>% de mejora esperada con el agente</label>
          <input type="range" v-model.number="roiInput.expectedLiftRate" min="0.1" max="0.9" step="0.05" />
          <span>{{ Math.round(roiInput.expectedLiftRate * 100) }}%</span>
        </div>
      </div>
      <div class="roi-results">
        <div class="roi-result-card">
          <strong>{{ roiResult.recoveredSales.toFixed(1) }}</strong>
          <span>ventas recuperadas/mes</span>
        </div>
        <div class="roi-result-card highlight">
          <strong>${{ roiResult.monthlyBenefit.toLocaleString('es-CO') }}</strong>
          <span>beneficio mensual estimado</span>
        </div>
        <div class="roi-result-card">
          <strong>{{ (roiResult.roi * 100).toFixed(0) }}%</strong>
          <span>ROI mensual</span>
        </div>
        <div class="roi-result-card">
          <strong>{{ isFinite(roiResult.paybackMonths) ? roiResult.paybackMonths.toFixed(1) + ' meses' : '∞' }}</strong>
          <span>para recuperar el setup</span>
        </div>
      </div>
    </div>
  </section>
</template>
