# CHATBOT-PLAN — Widget de Agente IA para Agenc-IA

## Arquitectura: Opción B (Recomendada)

**Vue component → n8n webhook → Hermes Agent → respuesta → widget**

Por qué:
- Ya tenemos Hermes, n8n, WhatsApp API corriendo
- No pagar SaaS externo (Chatbase $99/mes)
- Control total del diseño y comportamiento
- El mismo backend que usamos para clientes, aplicado a nosotros ("dogfooding")
- Si funciona para nosotros, es nuestra mejor carta de presentación

### Arquitectura técnica:
```
Usuario escribe en widget
  → POST /api/chat (Vercel serverless)
  → n8n webhook
  → Hermes Agent procesa (con contexto de servicios, precios, FAQ)
  → Respuesta devuelta al widget
  → Si el usuario quiere contacto humano → WhatsApp link
```

### Componentes:
1. `ChatWidget.vue` — El botón flotante + panel de chat
2. `ChatWidgetButton.vue` — Botón flotante con glow
3. `ChatMessage.vue` — Burbuja de mensaje individual
4. `ChatQuickActions.vue` — Botones de acción rápida
5. `api/chat.js` — Endpoint serverless que proxy a n8n

---

## Implementación Inmediata (Fase 1: Widget offline con FAQ)
Antes de conectar Hermes, construimos el widget con respuestas predefinidas.
Esto nos permite lanzar YA y luego conectar el backend.

## Quick actions predefinidas:
- "¿Qué servicios ofrecen?"
- "¿Cuánto cuesta?"
- "¿Cómo funciona?"
- "Quiero un diagnóstico gratis"
- "Hablar por WhatsApp"

## Respuestas predefinidas (sin Hermes):
- servicios → lista de 15 servicios con precios
- precios → 3 planes en COP
- diagnóstico → pide nombre, teléfono, email → envía a n8n lead webhook
- WhatsApp → abre wa.me link
- default → "No entiendo. ¿Querés hablar con un humano por WhatsApp?"
