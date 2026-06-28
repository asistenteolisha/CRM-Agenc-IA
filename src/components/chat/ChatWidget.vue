<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import IconInline from '../IconInline.vue'

// ── Types ──────────────────────────────────────
interface ChatMessage {
  role: 'agent' | 'user' | 'system'
  text: string
}

interface QuickAction { label: string; action: string }

// ── State ──────────────────────────────────────
const isOpen = ref(false)
const messages = ref<ChatMessage[]>([])
const input = ref('')
const chatBody = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const isTyping = ref(false)

// ── Rate limiting ────────────────────────────
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
  { label: 'Hablar por WhatsApp', action: 'whatsapp' },
]

// ── Knowledge base ─────────────────────────────
function getResponse(msg: string): string {
  const q = msg.toLowerCase()
  if (q.includes('servicio') || q.includes('ofrecen') || q.includes('hacen'))
    return '🔧 Ofrecemos 15 agentes IA para PYMES:\n\n📱 **Ventas:** WhatsApp, Instagram DMs, Funnel Meta completo\n💬 **Atención:** Soporte 24/7, Moderador de comunidad\n🛒 **E-commerce:** Catálogo WhatsApp + pedidos\n📊 **Automatización:** n8n + CRM, Web funnel, Agendamiento, Dashboard\n💡 **Consultoría:** Documental, Roadmap IA\n\n¿Querés que te cuente de alguno en detalle?'
  if (q.includes('precio') || q.includes('cuesta') || q.includes('costo') || q.includes('plan') || q.includes('vale'))
    return '💰 Tenemos 3 planes:\n\n⭐ **Starter** — $390.000/mes (1 canal, 500 conv/mes)\n🚀 **Growth** — $690.000/mes (todos los canales + Meta Ads)\n🏢 **Pro** — $1.200.000/mes (todo incluido + personalización)\n\nSetup único desde $900.000. Diagnóstico SIN COSTO.\n\n¿Querés que agendemos una llamada de 20 min?'
  if (q.includes('diagnóstico') || q.includes('diagnostico') || q.includes('agendar') || q.includes('contacto') || q.includes('hablar') || q.includes('llamada'))
    return '✅ ¡Perfecto! Dejame tus datos y te contacto:\n\n📝 Nombre:\n📱 WhatsApp:\n📧 Email:\n🏢 Tipo de negocio:\n\nO si preferís, agendá vos mismo: https://agenc-ia-topaz.vercel.app/#/contacto'
  if (q.includes('cómo funciona') || q.includes('como funciona') || q.includes('funciona') || q.includes('proceso'))
    return '⚙️ Así trabajamos:\n\n1️⃣ **Diagnóstico** — Identificamos el canal de mayor impacto\n2️⃣ **Blueprint** — Diseñamos guion, integraciones y reglas\n3️⃣ **Build** — Construimos el agente y flujos n8n\n4️⃣ **Prueba** — Simulamos casos reales antes de lanzar\n5️⃣ **Operación** — Monitoreamos y mejoramos cada mes\n\n⏱️ Tiempo: 5-15 días según complejidad.'
  if (q.includes('whatsapp') || q.includes('humano'))
    return '📱 Claro, hablá con nosotros directamente por WhatsApp:\n\n👉 https://wa.me/573012604061\n\nO dejame tus datos y te escribimos nosotros.'
  if (q.includes('hola') || q.includes('buenas') || q.includes('buenos'))
    return '¡Hola! 👋 Soy el asistente IA de **Agenc-IA**. Puedo ayudarte con:\n\n• Nuestros servicios y precios\n• Cómo funciona todo\n• Agendar un diagnóstico gratis\n\n¿En qué te puedo ayudar?'
  if (q.includes('quiénes') || q.includes('quienes') || q.includes('son') || q.includes('agenc') || q.includes('nosotros'))
    return '🧠 **Agenc-IA** es una agencia colombiana de automatización conversacional para PYMES.\n\nConstruimos agentes IA que venden, atienden y crecen con tu negocio en WhatsApp, Instagram y Facebook. Sin contratar más equipo.\n\n📍 Colombia | ✉️ leinadgalaxy@gmail.com'
  // fallback
  return 'Gracias por tu mensaje. Para darte la mejor respuesta, ¿podrías contarme un poco más sobre tu negocio y qué te gustaría automatizar? O si preferís, te paso con un humano por WhatsApp 👉 https://wa.me/573012604061'
}

// ── Methods ────────────────────────────────────
function toggle() { isOpen.value = !isOpen.value }

function sendSystem(text: string) {
  messages.value.push({ role: 'system', text })
}

async function fetchAgentReply(message: string): Promise<string | null> {
  try {
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
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

  // Try AI agent first
  const agentReply = await fetchAgentReply(msg)
  isTyping.value = false

  if (agentReply) {
    messages.value.push({ role: 'agent', text: agentReply })
  } else {
    // Fallback to keyword matching
    const response = getResponse(msg)
    messages.value.push({ role: 'agent', text: response })
  }
  scrollDown()
}

function handleAction(action: string) {
  if (action === 'whatsapp') {
    window.open('https://wa.me/573012604061', '_blank')
    sendSystem('📱 Abriendo WhatsApp...')
  } else if (action === 'diagnostico') {
    sendMessage('Quiero un diagnóstico gratis')
  } else if (action === 'servicios') {
    sendMessage('¿Qué servicios ofrecen?')
  } else if (action === 'precios') {
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
  if (open) {
    if (messages.value.length === 0) {
      messages.value.push({
        role: 'agent',
        text: '¡Hola! 👋 Soy el asistente de **Agenc-IA**. Sé todo sobre nuestros agentes, precios y cómo podemos ayudarte.\n\n¿En qué te puedo ayudar?'
      })
    }
    await nextTick()
    scrollDown()
    inputRef.value?.focus()
  }
})
</script>

<template>
  <div class="chat-widget" :class="{ open: isOpen }">
    <!-- Floating button -->
    <button class="chat-widget__btn" @click="toggle" :aria-label="isOpen ? 'Cerrar chat' : 'Abrir chat'">
      <template v-if="!isOpen">
        <IconInline name="MessageCircle" :size="22" />
      </template>
      <template v-else>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </template>
    </button>

    <!-- Chat panel -->
    <Transition name="chat-panel">
      <div v-if="isOpen" class="chat-widget__panel">
        <div class="chat-widget__header">
          <div class="chat-widget__avatar">
            <img src="/logo.svg" alt="Agenc-IA" style="height:20px" />
          </div>
          <div>
            <strong>Agenc-IA</strong>
            <small>Asistente IA · Responde en segundos</small>
          </div>
        </div>

        <div class="chat-widget__body" ref="chatBody">
          <div v-for="(msg, i) in messages" :key="i"
               class="chat-msg" :class="'chat-msg--' + msg.role">
            <div class="chat-msg__bubble" v-html="formatText(msg.text)"></div>
          </div>

          <div v-if="isTyping" class="chat-msg chat-msg--agent">
            <div class="chat-msg__bubble typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>

        <!-- Quick actions -->
        <div v-if="messages.length <= 1" class="chat-widget__actions">
          <button v-for="qa in quickActions" :key="qa.action"
                  class="chat-action-btn" @click="handleAction(qa.action)">
            {{ qa.label }}
          </button>
        </div>

        <div v-if="isLimitReached" class="chat-widget__limit">
          Has alcanzado el límite de mensajes. <a href="https://agenc-ia-topaz.vercel.app/#/contacto" target="_blank">Déjanos tu email para continuar.</a>
        </div>
        <div v-else class="chat-widget__input">
          <input ref="inputRef" v-model="input" type="text"
                 placeholder="Escribí tu mensaje..."
                 @keydown="handleKeydown" />
          <button class="chat-send-btn" @click="sendMessage()" :disabled="!input.trim()">
            <IconInline name="Send" :size="16" />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
// Simple markdown-like formatter (inline, no dependency)
function formatText(text: string): string {
  // Escape HTML entities BEFORE markdown conversion to prevent XSS
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
.chat-widget { position: fixed; bottom: 24px; right: 24px; z-index: 50; font-family: var(--font-sans); }

/* ── Floating button ─────────────────────────── */
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

/* ── Panel ───────────────────────────────────── */
.chat-widget__panel {
  position: absolute; bottom: 72px; right: 0; width: 360px; max-width: calc(100vw - 48px);
  height: 520px; max-height: calc(100vh - 120px);
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

/* ── Messages ────────────────────────────────── */
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

/* ── Quick actions ───────────────────────────── */
.chat-widget__actions {
  display: flex; flex-wrap: wrap; gap: 6px; padding: 10px 16px; border-top: 1px solid var(--border-light); background: var(--bg-primary);
}
.chat-action-btn {
  padding: 6px 12px; font-size: 0.76rem; border: 1px solid var(--border-light); border-radius: 20px;
  background: var(--bg-surface); color: var(--text-secondary); cursor: pointer; transition: all 0.15s;
  &:hover { border-color: var(--accent-amber); color: var(--accent-amber); }
}

/* ── Input ───────────────────────────────────── */
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

/* ── Panel transitions ───────────────────────── */
.chat-panel-enter-active { transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); }
.chat-panel-leave-active { transition: all 0.2s ease-in; }
.chat-panel-enter-from { opacity: 0; transform: translateY(20px) scale(0.95); }
.chat-panel-leave-to { opacity: 0; transform: translateY(10px) scale(0.97); }

@media (max-width: 480px) {
  .chat-widget__panel { width: calc(100vw - 32px); right: -8px; height: 460px; }
  .chat-widget { right: 12px; bottom: 16px; }
}
</style>
