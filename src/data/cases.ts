import type { CaseStudy } from './content'

export const caseStudies: CaseStudy[] = [
  {
    id: 'carros-usados',
    client: 'Concesionario en Bucaramanga',
    industry: 'Venta de vehículos',
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
    id: 'restaurante-zona',
    client: 'Restaurante en zona gastronómica',
    industry: 'Restaurantes',
    problem:
      'El restaurante perdía ~150 consultas al mes por llamadas sin atender y mensajes de Instagram sin responder, especialmente fuera del horario de servicio. Las reservas que llegaban por DM se perdían.',
    solution:
      'Agente de Instagram DMs + WhatsApp que responde menú, horarios, ubicación y toma reservas con confirmación automática. Si el cliente quiere modificar algo complejo, deriva al mesero de turno.',
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
    id: 'optica-bogota',
    client: 'Óptica en Bogotá',
    industry: 'Ópticas',
    problem:
      'La óptica recibía consultas sobre marcos, lentes y exámenes de vista por WhatsApp e Instagram. El personal no alcanzaba a responder entre atender clientes en tienda. Las citas para exámenes se agendaban por teléfono y muchas se perdían.',
    solution:
      'Agente de WhatsApp que responde catálogo de marcos, precios de lentes, disponibilidad de exámenes de vista y agenda citas con recordatorios automáticos. Captura leads interesados en promociones.',
    results: [
      { metric: 'Citas para exámenes de vista', value: '+45% mensual' },
      { metric: 'Consultas respondidas en <1 min', value: '92%' },
      { metric: 'Leads capturados desde Instagram', value: '+80/mes' },
      { metric: 'No-show reducido', value: 'De 30% a 10%' }
    ],
    channels: ['whatsapp', 'instagram'],
    testimonial: {
      author: 'Gerente de óptica',
      role: 'Óptica en Bogotá',
      quote:
        'Ahora los clientes agendan su examen de vista por WhatsApp sin llamar. El agente muestra nuestros marcos más populares y agenda todo solo.'
    }
  },
  {
    id: 'inmobiliaria',
    client: 'Inmobiliaria boutique en Bogotá',
    industry: 'Bienes raíces',
    problem:
      'Los leads de Facebook Lead Ads llegaban a un Excel que nadie revisaba a tiempo. Las consultas por WhatsApp sobre apartamentos se respondían con capturas de pantalla del inventario.',
    solution:
      'Funnel Meta completo: Lead Ad de Facebook → webhook → WhatsApp automático con catálogo de inmuebles disponibles. El agente califica presupuesto, zona y tipo de inmueble, y agenda visita con el asesor.',
    results: [
      { metric: 'Leads de Facebook convertidos', value: 'De 12% a 38%' },
      { metric: 'Visitas agendadas/mes', value: '2.5x más' },
      { metric: 'Tiempo de respuesta a lead nuevo', value: '< 1 minuto' },
      { metric: 'Costo por lead calificado', value: '60% menor' }
    ],
    channels: ['facebook', 'whatsapp', 'crm', 'n8n']
  },
  {
    id: 'salon-belleza',
    client: 'Salón de belleza en Medellín',
    industry: 'Salones de belleza',
    problem:
      'El salón dependía de llamadas telefónicas para agendar citas. Fuera de horario no había forma de reservar. Las cancelaciones de último minuto causaban pérdida de ingresos.',
    solution:
      'Agente de WhatsApp que muestra servicios y precios, agenda citas según disponibilidad, envía recordatorios 24h y 1h antes, y gestiona cancelaciones con reasignación automática.',
    results: [
      { metric: 'Citas agendadas por WhatsApp', value: '70% del total' },
      { metric: 'Cancelaciones de último minuto', value: '-55%' },
      { metric: 'Llamadas telefónicas reducidas', value: '-80%' },
      { metric: 'Ingreso adicional por agenda optimizada', value: '+$2.800.000 COP/mes' }
    ],
    channels: ['whatsapp', 'instagram'],
    testimonial: {
      author: 'Dueña del salón',
      role: 'Salón de belleza en Medellín',
      quote:
        'Mis clientas agendan a cualquier hora por WhatsApp. El agente les muestra los servicios disponibles y agenda sin que yo tenga que contestar el teléfono.'
    }
  },
  {
    id: 'colegio-privado',
    client: 'Colegio privado en Cali',
    industry: 'Educación',
    problem:
      'Durante temporada de admisiones, el colegio recibía cientos de consultas por WhatsApp y Facebook sobre programas, costos y proceso de inscripción. El equipo administrativo no daba abasto.',
    solution:
      'Agente multicanal que responde información completa sobre programas, requisitos, costos y fechas de admisión. Agenda entrevistas con el equipo de admisiones y captura datos de aspirantes.',
    results: [
      { metric: 'Consultas de admisiones respondidas', value: '95% automáticas' },
      { metric: 'Entrevistas agendadas', value: '+60% vs año anterior' },
      { metric: 'Tiempo de respuesta', value: '< 30 segundos' },
      { metric: 'Horas administrativas liberadas', value: '30 horas/semana' }
    ],
    channels: ['whatsapp', 'facebook'],
    testimonial: {
      author: 'Coordinadora de admisiones',
      role: 'Colegio privado en Cali',
      quote:
        'En temporada de inscripciones el WhatsApp se desbordaba. Ahora el agente responde todo y solo nos llegan los aspirantes ya interesados para agendar entrevista.'
    }
  },
  {
    id: 'gimnasio',
    client: 'Cadena de gimnasios en Barranquilla',
    industry: 'Fitness',
    problem:
      'Los gimnasios perdían potenciales socios que preguntaban por precios y membresías por Instagram y WhatsApp pero no recibían respuesta rápida. Las clases grupales se llenaban sin lista de espera eficiente.',
    solution:
      'Agente de WhatsApp e Instagram que responde planes, precios y horarios, gestiona membresías, agenda clases grupales con lista de espera, y envía recordatorios de entrenamiento.',
    results: [
      { metric: 'Nuevas membresías/mes', value: '+25%' },
      { metric: 'Consultas respondidas automáticamente', value: '88%' },
      { metric: 'Clases grupales llenas', value: '95% de ocupación' },
      { metric: 'Retención de socios', value: '+18%' }
    ],
    channels: ['whatsapp', 'instagram'],
    testimonial: {
      author: 'Gerente general',
      role: 'Cadena de gimnasios',
      quote:
        'El agente responde precios, agenda clases y hasta manda recordatorios. Nuestros socios están más comprometidos y hemos aumentado membresías sin contratar más personal.'
    }
  },
  {
    id: 'tienda-retail',
    client: 'Tienda de ropa en línea',
    industry: 'Retail',
    problem:
      'La tienda recibía consultas por WhatsApp e Instagram sobre tallas, disponibilidad y envíos. El equipo no alcanzaba a responder entre empaquetar pedidos y atender la tienda física.',
    solution:
      'Agente de WhatsApp e Instagram que muestra catálogo, responde sobre tallas y disponibilidad, toma pedidos directamente en el chat y envía seguimiento de envío automático.',
    results: [
      { metric: 'Ventas por WhatsApp', value: '+40% mensual' },
      { metric: 'Consultas respondidas en <1 min', value: '94%' },
      { metric: 'Carritos abandonados recuperados', value: '+22%' },
      { metric: 'Tiempo de atención por consulta', value: 'De 8 min a 30 seg' }
    ],
    channels: ['whatsapp', 'instagram'],
    testimonial: {
      author: 'Dueña de tienda',
      role: 'Tienda de ropa en línea',
      quote:
        'Ahora vendo por WhatsApp las 24 horas. El agente muestra el catálogo, responde tallas y hasta toma el pedido. Mis ventas subieron un 40% el primer mes.'
    }
  }
]
