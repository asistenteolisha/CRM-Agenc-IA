<script setup lang="ts">
import { ref, watch } from 'vue'

type DemoKey = 'ventas' | 'soporte' | 'ecommerce' | 'social'

interface ChatMessage { role: 'client' | 'agent' | 'summary'; text: string }

const demos: Record<DemoKey, ChatMessage[]> = {
  ventas: [
    { role: 'client', text: 'Hola, busco un carro automático de hasta 45 millones.' },
    { role: 'agent', text: 'Perfecto. Para ayudarte mejor: ¿ciudad, uso principal y si necesitas financiación?' },
    { role: 'client', text: 'Bucaramanga, familiar, podría financiar una parte.' },
    { role: 'summary', text: '✅ Lead caliente: automático familiar, 45M COP, Bucaramanga, financiación parcial. → CRM.' }
  ],
  soporte: [
    { role: 'client', text: '¿Tienen disponibilidad para esta noche? Somos 4 personas.' },
    { role: 'agent', text: '¡Claro! Tenemos mesa a las 7:30pm y 9pm. ¿Cuál preferís?' },
    { role: 'client', text: '7:30pm perfecto, gracias.' },
    { role: 'summary', text: '✅ Reserva confirmada: 4 personas, hoy 7:30pm. Recordatorio programado 24h y 1h antes.' }
  ],
  ecommerce: [
    { role: 'client', text: 'Quiero las zapatillas que vi en el reel. Talla 38, ¿están disponibles?' },
    { role: 'agent', text: '¡Sí! Las Air Runner talla 38 disponibles. $189.000 con envío gratis a toda Colombia.' },
    { role: 'client', text: 'Las quiero. ¿Cómo pago?' },
    { role: 'summary', text: '✅ Venta: Air Runner 38, $189.000. Link de pago Wompi enviado. Seguimiento postventa programado.' }
  ],
  social: [
    { role: 'client', text: '¿Precio? 🤔' },
    { role: 'agent', text: '¡Hola! Te envié toda la info al DM. Revisá tu bandeja de solicitudes cuando puedas 😊' },
    { role: 'client', text: 'Gracias, ya lo vi. ¿Tienen talla M en negro?' },
    { role: 'summary', text: '✅ Lead desde comentario de reel → DM → WhatsApp. Datos de producto y talla capturados.' }
  ]
}

const tabLabels: { key: DemoKey; label: string; icon: string }[] = [
  { key: 'ventas',   label: 'Ventas',        icon: '💰' },
  { key: 'soporte',  label: 'Atención',      icon: '💬' },
  { key: 'ecommerce',label: 'E-commerce',    icon: '🛒' },
  { key: 'social',   label: 'Redes Sociales',icon: '📱' }
]

const activeTab = ref<DemoKey>('ventas')
const visibleMessages = ref<{ role: string; text: string }[]>([])
const isTyping = ref(false)

async function animateMessages(messages: ChatMessage[]) {
  visibleMessages.value = []
  isTyping.value = true

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i]
    const delay = msg.role === 'client' ? 600 : msg.role === 'summary' ? 500 : 400

    await new Promise(r => setTimeout(r, delay))
    visibleMessages.value = [...visibleMessages.value, { role: msg.role, text: msg.text }]
  }

  isTyping.value = false
}

watch(activeTab, () => {
  animateMessages(demos[activeTab.value])
}, { immediate: true })
</script>

<template>
  <section id="demo" class="demo">
    <div class="demo__content" data-reveal>
      <p class="eyebrow">Demo interactiva</p>
      <h2>Así se ve un agente Agenc-IA en acción.</h2>
      <p>Conversaciones reales en diferentes industrias, atendidas automáticamente 24/7.</p>
      <div class="demo-tabs">
        <button v-for="tab in tabLabels" :key="tab.key"
                :class="{ active: activeTab === tab.key }"
                @click="activeTab = tab.key">
          {{ tab.icon }} {{ tab.label }}
        </button>
      </div>
    </div>
    <div class="chat-demo" aria-label="Demo de conversación" data-reveal>
      <div class="chat-demo__header">
        <span class="chat-demo__dot"></span>
        <span>{{ tabLabels.find(t => t.key === activeTab)?.label }} — WhatsApp</span>
      </div>
      <div class="chat-demo__body">
        <TransitionGroup name="msg">
          <p v-for="(msg, i) in visibleMessages" :key="i"
             class="bubble" :class="'bubble--' + msg.role">{{ msg.text }}</p>
        </TransitionGroup>
        <p v-if="isTyping" class="bubble bubble--agent typing">Escribiendo<span class="dots">...</span></p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.demo-tabs {
  display: flex; gap: 8px; margin-top: 18px; flex-wrap: wrap;
}
.demo-tabs button {
  padding: 8px 16px; border: 1px solid var(--line); border-radius: var(--radius);
  background: transparent; color: var(--muted); cursor: pointer; font-size: 0.84rem; transition: all 0.2s;
}
.demo-tabs button.active {
  border-color: var(--green); color: var(--green); background: rgba(79,255,176,0.08);
}
.demo-tabs button:hover { border-color: var(--line-strong); }

.chat-demo__header {
  display: flex; align-items: center; gap: 8px; padding-bottom: 12px;
  border-bottom: 1px solid var(--line); margin-bottom: 12px;
  color: var(--dim); font-size: 0.8rem;
}
.chat-demo__dot {
  width: 8px; height: 8px; border-radius: 50%; background: var(--wa);
  box-shadow: 0 0 6px var(--wa); animation: pulse 2s ease-in-out infinite;
}
.chat-demo__body { min-height: 180px; }
.typing { opacity: 0.6; }
.typing .dots::after { content: ''; animation: dots 1.5s steps(3, end) infinite; }
@keyframes dots {
  0% { content: ''; } 33% { content: '.'; } 66% { content: '..'; } 100% { content: '...'; }
}

.msg-enter-active { transition: all 0.35s ease-out; }
.msg-leave-active { transition: all 0.2s ease-in; }
.msg-enter-from { opacity: 0; transform: translateY(12px); }
.msg-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
