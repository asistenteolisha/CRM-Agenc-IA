import type { PricingPlan } from './content'

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    setup: 800000,
    monthly: 690000,
    description:
      'Ideal para negocios que quieren automatizar su primer canal y medir resultados.',
    includes: [
      '1 agente IA (WhatsApp, Instagram o Facebook a elegir)',
      'Hasta 500 conversaciones al mes',
      '1 flujo n8n simple (ej: registro a Google Sheets)',
      'Soporte por WhatsApp en horario laboral',
      'Ajustes mensuales del guion conversacional',
      'Reporte básico mensual de actividad'
    ],
    limits: [
      'Costos de Meta (Cloud API) no incluidos ~$0.05/msg',
      'Handoff humano manual (sin integración CRM avanzada)',
      'Canales adicionales requieren upgrade',
      'Setup se paga una sola vez al inicio'
    ]
  },
  {
    id: 'business',
    name: 'Business',
    setup: 1500000,
    monthly: 1200000,
    recommended: true,
    description:
      'Para PYMES que necesitan ventas + atención + automatización en múltiples canales con CRM.',
    includes: [
      'Hasta 2 agentes IA simultáneos (WhatsApp + Instagram o Facebook)',
      'Hasta 2,000 conversaciones al mes',
      '3 flujos n8n con manejo de errores',
      'Integración con CRM (HubSpot, Zoho, Google Sheets)',
      'Dashboard comercial mensual (Looker Studio)',
      'Soporte prioritario 24/7',
      'Ajustes quincenales del bot',
      'Moderación de comentarios FB/IG incluida',
      'Templates HSM aprobados (hasta 3)'
    ],
    limits: [
      'Costos de Meta no incluidos',
      'Canales adicionales: +$290.000/mes por canal',
      'Pagos por WhatsApp sujetos a disponibilidad en Colombia',
      'Setup incluye implementación y entrenamiento inicial'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    setup: 0, // "cotización"
    monthly: 0, // "cotización"
    description:
      'Para empresas con operación multicanal, múltiples agentes y necesidades de integración profunda.',
    includes: [
      'Agentes IA ilimitados por canal',
      'Conversaciones sin límite',
      'Flujos n8n ilimitados',
      'Integración con CRM, ERP, e-commerce y APIs privadas',
      'Dashboard personalizado',
      'SLA con tiempos de respuesta garantizados',
      'Account manager dedicado',
      'Entrenamiento de equipo (hasta 5 personas)',
      'RAG con datos propios del negocio',
      'Publicación y programación de contenido FB/IG',
      'E-commerce conversacional completo'
    ],
    limits: [
      'Cotización personalizada según volumen y canales',
      'Requiere diagnóstico previo sin costo'
    ]
  }
]
