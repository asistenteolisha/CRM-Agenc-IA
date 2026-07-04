<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import IconInline from '../IconInline.vue'
import { trackEvent } from '../../utils/analytics'

defineProps<{
  heroBadge: string
  heroTitle: string
  heroLead: string
  primaryCta: string
  secondaryCta: string
}>()

function trackHeroCta(label: string) {
  trackEvent('cta_click', { location: 'hero', label })
}

const heroRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!heroRef.value) return

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.from('.hero__badge', { y: 20, opacity: 0, duration: 0.6 })
    .from('.hero__title', { y: 40, opacity: 0, duration: 0.8 }, '-=0.3')
    .from('.hero__lead', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    .from('.hero__actions', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
    .from('.trust-item', { y: 15, opacity: 0, duration: 0.4, stagger: 0.1 }, '-=0.2')
    .from('.phone-mockup', { y: 60, opacity: 0, scale: 0.9, duration: 1, ease: 'back.out(1.3)' }, '-=0.6')
    .from('.msg', { y: 20, opacity: 0, duration: 0.4, stagger: 0.15 }, '-=0.5')
    .from('.floating-badge', { scale: 0, opacity: 0, duration: 0.5, stagger: 0.2, ease: 'back.out(2)' }, '-=0.3')
})
</script>

<template>
  <section ref="heroRef" class="hero">
    <!-- Background glow effects -->
    <div class="hero__glow hero__glow--1"></div>
    <div class="hero__glow hero__glow--2"></div>

    <div class="hero__inner">
      <div class="hero__copy">
        <p class="hero__badge">
          <span class="badge-dot"></span>
          {{ heroBadge }}
        </p>
        <h1 class="hero__title">
          Agentes IA que<br />
          <span class="gradient-text">venden por ti 24/7</span>
        </h1>
        <p class="hero__lead">{{ heroLead }}</p>
        <div class="hero__actions">
          <RouterLink to="/contacto" class="btn btn--primary" @click="trackHeroCta(primaryCta)">
            {{ primaryCta }} <IconInline name="Send" :size="16" />
          </RouterLink>
          <RouterLink to="/precios" class="btn btn--secondary" @click="trackHeroCta(secondaryCta)">
            {{ secondaryCta }}
          </RouterLink>
        </div>
        <div class="hero__trust">
          <div class="trust-item">
            <IconInline name="Check" :size="14" class="trust-check" />
            <span><strong>WhatsApp</strong> canal conectado</span>
          </div>
          <div class="trust-item">
            <IconInline name="Check" :size="14" class="trust-check" />
            <span><strong>CRM</strong> leads organizados</span>
          </div>
          <div class="trust-item">
            <IconInline name="Check" :size="14" class="trust-check" />
            <span><strong>Humano</strong> escalamiento</span>
          </div>
        </div>
      </div>

      <div class="hero__visual">
        <!-- Phone mockup -->
        <div class="phone-mockup">
          <div class="phone-notch"></div>
          <div class="phone-header">
            <div class="phone-header__left">
              <div class="phone-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/>
                  <path d="M18 13a6 6 0 0 1-12 0"/>
                  <circle cx="12" cy="8" r="2"/>
                </svg>
              </div>
              <div>
                <span class="phone-name">Lía - Agenc-IA</span>
                <span class="phone-status">en línea</span>
              </div>
            </div>
            <IconInline name="MoreVertical" :size="16" />
          </div>
          <div class="chat-messages">
            <div class="msg msg--client">
              <span class="msg__name">Cliente</span>
              Hola, busco un carro automático de hasta 45 millones
            </div>
            <div class="msg msg--agent">
              ¡Perfecto! Para ayudarte mejor: ¿ciudad, uso principal y necesitás financiación?
              <span class="msg__time">10:32 ✓✓</span>
            </div>
            <div class="msg msg--client">
              Bucaramanga, familiar, podría financiar una parte
            </div>
            <div class="msg msg--typing">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
            </div>
            <div class="msg msg--system">
              <IconInline name="Zap" :size="12" />
              Lead caliente → CRM
            </div>
          </div>
        </div>

        <!-- Floating badges -->
        <div class="floating-badge floating-badge--1">
          <IconInline name="TrendingUp" :size="16" />
          <span>+30% ventas</span>
        </div>
        <div class="floating-badge floating-badge--2">
          <IconInline name="Clock" :size="16" />
          <span>Respuesta 3s</span>
        </div>
        <div class="floating-badge floating-badge--3">
          <IconInline name="Star" :size="16" />
          <span>4.9 satisfacción</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Background glows */
.hero__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
  z-index: 0;
}

.hero__glow--1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(212,165,116,0.15) 0%, transparent 70%);
  top: -100px;
  right: -100px;
  animation: float 8s ease-in-out infinite;
}

.hero__glow--2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(232,196,160,0.1) 0%, transparent 70%);
  bottom: -50px;
  left: -100px;
  animation: float 10s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, -30px) scale(1.1); }
}

/* Phone mockup improvements */
.phone-mockup {
  background: var(--bg-secondary);
  border: 1px solid var(--border-gold);
  border-radius: 32px;
  padding: 12px;
  max-width: 380px;
  margin: 0 auto;
  box-shadow: 
    var(--shadow-lg),
    0 0 60px rgba(212,165,116,0.1),
    inset 0 0 30px rgba(212,165,116,0.05);
  position: relative;
  z-index: 2;
}

.phone-notch {
  width: 120px;
  height: 24px;
  background: var(--bg-primary);
  border-radius: 0 0 16px 16px;
  margin: 0 auto 12px;
}

.phone-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--bg-elevated);
  border-radius: 20px 20px 0 0;
  margin-bottom: 12px;
}

.phone-header__left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.phone-avatar {
  width: 36px;
  height: 36px;
  background: var(--gradient-gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-inverse);
}

.phone-avatar svg {
  width: 20px;
  height: 20px;
  stroke: var(--text-inverse);
}

.phone-name {
  display: block;
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.9rem;
}

.phone-status {
  font-size: 0.75rem;
  color: var(--success, #7FB069);
}

.chat-messages {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  background: var(--bg-surface);
  border-radius: 0 0 20px 20px;
  min-height: 280px;
}

.msg {
  padding: 12px 16px;
  border-radius: 16px;
  font-size: 0.88rem;
  max-width: 85%;
  animation: fadeInUp 0.5s ease forwards;
  opacity: 0;
  position: relative;
}

.msg__name {
  display: block;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--accent-gold);
  margin-bottom: 4px;
}

.msg__time {
  display: block;
  font-size: 0.65rem;
  color: var(--text-muted);
  text-align: right;
  margin-top: 4px;
}

.msg--client {
  background: var(--bg-elevated);
  color: var(--text-primary);
  align-self: flex-start;
  border-bottom-left-radius: 4px;
}

.msg--agent {
  background: linear-gradient(135deg, rgba(212,165,116,0.2), rgba(139,115,85,0.2));
  border: 1px solid var(--border-gold);
  color: var(--text-primary);
  align-self: flex-end;
  border-bottom-right-radius: 4px;
}

.msg--typing {
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
  background: var(--bg-elevated);
  align-self: flex-end;
  padding: 14px 20px;
  border-radius: 16px;
  border-bottom-right-radius: 4px;
}

.typing-dot {
  width: 8px;
  height: 8px;
  background: var(--accent-gold);
  border-radius: 50%;
  animation: typingBounce 1.4s infinite ease-in-out;
}

.typing-dot:nth-child(1) { animation-delay: 0s; }
.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes typingBounce {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}

.msg--system {
  background: rgba(127,176,105,0.15);
  border: 1px solid rgba(127,176,105,0.3);
  color: var(--success, #7FB069);
  align-self: center;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Floating badges */
.floating-badge {
  position: absolute;
  background: var(--bg-elevated);
  border: 1px solid var(--border-gold);
  border-radius: var(--radius-full);
  padding: 10px 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent-gold);
  box-shadow: var(--shadow-md);
  z-index: 3;
}

.floating-badge--1 {
  top: 20px;
  right: -20px;
  animation: floatBadge 6s ease-in-out infinite;
}

.floating-badge--2 {
  bottom: 80px;
  left: -30px;
  animation: floatBadge 8s ease-in-out infinite 1s;
}

.floating-badge--3 {
  bottom: 20px;
  right: -10px;
  animation: floatBadge 7s ease-in-out infinite 2s;
}

@keyframes floatBadge {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Gradient text */
.gradient-text {
  background: var(--gradient-gold);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Badge pulse */
.badge-dot {
  width: 8px;
  height: 8px;
  background: var(--accent-gold);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(212,165,116,0.4); }
  50% { opacity: 0.8; box-shadow: 0 0 0 8px rgba(212,165,116,0); }
}

/* Responsive */
@media (max-width: 980px) {
  .floating-badge { display: none; }
  .phone-mockup { max-width: 320px; }
}
</style>
