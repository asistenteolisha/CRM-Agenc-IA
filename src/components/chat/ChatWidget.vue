<script setup lang="ts">
import { ref, nextTick, watch, onMounted, onBeforeUnmount } from 'vue'
import IconInline from '../IconInline.vue'
import { trackEvent } from '../../utils/analytics'
import { withStoredUtmParams } from '../../utils/utm'

interface ChatMessage {
  role: 'agent' | 'user' | 'system'
  text: string
}

interface QuickAction {
  label: string
  action: string
}

const isOpen = ref(false)
const messages = ref<ChatMessage[]>([])
const input = ref('')
const chatBody = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const isTyping = ref(false)

const MSG_LIMIT = 15

function getMessageCount(): number {
  return parseInt(localStorage.getItem('agencia_chat_msg_count') || '0', 10)
}

function incrementMessageCount(): void {
  const count = getMessageCount() + 1
  localStorage.setItem('agencia_chat_msg_count', String(count))
}

const isLimitReached = ref(getMessageCount() >= MSG_LIMIT)

const quickActions: QuickAction[] = [
  { label: '¿Qué servicios ofrecen?', action: 'servicios' },
  { label: '¿Cuánto cuesta?', action: 'precios' },
  { label: 'Quiero un diagnóstico', action: 'diagnostico' },
  { label: 'Hablar por WhatsApp', action: 'whatsapp' }
]

function getResponse(msg: string): string {
  const q = msg.toLowerCase()
  if (q.includes('servicio') || q.includes('ofrecen') || q.includes('hacen'))
    return 'Ofrecemos agentes IA para WhatsApp, Instagram, Facebook y Messenger; automatización n8n + CRM; Meta Ads; dashboard de leads; y Web Profesional con SEO y WhatsApp. ¿Qué canal te duele más hoy?'
  if (q.includes('precio') || q.includes('cuesta') || q.includes('costo') || q.includes('plan') || q.includes('vale'))
    return 'Tenemos cuatro opciones:\n\n**Starter** — $399.000 COP / $99 USD al mes + setup $999.000 COP / $249 USD.\n**Growth** — $799.000 COP / $199 USD al mes + setup $1.999.000 COP / $499 USD.\n**Pro** — $1.399.000 COP / $349 USD al mes + setup $3.999.000 COP / $999 USD.\n**Web Profesional** — $2.499.000 COP / $620 USD pago único.\n\n¿Quieres un diagnóstico gratuito de 20 minutos?'
  if (q.includes('diagnóstico') || q.includes('diagnostico') || q.includes('agendar') || q.includes('contacto') || q.includes('hablar') || q.includes('llamada'))
    return 'Perfecto. Déjame nombre, WhatsApp, email y tipo de negocio. También puedes agendar desde https://www.agenciadia.tech/#/contacto'
  if (q.includes('cómo funciona') || q.includes('como funciona') || q.includes('funciona') || q.includes('proceso'))
    return 'Así trabajamos:\n\n1. Diagnóstico: revisamos canales, oferta y cuellos de botella.\n2. Setup done-for-you: configuramos agente, flujos, CRM y tracking.\n3. Optimización: medimos leads, conversaciones y ajustes mensuales.\n\nTiempo típico: 5 a 10 días hábiles según el plan.'
  if (q.includes('whatsapp') || q.includes('humano'))
    return 'Claro, habla con nosotros por WhatsApp: https://wa.me/573012604061. Si prefieres, déjame tus datos y te escribimos.'
  if (q.includes('hola') || q.includes('buenas') || q.includes('buenos'))
    return 'Hola, soy Lía, tu asesora de Agenc-IA. Te ayudo a automatizar WhatsApp, Instagram y Facebook con IA personalizada. ¿Qué canal quieres mejorar primero?'
  if (q.includes('quiénes') || q.includes('quienes') || q.includes('son') || q.includes('agenc') || q.includes('nosotros'))
    return 'Agenc-IA es una agencia colombiana de automatización conversacional para PYMES. Creamos agentes IA que venden, atienden y registran leads en WhatsApp, Instagram y Facebook, sin contratar más equipo.'
  return 'Gracias por tu mensaje. Para responderte bien, cuéntame qué negocio tienes y qué proceso quieres automatizar. También puedes hablar con un humano por WhatsApp: https://wa.me/573012604061'
}

function toggle() {
  isOpen.value = !isOpen.value
}

function syncViewportHeight() {
  const viewport = window.visualViewport
  document.documentElement.style.setProperty(
    '--chat-viewport-height',
    `${Math.round(viewport?.height || window.innerHeight)}px`
  )
}

function sendSystem(text: string) {
  messages.value.push({ role: 'system', text })
}

async function fetchAgentReply(message: string): Promise<string | null> {
  try {
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(withStoredUtmParams({ message }))
    })
    if (!resp.ok) return null
    const data = await resp.json()
    return data.reply || null
  } catch {
    return null
  }
}

async function sendMessage(text?: string) {
  if (isLimitReached.value) return

  const msg = text || input.value.trim()
  if (!msg) return

  incrementMessageCount()
  if (getMessageCount() >= MSG_LIMIT) {
    isLimitReached.value = true
  }

  messages.value.push({ role: 'user', text: msg })
  input.value = ''
  isTyping.value = true

  const agentReply = await fetchAgentReply(msg)
  isTyping.value = false

  if (agentReply) {
    messages.value.push({ role: 'agent', text: agentReply })
  } else {
    messages.value.push({ role: 'agent', text: getResponse(msg) })
  }

  scrollDown()
}

function handleAction(action: string) {
  if (action === 'whatsapp') {
    trackEvent('whatsapp_click', { location: 'chat_widget' })
    window.open('https://wa.me/573012604061', '_blank')
    sendSystem('Abriendo WhatsApp...')
    return
  }

  if (action === 'diagnostico') {
    sendMessage('Quiero un diagnóstico gratis')
    return
  }

  if (action === 'servicios') {
    sendMessage('¿Qué servicios ofrecen?')
    return
  }

  if (action === 'precios') {
    sendMessage('¿Cuánto cuesta?')
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

async function scrollDown() {
  await nextTick()
  if (chatBody.value) {
    chatBody.value.scrollTop = chatBody.value.scrollHeight
  }
}

watch(isOpen, async (open) => {
  if (!open) return

  trackEvent('chat_open', { location: 'chat_widget' })

  if (messages.value.length === 0) {
    messages.value.push({
      role: 'agent',
      text: 'Hola, soy Lía, tu asesora de Agenc-IA. Te ayudo a automatizar WhatsApp, Instagram y Facebook con IA personalizada. ¿Qué canal quieres mejorar primero?'
    })
  }

  await nextTick()
  scrollDown()
  inputRef.value?.focus()
})

onMounted(() => {
  syncViewportHeight()
  window.addEventListener('resize', syncViewportHeight)
  window.visualViewport?.addEventListener('resize', syncViewportHeight)
  window.visualViewport?.addEventListener('scroll', syncViewportHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', syncViewportHeight)
  window.visualViewport?.removeEventListener('resize', syncViewportHeight)
  window.visualViewport?.removeEventListener('scroll', syncViewportHeight)
  document.documentElement.style.removeProperty('--chat-viewport-height')
})
</script>

<template>
  <div class="chat-widget" :class="{ open: isOpen }">
    <button class="chat-widget__btn" @click="toggle" :aria-label="isOpen ? 'Cerrar chat' : 'Abrir chat'">
      <template v-if="!isOpen">
        <IconInline name="MessageCircle" :size="22" />
      </template>
      <template v-else>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </template>
    </button>

    <Transition name="chat-panel">
      <div v-if="isOpen" class="chat-widget__panel">
        <div class="chat-widget__header">
          <div class="chat-widget__avatar">
            <img src="/logo.svg" alt="Agenc-IA" style="height:20px" />
          </div>
          <div>
            <strong>Lía</strong>
            <small>Asesora Agenc-IA · En línea ahora</small>
          </div>
        </div>

        <div ref="chatBody" class="chat-widget__body">
          <div
            v-for="(msg, i) in messages"
            :key="i"
            class="chat-msg"
            :class="'chat-msg--' + msg.role"
          >
            <div class="chat-msg__bubble" v-html="formatText(msg.text)"></div>
          </div>

          <div v-if="isTyping" class="chat-msg chat-msg--agent">
            <div class="chat-msg__bubble typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <div v-if="messages.length <= 1" class="chat-widget__actions">
          <button
            v-for="qa in quickActions"
            :key="qa.action"
            class="chat-action-btn"
            @click="handleAction(qa.action)"
          >
            {{ qa.label }}
          </button>
        </div>

        <div v-if="isLimitReached" class="chat-widget__limit">
          Has alcanzado el límite de mensajes. <a href="https://www.agenciadia.tech/#/contacto" target="_blank">Déjanos tu email para continuar.</a>
        </div>
        <div v-else class="chat-widget__input">
          <input
            ref="inputRef"
            v-model="input"
            type="text"
            placeholder="Escribe tu mensaje..."
            @keydown="handleKeydown"
          />
          <button class="chat-send-btn" @click="sendMessage()" :disabled="!input.trim()">
            <IconInline name="Send" :size="16" />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
function formatText(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')

  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
}

export default {}
</script>

<style scoped>
.chat-widget { position: fixed; bottom: calc(24px + env(safe-area-inset-bottom)); right: 24px; z-index: 50; font-family: var(--font-body); }

.chat-widget__btn {
  width: 60px; height: 60px; border-radius: 50%; border: none;
  background: var(--gradient-neon); color: white; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: var(--glow-blue);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: neonPulse 2.5s ease-in-out infinite;
}
.chat-widget__btn:hover { transform: scale(1.1); box-shadow: var(--glow-blue-strong); }
.chat-widget.open .chat-widget__btn { animation: none; }
@keyframes neonPulse { 0%, 100% { box-shadow: var(--glow-blue); } 50% { box-shadow: var(--glow-blue-strong); } }

.chat-widget__panel {
  position: absolute; bottom: 72px; right: 0; width: min(460px, calc(100vw - 32px));
  height: min(520px, calc(var(--chat-viewport-height, 100vh) - 120px));
  background: #0F1629; border-radius: var(--radius-lg);
  box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,212,255,0.2);
  display: flex; flex-direction: column; overflow: hidden;
}

.chat-widget__header {
  padding: 14px 16px; background: #0A0E1A; border-bottom: 1px solid rgba(0,212,255,0.2);
  display: flex; align-items: center; gap: 10px;
  strong { font-size: 0.9rem; color: #F8FAFC; display: block; }
  small { font-size: 0.72rem; color: #94A3B8; }
}
.chat-widget__avatar {
  width: 36px; height: 36px; border-radius: var(--radius); background: linear-gradient(135deg, #00D4FF, #8B5CF6);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}

.chat-widget__body {
  flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px;
  background: #0F1629;
}
.chat-widget__body::-webkit-scrollbar { width: 4px; }
.chat-widget__body::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.3); border-radius: 4px; }

.chat-msg { display: flex; }
.chat-msg--user { justify-content: flex-end; }
.chat-msg__bubble {
  max-width: 85%; padding: 10px 14px; border-radius: 14px; font-size: 0.84rem; line-height: 1.5;
  white-space: pre-wrap; word-break: break-word;
  :deep(strong) { font-weight: 700; }
}
.chat-msg--agent .chat-msg__bubble { background: #1A2340; color: #F8FAFC; border-top-left-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.3); }
.chat-msg--user .chat-msg__bubble { background: linear-gradient(135deg, #00D4FF, #8B5CF6); color: white; border-top-right-radius: 4px; }
.chat-msg--system .chat-msg__bubble { background: transparent; color: #94A3B8; font-size: 0.78rem; text-align: center; max-width: 100%; }

.chat-msg__bubble.typing {
  display: flex; gap: 4px; padding: 12px 16px;
  span { width: 7px; height: 7px; border-radius: 50%; background: #00D4FF; animation: bounce 1.4s ease-in-out infinite;
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
}
@keyframes bounce { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }

.chat-widget__actions {
  display: flex; flex-wrap: wrap; gap: 6px; padding: 10px 16px; border-top: 1px solid rgba(0,212,255,0.2); background: #0A0E1A;
}
.chat-action-btn {
  max-width: 100%; overflow-wrap: anywhere;
  padding: 6px 12px; font-size: 0.76rem; border: 1px solid rgba(0,212,255,0.3); border-radius: 20px;
  background: rgba(0,212,255,0.1); color: #00D4FF; cursor: pointer; transition: all 0.15s;
  &:hover { border-color: #00D4FF; background: rgba(0,212,255,0.2); }
}

.chat-widget__input {
  display: flex; gap: 8px; padding: 10px 14px; border-top: 1px solid rgba(0,212,255,0.2); background: #0A0E1A;
  input {
    flex: 1; border: 1px solid rgba(0,212,255,0.3); border-radius: 20px; padding: 10px 14px;
    font-size: 0.84rem; background: #1A2340; color: #F8FAFC; outline: none;
    &:focus { border-color: #00D4FF; }
    &::placeholder { color: #94A3B8; }
  }
}
.chat-widget__limit {
  padding: 14px; text-align: center; font-size: 0.82rem; color: #94A3B8;
  border-top: 1px solid rgba(0,212,255,0.2); background: #0A0E1A;
  a { color: #00D4FF; text-decoration: underline; }
}

.chat-send-btn {
  width: 38px; height: 38px; border-radius: 50%; border: none; background: linear-gradient(135deg, #00D4FF, #8B5CF6); color: white;
  cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  transition: opacity 0.15s;
  &:disabled { opacity: 0.4; cursor: default; }
}

.chat-panel-enter-active { transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); }
.chat-panel-leave-active { transition: all 0.2s ease-in; }
.chat-panel-enter-from { opacity: 0; transform: translateY(20px) scale(0.95); }
.chat-panel-leave-to { opacity: 0; transform: translateY(10px) scale(0.97); }

@media (max-width: 480px) {
  .chat-widget { right: 16px; bottom: calc(16px + env(safe-area-inset-bottom)); }
  .chat-widget__panel {
    position: fixed; right: 16px; bottom: calc(80px + env(safe-area-inset-bottom));
    height: min(460px, calc(var(--chat-viewport-height, 100vh) - 104px));
  }
  .chat-widget__actions { padding: 10px 12px; }
  .chat-action-btn { flex: 1 1 calc(50% - 6px); padding-inline: 8px; }
}
</style>
