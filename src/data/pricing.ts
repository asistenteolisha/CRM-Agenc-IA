import type { PricingPlan } from './content'

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    setup: 900000,
    monthly: 390000,
    annualDiscount: '20% de descuento pagando anual',
    description:
      'Ideal para negocios que quieren automatizar su primer canal y medir resultados.',
    includes: [
      '1 canal + setup profesional + personalización básica',
      '1 agente IA en un canal (WhatsApp, Instagram o Facebook)',
      'Hasta 500 conversaciones al mes',
      '1 flujo n8n simple (ej: registro a Google Sheets)',
      'Soporte por WhatsApp en horario laboral',
      'Ajustes mensuales del guion conversacional',
      'Reporte básico mensual de actividad',
      'Captura de leads automática',
      'Respuesta a comentarios en el canal elegido'
    ],
    limits: [
      'Costos de Meta (Cloud API) no incluidos ~$0.05/msg',
      'Handoff humano manual (sin integración CRM avanzada)',
      'Canales adicionales requieren upgrade a Growth',
      'Setup se paga una sola vez al inicio'
    ]
  },
  {
    id: 'growth',
    name: 'Growth',
    setup: 1800000,
    monthly: 690000,
    recommended: true,
    badge: 'MÁS POPULAR',
    annualDiscount: '20% de descuento pagando anual',
    description:
      'Para PYMES que quieren agentes en todos los canales Meta + gestión de anuncios.',
    includes: [
      'Todos los canales + Meta Ads + reportes semanales + CRM básico',
      'Agentes IA en todos los canales (WhatsApp + Instagram + Facebook + Messenger)',
      'Hasta 2,000 conversaciones al mes',
      '3 flujos n8n con manejo de errores',
      'Gestión de Meta Ads (creación y optimización de campañas)',
      'Publicación automática de contenido FB/IG',
      'Respuesta automática a comentarios',
      'Captura de leads con registro en CRM',
      'Dashboard comercial mensual (Looker Studio)',
      'Soporte prioritario 24/7',
      'Templates HSM aprobados (hasta 5)'
    ],
    limits: [
      'Costos de Meta no incluidos',
      'Integración CRM avanzada requiere Pro',
      'Setup incluye implementación y entrenamiento inicial'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    setup: 3500000,
    monthly: 1200000,
    annualDiscount: '20% de descuento pagando anual',
    description:
      'Todo incluido: agentes ilimitados, integraciones profundas, reportes avanzados y personalización total.',
    includes: [
      'Todo incluido + agente dedicado + soporte prioritario + integraciones custom',
      'Todo lo de Growth incluido',
      'Conversaciones sin límite',
      'Flujos n8n ilimitados',
      'Integración con CRM, ERP, e-commerce y APIs privadas',
      'Reportes de rendimiento personalizados',
      'Onboarding automatizado para tu equipo',
      'SLA con tiempos de respuesta garantizados',
      'Account manager dedicado',
      'Entrenamiento de equipo (hasta 5 personas)',
      'RAG con datos propios del negocio',
      'E-commerce conversacional completo'
    ],
    limits: [
      'Requiere diagnóstico previo sin costo',
      'Setup incluye migración y configuración avanzada'
    ]
  }
]
