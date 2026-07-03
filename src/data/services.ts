import type { Service } from './content'

export const services: Service[] = [
  // ─── AGENTES IA ────────────────────────────────────
  {
    id: 'whatsapp-agent',
    category: 'ventas',
    title: 'Agente de WhatsApp',
    short:
      'Agente IA completo para WhatsApp que califica leads, responde preguntas, muestra catálogo y agenda citas 24/7.',
    outcome:
      'Tus clientes reciben respuesta en menos de 30 segundos, cualquier hora del día.',
    channels: ['whatsapp', 'crm', 'n8n'],
    metaCapabilities: [
      'Botones rápidos',
      'Listas interactivas',
      'Templates HSM',
      'Webhooks en tiempo real',
      'Estados de lectura y entrega',
      'Catálogo de productos',
      'Flows interactivos'
    ],
    deliverables: [
      'Guion conversacional personalizado por negocio',
      'Flujo de calificación (presupuesto, urgencia, ubicación)',
      'Registro automático en CRM u hoja de cálculo',
      'Resumen de lead con puntaje',
      'Secuencia de seguimiento automatizada',
      'Integración con Google Calendar para citas'
    ],
    startingAt: 'Disponible desde Starter'
  },
  {
    id: 'facebook-agent',
    category: 'ventas',
    title: 'Agente de Facebook',
    short:
      'Agente IA que responde mensajes de Facebook Messenger, comentarios en posts y gestiona leads de Facebook Lead Ads.',
    outcome:
      'Cada lead de Facebook entra a un flujo medible de venta sin intervención manual.',
    channels: ['facebook', 'whatsapp', 'crm'],
    metaCapabilities: [
      'Messenger automático',
      'Lead Ads con webhook',
      'Comentarios en posts',
      'Respuestas citadas',
      'Webhooks de moderación'
    ],
    deliverables: [
      'Conexión Lead Ads → webhook → WhatsApp',
      'Flujo de respuesta automática en Messenger',
      'Etiquetado por origen de campaña',
      'Registro en CRM',
      'Reporte de conversión por campaña'
    ],
    startingAt: 'Disponible desde Starter'
  },
  {
    id: 'instagram-agent',
    category: 'ventas',
    title: 'Agente de Instagram',
    short:
      'Responde DMs, comentarios en posts y stories con información útil, captura datos y deriva a WhatsApp cuando hay intención real.',
    outcome:
      'Cada mensaje de Instagram recibe respuesta útil en menos de un minuto.',
    channels: ['instagram', 'whatsapp', 'crm'],
    metaCapabilities: [
      'DMs automáticos',
      'Respuesta a comentarios en posts',
      'Respuesta a comentarios en reels',
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
    startingAt: 'Disponible desde Starter'
  },
  {
    id: 'messenger-agent',
    category: 'ventas',
    title: 'Agente de Messenger',
    short:
      'Agente IA para Facebook Messenger que atiende consultas, califica interesados y agenda citas directamente desde el chat.',
    outcome:
      'Messenger se convierte en un canal de venta activo con respuesta instantánea.',
    channels: ['facebook', 'messenger', 'crm'],
    metaCapabilities: [
      'Messenger API',
      'Botones y plantillas',
      'Compartir ubicación',
      'Webhooks en tiempo real'
    ],
    deliverables: [
      'Flujo conversacional personalizado',
      'Calificación automática de leads',
      'Agendamiento de citas',
      'Integración con CRM'
    ],
    startingAt: 'Disponible desde Starter'
  },

  // ─── META ADS ──────────────────────────────────────
  {
    id: 'meta-ads-management',
    category: 'ventas',
    title: 'Gestión de Meta Ads',
    short:
      'Creación, optimización y reporte de campañas en Facebook e Instagram Ads enfocadas en capturar leads y generar ventas.',
    outcome:
      'Más leads calificados a menor costo por adquisición con campañas optimizadas.',
    channels: ['facebook', 'instagram', 'crm', 'n8n'],
    metaCapabilities: [
      'Lead Ads con webhook',
      'Campañas de conversación',
      'Audiencias personalizadas',
      'Pixel de Meta',
      'API de Conversiones'
    ],
    deliverables: [
      'Estrategia de campañas por industria',
      'Creatividades y copies para anuncios',
      'Configuración de audiencias',
      'Optimización semanal de presupuesto',
      'Reporte mensual de rendimiento'
    ],
    startingAt: 'Incluido en Growth'
  },

  // ─── SOCIAL MEDIA ──────────────────────────────────
  {
    id: 'auto-publishing',
    category: 'social',
    title: 'Publicación automática',
    short:
      'Publica y programa contenido en Facebook e Instagram de forma automática. Calendario editorial con métricas de rendimiento.',
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
    startingAt: 'Incluido en Growth'
  },
  {
    id: 'comment-response',
    category: 'social',
    title: 'Respuesta a comentarios',
    short:
      'Responde automáticamente a comentarios en posts y reels de Facebook e Instagram. Detecta intención y deriva al DM o WhatsApp.',
    outcome:
      'Cero leads perdidos por comentarios sin respuesta. Cada comentario se convierte en oportunidad.',
    channels: ['facebook', 'instagram', 'whatsapp'],
    metaCapabilities: [
      'Comentarios en posts y reels',
      'Respuesta pública y DM privado',
      'Detección de intención',
      'Moderación inteligente'
    ],
    deliverables: [
      'Script de respuestas por tipo de comentario',
      'Reglas de respuesta pública vs. privada',
      'Derivación automática a WhatsApp',
      'Reporte de leads capturados desde comentarios'
    ],
    startingAt: 'Disponible desde Starter'
  },

  // ─── CAPTURA Y LEADS ──────────────────────────────
  {
    id: 'lead-capture',
    category: 'ventas',
    title: 'Captura de leads',
    short:
      'Sistema completo de captura de leads desde todos los canales Meta: WhatsApp, Instagram DMs, Facebook comments y Lead Ads.',
    outcome:
      'Todos tus leads capturados en un solo lugar con clasificación automática por calidad.',
    channels: ['whatsapp', 'instagram', 'facebook', 'crm', 'n8n'],
    metaCapabilities: [
      'Lead Ads con webhook',
      'DMs automáticos',
      'Comentarios con captura',
      'Webhooks en tiempo real',
      'CRM integration'
    ],
    deliverables: [
      'Formularios de captura por canal',
      'Clasificación automática de leads',
      'Registro unificado en CRM',
      'Notificación instantánea al equipo comercial',
      'Dashboard de leads por origen'
    ],
    startingAt: 'Disponible desde Starter'
  },

  // ─── REPORTES ──────────────────────────────────────
  {
    id: 'performance-reports',
    category: 'automatizacion',
    title: 'Reportes de rendimiento',
    short:
      'Dashboard unificado con métricas de todos tus canales: conversaciones, leads, conversiones, engagement y ROI de campañas.',
    outcome:
      'Una sola pantalla para saber cuántos leads entraron, cuántos se convirtieron y qué canal rindió más.',
    channels: ['whatsapp', 'instagram', 'facebook', 'crm'],
    metaCapabilities: [
      'Insights FB/IG',
      'Métricas de WhatsApp',
      'Datos de CRM',
      'Métricas de campañas Ads'
    ],
    deliverables: [
      'Dashboard en Google Sheets o Looker Studio',
      'KPIs principales por canal',
      'Actualización automática semanal',
      'Reporte ejecutivo mensual PDF'
    ],
    startingAt: 'Incluido desde Starter'
  },

  // ─── ONBOARDING ────────────────────────────────────
  {
    id: 'automated-onboarding',
    category: 'automatizacion',
    title: 'Onboarding automatizado',
    short:
      'Proceso de implementación guiado y automatizado: diagnóstico, configuración, pruebas y lanzamiento en 7-10 días.',
    outcome:
      'Tu agente IA está funcionando con clientes reales en menos de 10 días.',
    channels: ['whatsapp', 'n8n'],
    metaCapabilities: [],
    deliverables: [
      'Diagnóstico de canales y procesos (20 min)',
      'Blueprint de flujos conversacionales',
      'Configuración de agentes en canales elegidos',
      'Pruebas internas y validación',
      'Lanzamiento con monitoreo en tiempo real',
      'Capacitación básica del equipo'
    ],
    startingAt: 'Incluido en setup'
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
    startingAt: 'Incluido en Growth y Pro'
  },
  {
    id: 'web-funnel-ai',
    category: 'automatizacion',
    title: 'Web Profesional',
    short:
      'Sitio profesional de hasta 6 páginas con SEO, WhatsApp CTA, tracking y formulario de contacto para capturar leads.',
    outcome:
      'Web que no solo se ve bien, sino que captura leads y los conecta con tu agente IA.',
    channels: ['web', 'whatsapp', 'crm', 'n8n'],
    metaCapabilities: [],
    deliverables: [
      'Sitio responsive de hasta 6 páginas',
      'Formulario → webhook → WhatsApp',
      'SEO técnico básico',
      'Tracking con Meta Pixel / GA4'
    ],
    startingAt: '$2.499.000 COP / $620 USD'
  },
  {
    id: 'auto-scheduling',
    category: 'automatizacion',
    title: 'Agendamiento automático',
    short:
      'Reserva, confirma y recuerda citas por WhatsApp con Flows interactivos. Ideal para clínicas, consultorios y servicios.',
    outcome:
      'Recordatorios automáticos y confirmación en dos toques para facilitar la gestión de asistencia.',
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
    startingAt: 'Cotización según flujo'
  },

  // ─── CONSULTORÍA ──────────────────────────────────
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
    startingAt: 'Diagnóstico gratuito'
  },

  // ─── DIFERENCIADORES PREMIUM ──────────────────────
  {
    id: 'managed-service',
    category: 'premium',
    title: 'Servicio gestionado 100%',
    short:
      'Tú no haces nada, nosotros todo. Configuramos, entrenamos, monitoreamos y optimizamos tu agente IA sin que muevas un dedo.',
    outcome:
      'Cero carga operativa para tu equipo. Nosotros nos encargamos de todo el ciclo de vida de tu agente.',
    channels: ['whatsapp', 'instagram', 'facebook', 'crm', 'n8n'],
    metaCapabilities: [],
    deliverables: [
      'Setup completo sin intervención del cliente',
      'Entrenamiento inicial con tu tono de marca',
      'Ajustes y mejoras continuas',
      'Soporte humano dedicado'
    ],
    startingAt: 'Incluido en todos los planes'
  },
  {
    id: 'trained-agents',
    category: 'premium',
    title: 'Agentes entrenados con tus datos',
    short:
      'Entrenamos cada agente con tu inventario real, precios, políticas y datos de negocio para respuestas precisas y contextualizadas.',
    outcome:
      'Tu agente IA responde como si conociera tu negocio de memoria, porque así es.',
    channels: ['whatsapp', 'instagram', 'facebook'],
    metaCapabilities: [],
    deliverables: [
      'RAG con datos propios del negocio',
      'Inventario y precios integrados',
      'Políticas y FAQ de tu empresa',
      'Actualización periódica de conocimiento'
    ],
    startingAt: 'Incluido en Growth y Pro'
  },
  {
    id: 'monitoring-247',
    category: 'premium',
    title: 'Monitoreo 24/7 con alertas',
    short:
      'Monitoreamos cada conversación en tiempo real. Si algo se sale del guion, recibes una alerta y nuestro equipo interviene.',
    outcome:
      'Tranquilidad total: tu agente nunca dice algo que no debe, y los problemas se detectan antes de que escalen.',
    channels: ['whatsapp', 'instagram', 'facebook'],
    metaCapabilities: [],
    deliverables: [
      'Monitoreo en tiempo real 24/7',
      'Alertas automáticas por anomalías',
      'Intervención humana cuando se necesita',
      'Dashboard de estado en vivo'
    ],
    startingAt: 'Incluido en Growth y Pro'
  },
  {
    id: 'weekly-reports',
    category: 'premium',
    title: 'Reportes de rendimiento semanales',
    short:
      'Cada semana recibes un reporte con leads capturados, conversaciones, tasa de respuesta, conversiones y recomendaciones de mejora.',
    outcome:
      'Visibilidad total del rendimiento de tu agente IA con datos accionables cada semana.',
    channels: ['whatsapp', 'instagram', 'facebook', 'crm'],
    metaCapabilities: [],
    deliverables: [
      'Reporte semanal automatizado',
      'KPIs de conversación y conversión',
      'Recomendaciones de optimización',
      'Comparativa con semana anterior'
    ],
    startingAt: 'Incluido en Growth y Pro'
  },
  {
    id: 'ai-optimization',
    category: 'premium',
    title: 'Optimización continua con IA',
    short:
      'Analizamos patrones de conversación, identificamos mejoras y optimizamos tu agente cada semana para que rinda más con el tiempo.',
    outcome:
      'Tu agente IA mejora semana tras semana. No es un software estático, es un sistema que aprende.',
    channels: ['whatsapp', 'instagram', 'facebook', 'crm', 'n8n'],
    metaCapabilities: [],
    deliverables: [
      'Análisis semanal de conversaciones',
      'Ajuste de guiones y flujos',
      'Pruebas A/B de respuestas',
      'Mejora continua del puntaje de leads'
    ],
    startingAt: 'Incluido en Pro'
  }
]
