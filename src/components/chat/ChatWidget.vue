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
  { label: 'Â¿QuÃ© servicios ofrecen?', action: 'servicios' },
  { label: 'Â¿CuÃ¡nto cuesta?', action: 'precios' },
  { label: 'Quiero un diagnÃ³stico', action: 'diagnostico' },
  { label: 'Hablar por WhatsApp', action: 'whatsapp' }
]

function getResponse(msg: string): string {
  const q = msg.toLowerCase()
  if (q.includes('servicio') || q.includes('ofrecen') || q.includes('hacen'))
    return 'ðŸ”§ Ofrecemos 15 agentes IA para PYMES:\n\nðŸ“± **Ventas:** WhatsApp, Instagram DMs, Funnel Meta completo\nðŸ’¬ **AtenciÃ³n:** Soporte 24/7, Moderador de comunidad\nðŸ›’ **E-commerce:** CatÃ¡logo WhatsApp + pedidos\nðŸ“Š **AutomatizaciÃ³n:** n8n + CRM, Web funnel, Agendamiento, Dashboard\nðŸ’¡ **ConsultorÃ­a:** Documental, Roadmap IA\n\nÂ¿QuerÃ©s que te cuente de alguno en detalle?'
  if (q.includes('precio') || q.includes('cuesta') || q.includes('costo') || q.includes('plan') || q.includes('vale'))
    return 'ðŸ’° Tenemos 3 planes:\n\nâ­ **Starter** â€” $390.000/mes (1 canal, 500 conv/mes)\nðŸš€ **Growth** â€” $690.000/mes (todos los canales + Meta Ads)\nðŸ¢ **Pro** â€” $1.200.000/mes (todo incluido + personalizaciÃ³n)\n\nSetup Ãºnico desde $900.000. DiagnÃ³stico SIN COSTO.\n\nÂ¿QuerÃ©s que agendemos una llamada de 20 min?'
  if (q.includes('diagnÃ³stico') || q.includes('diagnostico') || q.includes('agendar') || q.includes('contacto') || q.includes('hablar') || q.includes('llamada'))
    return 'âœ… Â¡Perfecto! Dejame tus datos y te contacto:\n\nðŸ“ Nombre:\nðŸ“± WhatsApp:\nðŸ“§ Email:\nðŸ¢ Tipo de negocio:\n\nO si preferÃ­s, agendÃ¡ vos mismo: https://agenc-ia-topaz.vercel.app/#/contacto'
  if (q.includes('cÃ³mo funciona') || q.includes('como funciona') || q.includes('funciona') || q.includes('proceso'))
    return 'âš™ï¸ AsÃ­ trabajamos:\n\n1ï¸âƒ£ **DiagnÃ³stico** â€” Identificamos el canal de mayor impacto\n2ï¸âƒ£ **Blueprint** â€” DiseÃ±amos guion, integraciones y reglas\n3ï¸âƒ£ **Build** â€” Construimos el agente y flujos n8n\n4ï¸âƒ£ **Prueba** â€” Simulamos casos reales antes de lanzar\n5ï¸âƒ£ **OperaciÃ³n** â€” Monitoreamos y mejoramos cada mes\n\nâ±ï¸ Tiempo: 5-15 dÃ­as segÃºn complejidad.'
  if (q.includes('whatsapp') || q.includes('humano'))
    return 'ðŸ“± Claro, hablÃ¡ con nosotros directamente por WhatsApp:\n\nðŸ‘‰ https://wa.me/573012604061\n\nO dejame tus datos y te escribimos nosotros.'
  if (q.includes('hola') || q.includes('buenas') || q.includes('buenos'))
    return 'Â¡Hola! ðŸ‘‹ Soy LÃ­a, tu asesora de Agenc-IA. Estoy aquÃ­ para ayudarte a descubrir cÃ³mo la inteligencia artificial puede transformar tu negocio. Â¿En quÃ© te puedo ayudar?'
  if (q.includes('quiÃ©nes') || q.includes('quienes') || q.includes('son') || q.includes('agenc') || q.includes('nosotros'))
    return 'ðŸ§  Â¡Con gusto te cuento! **Agenc-IA** somos una agencia colombiana especializada en automatizaciÃ³n conversacional para PYMES.\n\nCreamos agentes IA que venden, atienden y hacen crecer tu negocio en WhatsApp, Instagram y Facebook, sin que necesites contratar mÃ¡s equipo. ðŸš€\n\nðŸ“ Colombia | âœ‰ï¸ leinadgalaxy@gmail.com\n\nÂ¿QuerÃ©s saber cÃ³mo podrÃ­amos ayudar a tu negocio especÃ­fico?'
  return 'Gracias por tu mensaje. Para darte la mejor respuesta, Â¿podrÃ­as contarme un poco mÃ¡s sobre tu negocio y quÃ© te gustarÃ­a automatizar? O si preferÃ­s, te paso con un humano por WhatsApp ðŸ‘‰ https://wa.me/573012604061'
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
    sendSystem('ðŸ“± Abriendo WhatsApp...')
    return
  }

  if (action === 'diagnostico') {
    sendMessage('Quiero un diagnÃ³stico gratis')
    return
  }

  if (action === 'servicios') {
    sendMessage('Â¿QuÃ© servicios ofrecen?')
    return
  }

  if (action === 'precios') {
    sendMessage('Â¿CuÃ¡nto cuesta?')
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
      text: 'Â¡Hola! ðŸ‘‹ Soy LÃ­a, tu asesora de Agenc-IA. Estoy aquÃ­ para ayudarte a descubrir cÃ³mo la inteligencia artificial puede transformar tu negocio. Â¿En quÃ© te puedo ayudar?'
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
            <strong>LÃ­a</strong>
            <small>Asesora Agenc-IA Â· En lÃ­nea ahora</small>
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
          Has alcanzado el lÃ­mite de mensajes. <a href="https://agenc-ia-topaz.vercel.app/#/contacto" target="_blank">DÃ©janos tu email para continuar.</a>
        </div>
        <div v-else class="chat-widget__input">
          <input
            ref="inputRef"
            v-model="input"
            type="text"
            placeholder="EscribÃ­ tu mensaje..."
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
.chat-widget { position: fixed; bottom: calc(24px + env(safe-area-inset-bottom)); right: 24px; z-index: 50; font-family: var(--font-sans); }

.chat-widget__btn {
  width: 56px; height: 56px; border-radius: 50%; border: none;
  background: var(--accent-amber); color: white; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 24px rgba(212,144,11,0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: pulse-glow 2.5s ease-in-out infinite;
}
.chat-widget__btn:hover { transform: scale(1.08); box-shadow: 0 6px 32px rgba(212,144,11,0.45); }
.chat-widget.open .chat-widget__btn { animation: none; }
@keyframes pulse-glow { 0%, 100% { box-shadow: 0 4px 24px rgba(212,144,11,0.35); } 50% { box-shadow: 0 4px 36px rgba(212,144,11,0.55); } }

.chat-widget__panel {
  position: absolute; bottom: 72px; right: 0; width: min(460px, calc(100vw - 32px));
  height: min(520px, calc(var(--chat-viewport-height, 100vh) - 120px));
  background: var(--bg-surface); border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg), 0 0 0 1px var(--border-light);
  display: flex; flex-direction: column; overflow: hidden;
}

.chat-widget__header {
  padding: 14px 16px; background: var(--bg-primary); border-bottom: 1px solid var(--border-light);
  display: flex; align-items: center; gap: 10px;
  strong { font-size: 0.9rem; color: var(--text-primary); display: block; }
  small { font-size: 0.72rem; color: var(--text-muted); }
}
.chat-widget__avatar {
  width: 36px; height: 36px; border-radius: var(--radius); background: var(--bg-secondary);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}

.chat-widget__body {
  flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px;
  background: #F5F0E9;
}
.chat-widget__body::-webkit-scrollbar { width: 4px; }
.chat-widget__body::-webkit-scrollbar-thumb { background: var(--border-medium); border-radius: 4px; }

.chat-msg { display: flex; }
.chat-msg--user { justify-content: flex-end; }
.chat-msg__bubble {
  max-width: 85%; padding: 10px 14px; border-radius: 14px; font-size: 0.84rem; line-height: 1.5;
  white-space: pre-wrap; word-break: break-word;
  :deep(strong) { font-weight: 700; }
}
.chat-msg--agent .chat-msg__bubble { background: var(--bg-surface); color: var(--text-primary); border-top-left-radius: 4px; box-shadow: var(--shadow-sm); }
.chat-msg--user .chat-msg__bubble { background: var(--accent-amber); color: white; border-top-right-radius: 4px; }
.chat-msg--system .chat-msg__bubble { background: transparent; color: var(--text-muted); font-size: 0.78rem; text-align: center; max-width: 100%; }

.chat-msg__bubble.typing {
  display: flex; gap: 4px; padding: 12px 16px;
  span { width: 7px; height: 7px; border-radius: 50%; background: var(--text-muted); animation: bounce 1.4s ease-in-out infinite;
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
}
@keyframes bounce { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }

.chat-widget__actions {
  display: flex; flex-wrap: wrap; gap: 6px; padding: 10px 16px; border-top: 1px solid var(--border-light); background: var(--bg-primary);
}
.chat-action-btn {
  max-width: 100%; overflow-wrap: anywhere;
  padding: 6px 12px; font-size: 0.76rem; border: 1px solid var(--border-light); border-radius: 20px;
  background: var(--bg-surface); color: var(--text-secondary); cursor: pointer; transition: all 0.15s;
  &:hover { border-color: var(--accent-amber); color: var(--accent-amber); }
}

.chat-widget__input {
  display: flex; gap: 8px; padding: 10px 14px; border-top: 1px solid var(--border-light); background: var(--bg-primary);
  input {
    flex: 1; border: 1px solid var(--border-light); border-radius: 20px; padding: 10px 14px;
    font-size: 0.84rem; background: var(--bg-surface); color: var(--text-primary); outline: none;
    &:focus { border-color: var(--accent-amber); }
    &::placeholder { color: var(--text-muted); }
  }
}
.chat-widget__limit {
  padding: 14px; text-align: center; font-size: 0.82rem; color: var(--text-muted);
  border-top: 1px solid var(--border-light); background: var(--bg-primary);
  a { color: var(--accent-amber); text-decoration: underline; }
}

.chat-send-btn {
  width: 38px; height: 38px; border-radius: 50%; border: none; background: var(--accent-amber); color: white;
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
