# COORDINATION CONTEXT — Chat Bot Widget + Web Improvements for Codex GPT-5.5

## Current State
Web multi-página desplegada en https://agenc-ia-topaz.vercel.app
6 páginas: Home, Servicios, Casos, Precios, Nosotros, Contacto
Stack: Vue 3 + Vite + GSAP + SCSS + Vue Router
Paleta crema #FBF7F0 + ámbar #D4900B + teal #0D9488
Logo SVG profesional, iconos Lucide, hero con word stagger, mockup de WhatsApp

## What Daniel Wants
1. **CHATBOT PROPIO en la web** — Un widget de chat flotante (esquina inferior derecha) que:
   - Use IA para responder preguntas sobre servicios, precios, nosotros
   - Sea nuestro propio agente de ventas para Agenc-IA
   - Pueda capturar leads (nombre, teléfono, email, necesidad)
   - También conecte con WhatsApp como fallback
   - Tenga diseño personalizado que combine con la paleta crema
   - Solo responda sobre la agencia, no se vaya por las ramas

2. **Mejoras al Hero** — Hacerlo más impactante visualmente
3. **Más profesionalismo** en toda la web

## Our Technical Capabilities (IMPORTANT)
Ya tenemos operativo:
- WhatsApp Business API (WABA activa, token permanente)
- Hermes Agent (nuestro cerebro de agentes)
- n8n (orquestador con webhooks)
- Meta Business Suite completo
- El bot ya está al 99%, solo falta el primer cliente

## Chatbot Research (done by Hermes)
Best options analyzed:
- **Chatbase.co**: SaaS, 10k+ businesses, whitelabel, but paid ($99+/mo)
- **Intercom Fin**: Enterprise, embeddable but very expensive
- **ElevenLabs convai**: Voice/text widget, SDK open source, but focuses on voice
- **Vapi**: Embeddable with CDN, but focused on voice
- **Build custom**: Vue component that connects to our own Hermes/n8n backend

## TASK FOR CODEX
Create a plan (CHATBOT-PLAN.md) with:

1. **Chat Widget Architecture** — How to build it as a Vue 3 component. Options:
   - Option A: Pure Vue component with pre-scripted FAQ + WhatsApp fallback
   - Option B: Vue component that connects to our n8n webhook → Hermes Agent → response
   - Option C: Embed a third-party solution (Chatbase, etc.)
   RECOMMEND the best option and explain why.

2. **Chat Widget Design** — Floating button (bottom-right), expands into chat panel, matches our palette:
   - Floating button: ámbar circle with chat icon, pulsating glow
   - Chat panel: white card with shadow, header "Agenc-IA | Asistente IA", crema background
   - Messages: bubbles styled like WhatsApp (client right green, agent left white)
   - Quick actions: "Ver servicios", "Ver precios", "Hablar con humano"
   - Input field with send button

3. **Widget Behavior**:
   - Opens with greeting message
   - Shows FAQ suggestions (buttons to click)
   - Free text works too → sends to n8n/Hermes
   - Collects lead info when intent detected
   - Offers WhatsApp handoff

4. **Hero Improvements**:
   - Current hero is a 2-column layout (text left, WhatsApp mockup right)
   - Ideas: product screenshot real of bot in action, animated gradient, trust badges
   - Specific code suggestions for Vue template and GSAP

5. **Website Polish**:
   - Social proof section (logos de clientes/partners — aunque sean "coming soon")
   - "Cómo funciona" visual timeline
   - Mejores CTAs a lo largo de la web

6. **Implementation Priority** — What to build first.

Write CHATBOT-PLAN.md in the repo root. Be specific with Vue code, component props, v-model, events. In Spanish.
