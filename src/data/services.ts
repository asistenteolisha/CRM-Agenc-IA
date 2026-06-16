import type { Service } from './content'

export const services: Service[] = [
  // ─── VENTAS ───────────────────────────────────────
  {
    id: 'whatsapp-sales-agent',
    category: 'ventas',
    title: 'Agente de ventas por WhatsApp',
    short:
      'Califica leads en segundos y avisa al vendedor cuando hay oportunidad real de cierre.',
    outcome:
      'Menos leads perdidos y más conversaciones listas para cerrar.',
    channels: ['whatsapp', 'crm', 'n8n'],
    metaCapabilities: [
      'Botones rápidos',
      'Listas interactivas',
      'Templates HSM',
      'Webhooks en tiempo real',
      'Estados de lectura y entrega'
    ],
    deliverables: [
      'Guion conversacional por negocio',
      'Flujo de calificación (presupuesto, urgencia, ubicación)',
      'Registro automático en CRM u hoja de cálculo',
      'Resumen de lead con puntaje',
      'Secuencia de seguimiento automatizada'
    ],
    startingAt: '$690.000 COP/mes'
  },
  {
    id: 'instagram-dm-agent',
    category: 'ventas',
    title: 'Agente de Instagram DMs',
    short:
      'Responde DMs y stories con información útil, captura datos y deriva a WhatsApp cuando hay intención real de compra.',
    outcome:
      'Cada mensaje de Instagram recibe respuesta útil en menos de un minuto.',
    channels: ['instagram', 'whatsapp', 'crm'],
    metaCapabilities: [
      'DMs',
      'Story replies',
      'Multimedia',
      'Webhooks'
    ],
    deliverables: [
      'Script de respuestas por tipo de consulta',
      'Clasificación de intención',
      'Derivación a WhatsApp con contexto',
      'Reporte semanal de consultas frecuentes'
    ],
    startingAt: '$550.000 COP/mes'
  },
  {
    id: 'facebook-lead-ad-funnel',
    category: 'ventas',
    title: 'Funnel Meta Completo',
    short:
      'Lead Ads de Facebook que disparan WhatsApp en segundos. Comentario en post que abre DM con oferta y registro en CRM.',
    outcome:
      'Todo lead de Meta entra a un flujo medible de venta sin intervención manual.',
    channels: ['facebook', 'whatsapp', 'instagram', 'crm', 'n8n'],
    metaCapabilities: [
      'Lead Ads con webhook',
      'Comentarios FB/IG',
      'Messenger',
      'WhatsApp templates',
      'CRM webhook'
    ],
    deliverables: [
      'Conexión Lead Ads → webhook → WhatsApp',
      'Flujo DM desde comentario',
      'Etiquetado por origen de campaña',
      'Registro en CRM',
      'Reporte de conversión por canal'
    ],
    startingAt: '$890.000 COP/mes'
  },
  {
    id: 'cold-lead-recovery',
    category: 'ventas',
    title: 'Recuperación de leads fríos',
    short:
      'Secuencias automáticas por WhatsApp para leads que preguntaron y no compraron, con seguimiento inteligente sin saturar.',
    outcome:
      'Hasta 30% de leads fríos recuperados con mensajes en el momento adecuado.',
    channels: ['whatsapp', 'crm'],
    metaCapabilities: [
      'Templates HSM',
      'Estados de entrega',
      'Programación de mensajes'
    ],
    deliverables: [
      'Secuencias de seguimiento (3, 7, 14, 30 días)',
      'Reglas de supresión',
      'Reporte de tasa de recuperación'
    ],
    startingAt: '$450.000 COP/mes'
  },

  // ─── SOPORTE ──────────────────────────────────────
  {
    id: 'customer-support-agent',
    category: 'soporte',
    title: 'Agente de atención al cliente',
    short:
      'Responde preguntas frecuentes, envía documentos y escala casos sensibles a un humano. 24/7 sin dejar esperando a nadie.',
    outcome:
      '85% de consultas resueltas sin intervención humana. El equipo solo atiende lo que requiere criterio.',
    channels: ['whatsapp', 'instagram', 'facebook'],
    metaCapabilities: [
      'Texto, multimedia, documentos, ubicación',
      'Respuestas citadas',
      'Listas y botones',
      'Handoff a Messenger o WhatsApp humano'
    ],
    deliverables: [
      'Base de conocimiento inicial',
      'Flujo de escalamiento',
      'Registro de casos',
      'Medición de temas frecuentes'
    ],
    startingAt: '$550.000 COP/mes'
  },
  {
    id: 'smart-moderation',
    category: 'soporte',
    title: 'Moderador inteligente de comunidad',
    short:
      'Filtra spam, oculta comentarios ofensivos y alerta sobre mensajes sensibles en Facebook e Instagram.',
    outcome:
      'Comunidad limpia y profesional sin un community manager revisando cada comentario.',
    channels: ['facebook', 'instagram'],
    metaCapabilities: [
      'Ocultar / mostrar / eliminar comentarios',
      'Detección de sentimiento',
      'Webhooks de moderación'
    ],
    deliverables: [
      'Reglas de moderación personalizadas',
      'Panel de alertas',
      'Reporte mensual de moderación'
    ],
    startingAt: '$390.000 COP/mes'
  },

  // ─── ECOMMERCE ────────────────────────────────────
  {
    id: 'conversational-ecommerce',
    category: 'ecommerce',
    title: 'E-commerce conversacional',
    short:
      'Convierte Instagram y WhatsApp en una tienda asistida por IA: catálogo, carrito, pedido y seguimiento.',
    outcome:
      'Ventas directas desde el chat sin sacar al cliente a otra app o página.',
    channels: ['whatsapp', 'instagram'],
    metaCapabilities: [
      'Catálogo WhatsApp',
      'Pedidos y carrito',
      'Templates de confirmación',
      'Links de pago'
    ],
    deliverables: [
      'Catálogo sincronizado',
      'Flujo de compra completo',
      'Confirmación y seguimiento postventa',
      'Integración con Shopify / WooCommerce (opcional)'
    ],
    startingAt: '$790.000 COP/mes'
  },

  // ─── SOCIAL ───────────────────────────────────────
  {
    id: 'social-comments-agent',
    category: 'social',
    title: 'Agente de comentarios FB/IG',
    short:
      'Responde automáticamente a comentarios "precio", "info" o "disponible" en posts y reels, y deriva al DM.',
    outcome:
      'Cero leads perdidos por comentarios sin respuesta.',
    channels: ['facebook', 'instagram'],
    metaCapabilities: [
      'Comentarios en posts y reels',
      'Respuesta pública y DM privado',
      'Detección de intención'
    ],
    deliverables: [
      'Script de respuestas',
      'Reglas de respuesta pública vs. privada',
      'Reporte de leads capturados desde comentarios'
    ],
    startingAt: '$390.000 COP/mes'
  },
  {
    id: 'social-media-agent',
    category: 'social',
    title: 'Social Media Agent',
    short:
      'Publica, programa y mide contenido en Facebook e Instagram con rutina operativa, sin improvisación.',
    outcome:
      'Presencia constante en redes sin un community manager de tiempo completo.',
    channels: ['facebook', 'instagram'],
    metaCapabilities: [
      'Publicación de fotos, videos, reels, carruseles',
      'Programación de posts',
      'Insights de página y perfil',
      'Métricas de engagement'
    ],
    deliverables: [
      'Calendario editorial mensual',
      'Publicaciones programadas',
      'Reporte mensual de métricas',
      'Sugerencias de mejora basadas en datos'
    ],
    startingAt: '$590.000 COP/mes'
  },

  // ─── AUTOMATIZACIÓN ───────────────────────────────
  {
    id: 'n8n-crm-automation',
    category: 'automatizacion',
    title: 'Automatización n8n + CRM',
    short:
      'Conecta WhatsApp, formularios, hojas de cálculo, CRMs, webhooks y APIs en flujos con manejo de errores.',
    outcome:
      'Procesos que antes tomaban horas ahora corren solos con trazabilidad completa.',
    channels: ['n8n', 'crm', 'web'],
    metaCapabilities: [],
    deliverables: [
      'Flujos n8n documentados',
      'Manejo de errores y reintentos',
      'Panel de monitoreo',
      'Integración con herramientas del cliente'
    ],
    startingAt: '$550.000 COP/mes'
  },
  {
    id: 'web-funnel-ai',
    category: 'automatizacion',
    title: 'Web funnel listo para IA',
    short:
      'Landing profesional con formulario inteligente, WhatsApp CTA, tracking y SEO básico para vender una oferta concreta.',
    outcome:
      'Web que no solo se ve bien, sino que captura leads y los conecta con tu agente IA.',
    channels: ['web', 'whatsapp', 'crm', 'n8n'],
    metaCapabilities: [],
    deliverables: [
      'Landing page responsive',
      'Formulario → webhook → WhatsApp',
      'SEO técnico básico',
      'Tracking con Meta Pixel / GA4'
    ],
    startingAt: '$890.000 COP (una vez)'
  },
  {
    id: 'auto-scheduling',
    category: 'automatizacion',
    title: 'Agendamiento automático',
    short:
      'Reserva, confirma y recuerda citas por WhatsApp con Flows interactivos. Ideal para clínicas, consultorios y servicios.',
    outcome:
      'Hasta 40% menos ausentismo con recordatorios automáticos y confirmación en dos toques.',
    channels: ['whatsapp', 'crm'],
    metaCapabilities: [
      'Flows interactivos',
      'Templates HSM',
      'Ubicación',
      'Webhooks de confirmación'
    ],
    deliverables: [
      'Calendario de disponibilidad',
      'Flujo de reserva y confirmación',
      'Recordatorios 24h y 1h antes',
      'Integración con Google Calendar'
    ],
    startingAt: '$490.000 COP/mes'
  },
  {
    id: 'commercial-dashboard',
    category: 'automatizacion',
    title: 'Dashboard comercial y social',
    short:
      'Panel unificado de leads, conversiones, respuesta y métricas sociales. Todo lo que necesitas para decidir.',
    outcome:
      'Una sola pantalla para saber cuántos leads entraron, cuántos se convirtieron y qué canal rindió más.',
    channels: ['whatsapp', 'instagram', 'facebook', 'crm'],
    metaCapabilities: [
      'Insights FB/IG',
      'Métricas de WhatsApp',
      'Datos de CRM'
    ],
    deliverables: [
      'Dashboard en Google Sheets o Looker Studio',
      'KPIs principales',
      'Actualización automática semanal'
    ],
    startingAt: '$390.000 COP/mes'
  },

  // ─── CONSULTORÍA ──────────────────────────────────
  {
    id: 'document-backoffice-agent',
    category: 'consultoria',
    title: 'Agente documental / backoffice',
    short:
      'Recibe documentos por WhatsApp, los resume, clasifica y prepara para revisión humana. Ideal para abogados y consultores.',
    outcome:
      'Menos horas perdidas organizando papeles. Todo llega clasificado y resumido.',
    channels: ['whatsapp', 'n8n'],
    metaCapabilities: [
      'Documentos y adjuntos',
      'Multimedia',
      'Webhooks'
    ],
    deliverables: [
      'Clasificación automática',
      'Resúmenes de documentos',
      'Registro en sistema de tareas',
      'Alerta cuando hay algo urgente'
    ],
    startingAt: '$590.000 COP/mes'
  },
  {
    id: 'ia-consulting-roadmap',
    category: 'consultoria',
    title: 'Consultoría IA y roadmap',
    short:
      'Diagnóstico de canales y procesos, y un plan de 30, 60 y 90 días para automatizar lo que más impacto tiene.',
    outcome:
      'Saber exactamente por dónde empezar y cuánto vas a ahorrar antes de invertir un peso.',
    channels: ['web', 'whatsapp'],
    metaCapabilities: [],
    deliverables: [
      'Diagnóstico de madurez digital',
      'Roadmap de 30/60/90 días',
      'Recomendación de primer agente',
      'Estimación de ROI proyectado'
    ],
    startingAt: '$290.000 COP (diagnóstico)'
  }
]
