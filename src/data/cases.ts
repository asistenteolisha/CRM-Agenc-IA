import type { CaseStudy } from './content'

export const caseStudies: CaseStudy[] = [
  {
    id: 'carros-usados',
    client: 'Concesionario en Bucaramanga',
    industry: 'Automotriz / compraventa de vehículos',
    problem:
      'El 60% de las consultas por WhatsApp no recibían respuesta en menos de 4 horas. Los vendedores estaban ocupados atendiendo clientes en sala y los mensajes se acumulaban sin clasificar.',
    solution:
      'Agente de ventas por WhatsApp que recibe el mensaje, entiende intención, pregunta presupuesto, ciudad, tipo de carro, financiación y urgencia. Luego entrega un resumen con puntaje al vendedor asignado.',
    results: [
      { metric: 'Tiempo de primera respuesta', value: 'De 4 horas a <30 segundos' },
      { metric: 'Consultas atendidas 24/7', value: '85% del total' },
      { metric: 'Leads calificados/mes', value: '3x más que antes' },
      { metric: 'Ahorro estimado en personal', value: '$1.200.000 COP/mes' }
    ],
    channels: ['whatsapp', 'crm', 'n8n']
  },
  {
    id: 'restaurante-zapopan',
    client: 'Restaurante en zona gastronómica',
    industry: 'Hospitality / alimentos y bebidas',
    problem:
      'El restaurante perdía ~150 consultas al mes por llamadas sin atender y mensajes de Instagram sin responder, especialmente fuera del horario de servicio. Las reservas que llegaban por DM se perdían entre mensajes personales del community manager.',
    solution:
      'Agente de Instagram DMs + WhatsApp que responde menú, horarios, ubicación y toma reservas con confirmación automática. Si el cliente quiere modificar algo complejo, deriva al mesero de turno por WhatsApp.',
    results: [
      { metric: 'Reservas mensuales adicionales', value: '+32 reservas/mes' },
      { metric: 'Ingreso incremental', value: '+$1.600.000 COP/mes' },
      { metric: 'Consultas nocturnas respondidas', value: '89% (antes 0%)' },
      { metric: 'Tiempo del community manager liberado', value: '12 horas/semana' }
    ],
    channels: ['instagram', 'whatsapp'],
    testimonial: {
      author: 'Chef propietario',
      role: 'Dueño de restaurante',
      quote:
        'El agente responde el menú y toma reservas mientras yo estoy en cocina. Los viernes en la noche ya no pierdo mesas por no contestar el teléfono.'
    }
  },
  {
    id: 'clinica-estetica',
    client: 'Clínica estética en Medellín',
    industry: 'Salud y bienestar',
    problem:
      'La clínica recibía ~200 consultas semanales entre WhatsApp, Instagram y formulario web. Solo el 40% se respondía en menos de 24 horas. Las citas canceladas sin aviso representaban el 25% de la agenda.',
    solution:
      'Agente multicanal con agendamiento automático por WhatsApp Flows. El bot califica el tipo de procedimiento, presupuesto y urgencia, muestra disponibilidad, agenda la cita y envía recordatorios 24h y 1h antes.',
    results: [
      { metric: 'Citas perdidas (no-show)', value: 'De 25% a 8%' },
      { metric: 'Consultas respondidas en <5 min', value: '92%' },
      { metric: 'Agenda llena con 2 semanas', value: 'de anticipación' },
      { metric: 'Horas de recepcionista liberadas', value: '25 horas/semana' }
    ],
    channels: ['whatsapp', 'instagram', 'web'],
    testimonial: {
      author: 'Directora comercial',
      role: 'Clínica estética',
      quote:
        'El bot agenda solo, confirma solo y me avisa cuando alguien quiere un procedimiento que requiere valoración médica. La agenda ya no es un caos los lunes.'
    }
  },
  {
    id: 'inmobiliaria',
    client: 'Inmobiliaria boutique en Bogotá',
    industry: 'Inmobiliario / finca raíz',
    problem:
      'Los leads de Facebook Lead Ads llegaban a un Excel que nadie revisaba a tiempo. Las consultas por WhatsApp sobre apartamentos se respondían con capturas de pantalla del inventario, que cambiaba cada semana.',
    solution:
      'Funnel Meta completo: Lead Ad de Facebook → webhook → WhatsApp automático con catálogo de inmuebles disponibles. El agente califica presupuesto, zona y tipo de inmueble, y agenda visita con el asesor.',
    results: [
      { metric: 'Leads de Facebook convertidos', value: 'De 12% a 38%' },
      { metric: 'Visitas agendadas/mes', value: '2.5x más' },
      { metric: 'Tiempo de respuesta a lead nuevo', value: '< 1 minuto' },
      { metric: 'Costo por lead calificado', value: '60% menor' }
    ],
    channels: ['facebook', 'whatsapp', 'crm', 'n8n']
  }
]
