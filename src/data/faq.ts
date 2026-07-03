import type { FaqItem } from './content'

export const faqs: FaqItem[] = [
  {
    question: '¿Qué diferencia hay entre un chatbot y un agente IA de Agenc-IA?',
    answer:
      'Un chatbot genérico suele responder preguntas con un árbol de decisiones fijo. Un agente IA de Agenc-IA entiende intención, pide los datos que necesita, consulta herramientas (CRM, catálogo, calendario), registra el lead, avisa al equipo y hace seguimiento con reglas claras. Además, está conectado a los canales de Meta donde tus clientes ya escriben: WhatsApp, Instagram y Facebook.'
  },
  {
    question: '¿Necesito tener WhatsApp Business API aprobado para empezar?',
    answer:
      'No necesitas tenerlo listo. Nosotros gestionamos todo el proceso de aprobación de WhatsApp Business API, la configuración del webhook y la conexión con Meta. Solo necesitas una página de Facebook verificada y acceso de administrador. El trámite con Meta toma entre 2 y 7 días hábiles.'
  },
  {
    question: '¿Pueden automatizar Instagram y Facebook además de WhatsApp?',
    answer:
      'Sí. Con las capacidades de Meta Business API que tenemos habilitadas, podemos automatizar Instagram DMs, comentarios en posts y reels, respuestas a stories, Facebook Messenger, comentarios en publicaciones, Lead Ads y publicaciones programadas. Todo integrado en un solo sistema con n8n como orquestador.'
  },
  {
    question: '¿El agente puede responder comentarios de reels o posts automáticamente?',
    answer:
      'Sí. El agente detecta comentarios como "precio", "info", "disponible" o "quiero" y puede responder públicamente con información útil o enviar un DM privado con más detalle. También filtra spam, oculta comentarios ofensivos y alerta sobre mensajes sensibles que requieren atención humana.'
  },
  {
    question: '¿Qué pasa si el agente no sabe responder algo?',
    answer:
      'El agente escala al equipo humano por WhatsApp, Messenger o email según la urgencia. En los planes Growth y Pro, configuramos reglas de escalamiento por palabras sensibles (ej: "cancelar", "abogado", "demanda", "urgencia", "queja"). El cliente nunca se queda sin respuesta: si el bot no puede, un humano toma el control.'
  },
  {
    question: '¿Puedo aprobar mensajes antes de que se envíen?',
    answer:
      'Sí. Para acciones sensibles (precios finales con descuento, disponibilidad exacta de inventario, condiciones de financiación), el agente prepara el mensaje y lo deja en borrador para aprobación humana antes de enviarlo. Es lo que llamamos "human-in-the-loop" y está incluido en todos los planes.'
  },
  {
    question: '¿Se integra con mi CRM, Google Sheets o sistema actual?',
    answer:
      'Sí. n8n es el orquestador central y tiene conectores nativos para HubSpot, Salesforce, Zoho, Pipedrive, Google Sheets, Airtable, Notion, Slack, email y más de 400 aplicaciones. Si tu sistema tiene API, lo conectamos. Si vives en Google Sheets, también funciona perfecto para arrancar.'
  },
  {
    question: '¿Cuánto tiempo toma tener el agente funcionando?',
    answer:
      'Un agente básico (plan Starter) puede estar en producción en 5 a 7 días hábiles después del diagnóstico. Un sistema más completo (plan Growth con múltiples canales y Meta Ads) toma entre 7 y 10 días. El setup incluye: diagnóstico (día 1), blueprint del flujo (día 2-3), build y pruebas internas (día 4-6), y pruebas con datos reales antes del lanzamiento.'
  },
  {
    question: '¿Cuánto cuesta mantener el agente al mes?',
    answer:
      'El plan Starter cuesta $399.000 COP / $99 USD al mes + setup de $999.000 COP / $249 USD. Growth cuesta $799.000 COP / $199 USD al mes + setup de $1.999.000 COP / $499 USD. Pro cuesta $1.399.000 COP / $349 USD al mes + setup de $3.999.000 COP / $999 USD. Web Profesional es pago único de $2.499.000 COP / $620 USD. A esto se suman los costos de Meta Cloud API, que se facturan directamente a tu cuenta de Meta según volumen.'
  },
  {
    question: '¿Los costos de mensajes de Meta están incluidos en el plan?',
    answer:
      'No. Los costos de la plataforma Meta (Cloud API, mensajes, templates) se facturan directamente a tu cuenta de Meta Business. Son costos externos que dependen del volumen de conversaciones. Para darte una referencia: 1,000 conversaciones al mes cuestan aproximadamente $100.000-160.000 COP en tarifas de Meta. Esos costos los ves directamente en tu panel de Meta, no pasan por nosotros.'
  },
  {
    question: '¿Mis datos y los de mis clientes están seguros?',
    answer:
      'Sí. Los mensajes de WhatsApp están cifrados de extremo a extremo según el protocolo de Meta. Los datos que procesamos (nombre, teléfono, preferencias) se almacenan en tu CRM o Google Sheets, no en servidores compartidos. Las credenciales de APIs viajan siempre por HTTPS con tokens de acceso limitados. Cumplimos con las políticas de datos de Meta y la regulación colombiana de habeas data.'
  },
  {
    question: '¿Sirve si mi negocio vende por Instagram pero no tiene e-commerce?',
    answer:
      'Sí, es uno de nuestros casos más comunes. Creamos un e-commerce conversacional: el catálogo vive en WhatsApp Catalog, los clientes piden por chat, el agente confirma disponibilidad y total, y el pago se hace por link (Wompi, Mercado Pago, transferencia). No necesitas tienda online para vender por redes.'
  },
  {
    question: '¿Pueden crear contenido y publicarlo en redes sociales?',
    answer:
      'Sí, el servicio de publicación automática (incluido en Growth y Pro) cubre la programación y publicación de contenido en Facebook e Instagram: fotos, reels, carruseles y stories. También genera reportes de métricas. La creación del contenido (flyers, copies, videos) la hace nuestro equipo con asistencia de IA.'
  },
  {
    question: '¿Cómo mido si el agente está generando resultados?',
    answer:
      'Cada mes recibís un dashboard (Google Sheets o Looker Studio) con: leads entrantes por canal, tasa de respuesta, leads calificados, conversiones, tiempo promedio de respuesta, temas más consultados y ROI estimado. En los planes Growth y Pro el dashboard se actualiza automáticamente.'
  },
  {
    question: '¿Qué pasa si quiero cancelar?',
    answer:
      'No hay permanencia forzosa. Los planes son mensuales y podés cancelar con 15 días de anticipación. El setup inicial no es reembolsable porque cubre el trabajo de diagnóstico, configuración e implementación. Si cancelás, te entregamos todos los flujos, guiones y credenciales para que puedas mantener el sistema por tu cuenta o con otro proveedor.'
  }
]
