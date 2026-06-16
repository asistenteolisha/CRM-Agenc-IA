import type { IntegrationGroup } from './content'

export const integrationGroups: IntegrationGroup[] = [
  {
    group: 'Canales Meta',
    items: [
      { name: 'WhatsApp Business Cloud API', description: 'Mensajes, multimedia, catálogo, pedidos, Flows y templates HSM.' },
      { name: 'Facebook Lead Ads', description: 'Captura de leads con webhook y automatización de respuesta.' },
      { name: 'Facebook Messenger', description: 'Respuestas automáticas, menú persistente e ice breakers.' },
      { name: 'Facebook Comments', description: 'Respuesta automática, moderación y detección de sentimiento.' },
      { name: 'Instagram DMs', description: 'Mensajes directos, respuestas a stories y multimedia.' },
      { name: 'Instagram Comments', description: 'Respuesta a comentarios en posts y reels.' },
      { name: 'Instagram Publishing', description: 'Programación de fotos, reels, carruseles y stories.' },
      { name: 'Meta Insights', description: 'Métricas de página, perfil, posts y audiencia.' },
      { name: 'Meta Webhooks', description: 'Eventos en tiempo real de mensajes, comentarios y leads.' }
    ]
  },
  {
    group: 'Automatización',
    items: [
      { name: 'n8n', description: 'Orquestador principal de flujos con +400 conectores.' },
      { name: 'Make (Integromat)', description: 'Alternativa a n8n para clientes que ya lo usan.' },
      { name: 'Zapier', description: 'Conexiones simples entre apps sin código.' },
      { name: 'Google Apps Script', description: 'Automatizaciones ligeras para clientes que viven en Sheets.' }
    ]
  },
  {
    group: 'CRM y Ventas',
    items: [
      { name: 'HubSpot', description: 'CRM completo con seguimiento de leads y pipeline de ventas.' },
      { name: 'Zoho CRM', description: 'CRM popular en PYMES colombianas.' },
      { name: 'Pipedrive', description: 'Pipeline de ventas visual y seguimiento de oportunidades.' },
      { name: 'Salesforce', description: 'CRM enterprise (disponible en plan Enterprise).' },
      { name: 'Airtable', description: 'Base de datos flexible con vistas personalizables.' },
      { name: 'Google Sheets', description: 'Perfecto para arrancar sin invertir en CRM.' },
      { name: 'Notion', description: 'Gestión de leads y tareas en un solo lugar.' }
    ]
  },
  {
    group: 'E-commerce e Inventario',
    items: [
      { name: 'Shopify', description: 'Plataforma de e-commerce con API abierta.' },
      { name: 'WooCommerce', description: 'E-commerce sobre WordPress.' },
      { name: 'WhatsApp Catalog', description: 'Catálogo nativo de WhatsApp Business API.' },
      { name: 'Google Sheets', description: 'Inventario simple para negocios que empiezan.' }
    ]
  },
  {
    group: 'Pagos (Colombia)',
    items: [
      { name: 'Wompi', description: 'Pasarela de pagos colombiana de Bancolombia.' },
      { name: 'Mercado Pago', description: 'Pasarela de Mercado Libre, amplia cobertura.' },
      { name: 'PayU', description: 'Pasarela regional con múltiples medios de pago.' },
      { name: 'Bold', description: 'Pasarela colombiana con link de pago.' },
      { name: 'ePayco', description: 'Pasarela colombiana con amplia aceptación.' },
      { name: 'Nequi / Daviplata', description: 'Transferencia asistida cuando no hay API disponible.' }
    ]
  },
  {
    group: 'Analítica y Tracking',
    items: [
      { name: 'Google Analytics 4', description: 'Analítica web y de conversión.' },
      { name: 'Meta Pixel', description: 'Tracking de conversiones de Facebook e Instagram.' },
      { name: 'Meta Conversions API', description: 'Tracking server-side para anuncios Meta.' },
      { name: 'Looker Studio', description: 'Dashboards visuales conectados a datos en vivo.' },
      { name: 'Vercel Analytics', description: 'Analítica ligera de la web de Agenc-IA.' }
    ]
  },
  {
    group: 'IA y Datos',
    items: [
      { name: 'OpenAI (GPT)', description: 'Comprensión de lenguaje y generación de respuestas.' },
      { name: 'Anthropic Claude', description: 'Alternativa para tareas que requieren más contexto.' },
      { name: 'Google Gemini', description: 'Modelo multimodal para imágenes y texto.' },
      { name: 'Meta Llama', description: 'Modelo open-source para datos sensibles on-premise.' },
      { name: 'Bases vectoriales', description: 'RAG con documentos propios del negocio.' },
      { name: 'PostgreSQL / Supabase', description: 'Persistencia cuando Google Sheets no escala.' }
    ]
  }
]
