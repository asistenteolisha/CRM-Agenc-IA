import type { CaseStudy } from './content'

export const caseStudies: CaseStudy[] = [
  {
    id: 'demo-automotriz',
    label: 'Demo sectorial',
    client: 'Flujo para concesionarios',
    industry: 'Automotriz',
    problem:
      'Las consultas llegan por distintos canales y el equipo comercial necesita recopilar la información antes de continuar.',
    solution:
      'Un agente guía la conversación, registra la necesidad y entrega el contexto al asesor comercial.',
    results: [
      { metric: 'Datos clave', value: 'Presupuesto y necesidad' },
      { metric: 'Registro', value: 'Lead en CRM' },
      { metric: 'Escalamiento', value: 'Asesor comercial' }
    ],
    channels: ['whatsapp', 'crm', 'n8n']
  },
  {
    id: 'demo-restaurantes',
    label: 'Demo sectorial',
    client: 'Flujo para restaurantes',
    industry: 'Restaurantes',
    problem:
      'El equipo necesita responder preguntas frecuentes y organizar solicitudes de reserva desde mensajería.',
    solution:
      'Un agente presenta la información del negocio, recopila los datos de la reserva y deriva excepciones al equipo.',
    results: [
      { metric: 'Información', value: 'Menú y horarios' },
      { metric: 'Reserva', value: 'Datos confirmados' },
      { metric: 'Excepciones', value: 'Atención humana' }
    ],
    channels: ['instagram', 'whatsapp']
  },
  {
    id: 'proyeccion-retail',
    label: 'Caso proyectado',
    client: 'Flujo para comercio electrónico',
    industry: 'Retail',
    problem:
      'El escenario evalúa cómo centralizar consultas de producto y preparar pedidos iniciados por chat.',
    solution:
      'La proyección conecta catálogo, captura de datos y seguimiento para validar el flujo antes de implementarlo.',
    results: [
      { metric: 'Consulta', value: 'Catálogo conectado' },
      { metric: 'Pedido', value: 'Datos estructurados' },
      { metric: 'Validación', value: 'Pendiente con el negocio' }
    ],
    channels: ['whatsapp', 'instagram']
  }
]
