# PLAN V2 IMPROVED: Actualizacion web Agenc-IA

> Objetivo: convertir la landing actual de Agenc-IA en una web comercial competitiva para el mercado PYME colombiano, enfocada en agentes IA conectados a WhatsApp, Facebook, Instagram, n8n, CRM y funnels reales de venta.

## 1. Resumen ejecutivo

La web actual ya tiene una base solida: Vue 3, Vite, TypeScript, GSAP, Three.js, Lenis, SCSS, deploy en Vercel y un endpoint `/api/lead` conectado a n8n. El problema no es tecnico de base. El problema es de posicionamiento y profundidad comercial: hoy la pagina vende "agentes IA" de forma amplia, pero no muestra con suficiente fuerza que Agenc-IA ya puede operar sobre el ecosistema Meta completo.

Con las capacidades actuales de `META-CAPABILITIES.md`, Agenc-IA puede presentarse como una agencia de automatizacion conversacional y social commerce para PYMES colombianas:

- WhatsApp Business API con mensajes, multimedia, ubicacion, contactos, botones, listas, catalogos, pedidos, carrito, templates, Flows, webhooks y links `wa.me`.
- Facebook Pages API con comentarios, Messenger, posts, insights, eventos, Lead Ads y webhooks.
- Instagram API con comentarios, DMs, respuestas a stories, publicacion, reels, carruseles, hashtags, insights, menciones y webhooks.
- n8n como orquestador para CRM, hojas de calculo, alertas, handoff humano, dashboards y seguimiento comercial.

La nueva web debe vender el resultado de negocio, no la tecnologia:

> "Agentes IA para vender por WhatsApp, responder Instagram y convertir leads de Meta en clientes sin contratar mas equipo."

## 2. Archivos leidos y diagnostico del codebase

Archivos revisados:

- `PLAN-V2.md`
- `META-CAPABILITIES.md`
- `src/App.vue`
- `src/components/AgentNetwork.vue`
- `src/styles/main.scss`
- `package.json`
- `index.html`
- `api/lead.js`
- Tambien se revisaron `README.md`, `vite.config.ts`, `vercel.json`, `.env.example` y `tsconfig.json` para entender despliegue y restricciones.

### 2.1 Estado actual de `src/App.vue`

`src/App.vue` contiene casi toda la aplicacion:

- Estado de idioma.
- Estado del formulario.
- Copy ES/EN.
- Arrays de problemas, servicios, proceso, casos y stats.
- Inicializacion de Lenis.
- Inicializacion de GSAP ScrollTrigger.
- Todo el template de la landing.

Esto funciona para una primera landing, pero para V2 ya genera friccion:

- Agregar 15 servicios dentro de `App.vue` haria el archivo dificil de mantener.
- Pricing, FAQ, casos, calculadora ROI e integraciones necesitan datos propios.
- El toggle bilingue actual solo traduce parte del copy.
- La navegacion no tiene menu movil real, solo oculta links en mobile.
- Las animaciones se aplican con un selector global unico, lo que limita control por seccion.

Decision recomendada: separar por secciones y datos, sin meter Vue Router ni librerias nuevas.

### 2.2 Estado actual de `src/components/AgentNetwork.vue`

El canvas Three.js ya da una primera impresion tecnica. Mejoras necesarias:

- El resize usa `window.innerWidth` y `window.innerHeight`; debe usar el contenedor/canvas para evitar render sobredimensionado.
- `prefersReducedMotion()` se consulta en cada frame; conviene calcularlo una vez y escuchar cambios si hace falta.
- La animacion siempre corre aunque el canvas no este visible.
- La escena no comunica aun los canales Meta: WhatsApp, Instagram, Facebook, CRM, n8n.
- Falta una version visual mas comercial: nodos por canal, pulsos de mensajes y estados de agentes.

Decision recomendada: evolucionar el componente, no reemplazarlo.

### 2.3 Estado actual de `src/styles/main.scss`

El SCSS es coherente y sobrio, pero ya esta creciendo como archivo unico:

- Variables, layout, cards, formulario, responsive y motion viven juntos.
- La paleta esta dominada por dark + verde/cyan. Funciona para tecnologia, pero V2 necesita acentos diferenciados por canal: WhatsApp, Instagram, Facebook, ventas, soporte, comercio.
- Las secciones actuales usan cards de forma repetida. Para V2 conviene usar mas bandas completas, tablas, calculadora, accordions y demos.

Decision recomendada: dividir en pocos parciales SCSS, no una carpeta de estilos por cada componente.

### 2.4 Estado actual de `api/lead.js`

El endpoint ya cumple la funcion principal: recibe POST, valida campos requeridos y reenvia a n8n con token. Hay que endurecerlo antes de aumentar trafico:

- `JSON.parse` puede lanzar error y devolver 500 no controlado.
- No hay limite de tamano de payload.
- No hay validacion basica de email.
- No hay honeypot antispam.
- No se envia metadata util: origen, user agent, referer, utm, timestamp.
- No hay timeout para el webhook upstream.
- No captura telefono como requerido, aunque el negocio gira alrededor de WhatsApp.

Decision recomendada: mantener serverless simple, pero agregar validacion y metadata.

### 2.5 Estado actual de `index.html`

Tiene meta description, theme color, Open Graph basico y favicon. Para V2 faltan:

- `canonical`
- `og:url`
- `og:image`
- `twitter:card`
- Schema JSON-LD de `LocalBusiness` y `Service`
- Preconnect si se usan fuentes externas
- `robots.txt` y `sitemap.xml`

## 3. Benchmark competitivo

Referencias revisadas en junio de 2026:

- https://agenciaia.com.co
- https://vonoaweb.com

### 3.1 Lo que hace fuerte a agenciaia.com.co

Automaxia compite con amplitud y autoridad:

- Muchos verticales de agentes IA.
- Metodologia visible en fases.
- Enfoque en integraciones: CRM, ERP, ecommerce, WhatsApp, automatizacion.
- Comparativa contra consultoras grandes y freelancers.
- Mensaje de resultados medibles, soporte y acompanamiento.
- FAQ extensa para SEO.

Oportunidad para Agenc-IA:

- Ser mas concreto y mas PYME.
- Mostrar flujos reales de Meta, no solo "IA empresarial".
- Tener precios de entrada mas claros.
- Ser mas rapido de entender: WhatsApp, Instagram, Facebook, CRM y ventas.

### 3.2 Lo que hace fuerte a vonoaweb.com

VonoaWeb compite con claridad comercial:

- Pricing visible.
- Paquetes simples.
- Web + chatbot como oferta facil de comprar.
- Portafolio y testimonios.
- FAQ.
- Mensaje de "sin costos ocultos".

Oportunidad para Agenc-IA:

- Igualar claridad de precios, pero con mayor profundidad Meta.
- Mostrar casos de uso colombianos: restaurantes, clinicas, comercios, concesionarios, inmobiliarias, servicios profesionales.
- Incluir calculadora de ROI para justificar mensualidades.
- Vender no solo web, sino funnel completo desde anuncio/comentario/DM hasta WhatsApp, CRM y seguimiento.

## 4. Posicionamiento recomendado

### 4.1 Mensaje principal

H1 recomendado:

```text
Agentes IA para vender por WhatsApp, responder Instagram y cerrar mas leads con tu equipo actual.
```

Subtitulo:

```text
Implementamos automatizacion conversacional para PYMES colombianas: WhatsApp Business API, Instagram DMs, Facebook Lead Ads, catalogos, CRM, n8n y seguimiento comercial con aprobacion humana.
```

CTA principal:

```text
Agendar diagnostico de 20 minutos
```

CTA secundario:

```text
Calcular mi ROI
```

### 4.2 Diferenciador

Agenc-IA no debe presentarse como "hacemos chatbots". Eso suena pequeno y comoditizado.

Debe presentarse como:

```text
Construimos sistemas de venta y atencion sobre los canales donde tus clientes ya escriben: WhatsApp, Instagram y Facebook.
```

### 4.3 Segmento ideal inicial

PYMES colombianas que ya reciben mensajes por redes y WhatsApp, pero pierden oportunidades por demora, desorden o falta de seguimiento:

- Concesionarios y compraventas de vehiculos.
- Restaurantes, cafes y negocios de comida.
- Clinicas esteticas, odontologia, salud no urgente y bienestar.
- Inmobiliarias y constructoras pequenas.
- Ecommerce local y marcas que venden por Instagram.
- Servicios profesionales: abogados, contadores, consultores, agencias.
- Educacion, cursos, academias y bootcamps.
- Turismo, hoteles boutique y experiencias locales.

## 5. Capacidades Meta que deben aparecer en la web

La web debe tener una seccion especifica llamada `Ecosistema Meta activo` o `Canales que ya podemos automatizar`. No basta con poner logos.

### 5.1 WhatsApp Business API

Capacidades a mostrar:

- Respuestas automaticas 24/7.
- Texto, imagenes, videos, documentos, audio y stickers.
- Ubicaciones y contactos.
- Botones rapidos, listas interactivas y CTAs.
- Catalogo de productos, pedidos y carrito.
- Templates HSM para seguimiento, recordatorios, promociones y postventa.
- Flows para formularios dentro de WhatsApp.
- Lectura de estados: enviado, entregado, leido, errores.
- Typing indicators y read receipts para una experiencia mas natural.
- QR codes y links `wa.me`.
- Webhooks en tiempo real.
- Perfil de negocio: foto, descripcion, horario, email, web y direccion.

Uso comercial:

- Ventas por WhatsApp.
- Soporte 24/7.
- Citas y recordatorios.
- Catalogos y pedidos.
- Seguimiento de leads frios.
- Encuestas y captura estructurada.

### 5.2 Facebook

Capacidades a mostrar:

- Lectura y respuesta automatica a comentarios.
- Ocultar, mostrar o eliminar comentarios ofensivos.
- Deteccion de sentimiento.
- Messenger con respuestas rapidas, attachments, menu persistente e ice breakers.
- Creacion y programacion de posts.
- Insights de pagina y rendimiento de posts.
- Lead Ads con captura via webhook.
- Webhooks de comentarios, mensajes, reacciones y nuevos leads.

Uso comercial:

- Lead Ad en Facebook que dispara WhatsApp en segundos.
- Comentario en post que abre DM con oferta.
- Moderacion de comunidad.
- Reportes de alcance y engagement.
- Recuperacion de interesados que reaccionan o comentan.

### 5.3 Instagram

Capacidades a mostrar:

- Lectura y respuesta automatica a comentarios en posts y reels.
- Moderacion y filtro de spam.
- DMs y respuestas a stories.
- Mensajes multimedia.
- Publicacion y programacion de fotos, videos, reels y carruseles.
- Metricas de posts, perfil y audiencia.
- Monitoreo de menciones y tags.
- Webhooks de comentarios, mensajes y menciones.

Uso comercial:

- Comentario "precio" o "info" que dispara DM.
- DM que califica al lead y lo lleva a WhatsApp.
- Respuesta a stories con oferta o agendamiento.
- Social listening basico de marca.
- Reporte de contenido que si genera conversaciones.

## 6. Nueva arquitectura de informacion de la web

Orden recomendado de secciones:

1. `HeroSection`: promesa clara + CTAs + red 3D de canales.
2. `TrustBar`: canales y stack: WhatsApp, Instagram, Facebook, n8n, Vercel, CRM.
3. `ProblemSection`: leads perdidos, redes saturadas, seguimiento manual, IA sin operacion.
4. `MetaEcosystemSection`: mapa visual de WhatsApp, IG, FB, Lead Ads, CRM y n8n.
5. `ServicesSection`: 15 servicios agrupados por resultado.
6. `UseCasesSection`: verticales colombianos con flujos concretos.
7. `InteractiveDemoSection`: tabs con demos de ventas, soporte, ecommerce y social media.
8. `CaseStudiesSection`: casos de estudio reales o pilotos, claramente marcados.
9. `RoiCalculatorSection`: calculadora simple de retorno.
10. `PricingSection`: planes en COP para PYME.
11. `ProcessSection`: diagnostico, blueprint, build, prueba, operacion.
12. `IntegrationsSection`: todas las integraciones posibles por categoria.
13. `ComparisonSection`: Agenc-IA vs chatbot generico vs agencia web tradicional.
14. `FaqSection`: 12 preguntas frecuentes.
15. `ContactSection`: formulario + WhatsApp directo + expectativa de respuesta.
16. `AppFooter`: links, legal, redes y contacto.

No se recomienda agregar Vue Router en V2. Una landing larga con anclas, buen performance y contenido fuerte es suficiente.

## 7. Servicios nuevos, 15 ofertas vendibles

La web debe pasar de 6 servicios genericos a 15 servicios concretos. Se pueden mostrar en cards filtrables por categoria.

### 7.1 Tabla de servicios

| # | Servicio | Para quien | Capacidades Meta usadas | Entregable |
|---|---|---|---|---|
| 1 | Agente de ventas por WhatsApp | Negocios con leads entrantes | WhatsApp texto, botones, listas, templates, webhooks | Bot que califica, resume y envia lead al CRM |
| 2 | Agente de atencion al cliente | Soporte y FAQs | WhatsApp multimedia, documentos, respuestas citadas, handoff | Bot de soporte con escalamiento humano |
| 3 | E-commerce conversacional | Marcas que venden por IG/WhatsApp | Catalogo, pedidos, carrito, templates, links de pago | Flujo de compra desde chat |
| 4 | Funnel Meta completo | Empresas con pauta o redes activas | Facebook Lead Ads, IG DMs, Messenger, WhatsApp | Lead Ad o comentario que termina en WhatsApp y CRM |
| 5 | Agente de Instagram DMs | Marcas con mensajes por Instagram | DMs, story replies, multimedia, webhooks | Respuestas, calificacion y traslado a venta |
| 6 | Agente de comentarios FB/IG | Negocios con posts y reels activos | Comentarios, moderacion, sentimiento, respuestas | Respuesta a "precio/info" y filtro de spam |
| 7 | Social Media Agent | Equipos sin community manager completo | Programacion FB/IG, posts, reels, metricas | Calendario, publicaciones y reporte |
| 8 | Moderador inteligente de comunidad | Marcas expuestas a spam o comentarios toxicos | Ocultar, mostrar, eliminar, sentimiento | Reglas de moderacion y alertas |
| 9 | Agendamiento automatico | Clinicas, belleza, consultorias, talleres | WhatsApp Flows, templates, ubicacion | Reserva, confirmacion y recordatorio |
| 10 | Recuperacion de leads frios | Ventas con seguimiento debil | Templates HSM, estados de entrega, CRM | Secuencias de seguimiento por WhatsApp |
| 11 | Automatizacion n8n y CRM | Cualquier PYME con procesos manuales | Webhooks Meta + CRM/API | Flujos n8n con errores controlados |
| 12 | Web funnel listo para IA | Negocios sin landing convertidora | Web form, WhatsApp CTA, tracking | Landing con captura, SEO basico y chatbot |
| 13 | Dashboard comercial y social | Gerencia y ventas | Insights FB/IG, estados WhatsApp, CRM | Panel de leads, conversiones y respuesta |
| 14 | Agente documental/backoffice | Servicios profesionales | WhatsApp documentos, adjuntos, IA externa | Resumen, clasificacion y tareas internas |
| 15 | Consultoria IA y roadmap | Empresas que no saben por donde empezar | Diagnostico de canales y procesos | Roadmap de 30, 60 y 90 dias |

### 7.2 Detalle comercial por servicio

#### 1. Agente de ventas por WhatsApp

Promesa:

```text
Responde en segundos, califica presupuesto, urgencia y necesidad, y entrega al vendedor un resumen listo para cerrar.
```

Incluye:

- Script conversacional por tipo de negocio.
- Botones rapidos para presupuesto, ciudad, producto y urgencia.
- Handoff a humano cuando hay lead caliente.
- Registro en Google Sheets, CRM o n8n.
- Template de seguimiento si el cliente no responde.

Ejemplo para carros usados:

- Cliente pregunta por un carro.
- Bot solicita presupuesto, ciudad, tipo de vehiculo, financiacion y fecha de compra.
- Bot envia opciones del catalogo si aplica.
- Bot marca lead como frio, tibio o caliente.
- Vendedor recibe resumen en WhatsApp interno, email o CRM.

#### 2. Agente de atencion al cliente

Promesa:

```text
Reduce preguntas repetidas y mantiene atencion 24/7 sin dejar solo al cliente cuando el caso requiere humano.
```

Incluye:

- Base de conocimiento inicial.
- Respuestas con documentos, imagenes, ubicacion o links.
- Escalamiento por palabras sensibles.
- Registro de casos.
- Medicion de temas frecuentes.

#### 3. E-commerce conversacional

Promesa:

```text
Convierte Instagram y WhatsApp en una tienda asistida por IA: catalogo, carrito, pedido, pago y seguimiento.
```

Incluye:

- Catalogo de WhatsApp.
- Productos destacados por categoria.
- Carrito y confirmacion de pedido.
- Links de pago si pagos nativos no aplican.
- Mensajes postventa y recuperacion de carrito.
- Integracion con WooCommerce, Shopify, Google Sheets o inventario simple.

#### 4. Funnel Meta completo

Promesa:

```text
Cada lead de Facebook, Instagram o WhatsApp entra a un flujo medible de venta.
```

Incluye:

- Facebook Lead Ads a webhook.
- Respuesta automatica por WhatsApp.
- DM automatico desde comentario.
- Etiquetado por origen de campana.
- Registro en CRM.
- Reporte de conversion por canal.

#### 5. Agente de Instagram DMs

Promesa:

```text
Responde DMs y stories con informacion util, captura datos y manda a WhatsApp cuando hay intencion real.
```

Incluye:

- Respuestas a "precio", "info", "ubicacion", "agenda".
- Clasificacion de intencion.
- Respuesta con multimedia.
- Derivacion a WhatsApp o agenda.

#### 6. Agente de comentarios FB/IG

Promesa:

```text
No dejes comentarios con intencion de compra sin respuesta.
```

Incluye:

- Respuesta publica controlada.
- DM privado con mas informacion.
- Moderacion de spam.
- Deteccion de sentimiento.
- Alertas para comentarios sensibles.

#### 7. Social Media Agent

Promesa:

```text
Publica, responde y mide contenido con una rutina operativa, no con improvisacion.
```

Incluye:

- Calendario de contenido semanal o mensual.
- Publicacion programada en Facebook e Instagram.
- Variantes de copy por oferta.
- Reporte de alcance, comentarios y leads generados.
- Recomendaciones para el siguiente ciclo.

#### 8. Moderador inteligente de comunidad

Promesa:

```text
Protege la marca sin borrar conversaciones utiles.
```

Incluye:

- Reglas de spam, insultos, fraude y crisis.
- Ocultar comentarios de riesgo.
- Escalamiento a humano.
- Reporte de sentimiento.

#### 9. Agendamiento automatico

Promesa:

```text
Agenda citas, confirma asistencia y reduce no-shows por WhatsApp.
```

Incluye:

- Captura de datos por WhatsApp Flow.
- Confirmacion automatica.
- Recordatorio 24h y 2h antes.
- Reprogramacion.
- Integracion con Google Calendar o CRM.

#### 10. Recuperacion de leads frios

Promesa:

```text
El lead que no compro hoy no queda perdido.
```

Incluye:

- Secuencias HSM aprobadas.
- Segmentacion por interes.
- Recordatorios de oferta.
- Reactivacion de clientes antiguos.
- Stop words y cumplimiento opt-out.

#### 11. Automatizacion n8n y CRM

Promesa:

```text
Conecta mensajes, formularios, hojas, CRM y alertas sin tener que cambiar todo tu sistema.
```

Incluye:

- Webhooks de Meta a n8n.
- Envio a HubSpot, Zoho, Pipedrive, Airtable, Google Sheets o sistema propio.
- Manejo de errores.
- Notificaciones internas.
- Logs basicos.

#### 12. Web funnel listo para IA

Promesa:

```text
Una landing que no solo se ve bien: captura, califica y activa seguimiento automatico.
```

Incluye:

- Landing Vue/Vite o integracion en web actual.
- Formulario de diagnostico.
- WhatsApp CTA con mensaje precargado.
- Meta Pixel o GA4.
- Endpoint seguro a n8n.

#### 13. Dashboard comercial y social

Promesa:

```text
Mira cuantos leads entran, de donde vienen, cuanto se demora la respuesta y que canal convierte mejor.
```

Incluye:

- Leads por canal.
- Tiempos de respuesta.
- Conversaciones abiertas y cerradas.
- Conversion por etapa.
- Reporte mensual.

#### 14. Agente documental/backoffice

Promesa:

```text
Clasifica documentos, resume solicitudes y prepara tareas internas para revision humana.
```

Incluye:

- Recepcion de documentos por WhatsApp.
- Extraccion de datos.
- Resumen para equipo.
- Creacion de tarea interna.
- Aprobacion humana antes de enviar respuestas sensibles.

#### 15. Consultoria IA y roadmap

Promesa:

```text
Define el primer caso de uso rentable antes de gastar en tecnologia.
```

Incluye:

- Diagnostico de canales.
- Mapa de procesos repetitivos.
- Priorizacion por impacto y esfuerzo.
- Roadmap 30, 60 y 90 dias.
- Estimacion de ROI.

## 8. Pricing optimizado para PYME colombiana

Principio: precios claros, entrada accesible y escalamiento por capacidad. No competir por ser el mas barato. Competir por retorno medible.

Todos los precios sugeridos son antes de IVA si aplica y no incluyen:

- Gasto en pauta de Meta Ads.
- Costos de conversaciones de WhatsApp/Meta.
- Tokens de modelos IA si el volumen supera el paquete.
- Licencias externas de CRM, ecommerce, analytics o pasarelas.
- Costos de dominio, hosting externo o plugins de terceros si el cliente ya tiene una web.

### 8.1 Planes principales

| Plan | Setup unico | Mensualidad | Para quien | Incluye |
|---|---:|---:|---|---|
| Diagnostico IA | $250.000 COP | $0 | Negocio que quiere saber por donde empezar | Auditoria de canales, mapa de oportunidad, ROI estimado, roadmap corto |
| Starter WhatsApp | $1.200.000 COP | $690.000 COP/mes | PYME con WhatsApp como canal principal | 1 agente WhatsApp, 1 flujo de calificacion, hasta 800 conversaciones/mes, n8n basico, reporte mensual |
| Growth Meta Funnel | $2.400.000 COP | $1.490.000 COP/mes | Negocio con Instagram/Facebook activos | WhatsApp + IG DM o FB Messenger, comentarios automatizados, Lead Ads webhook, 3 automatizaciones, CRM/Sheets, optimizacion mensual |
| Commerce Conversacional | $3.800.000 COP | $2.300.000 COP/mes | Ecommerce local o marca que vende por redes | Catalogo WhatsApp, pedidos/carrito, links de pago, recuperacion de carrito, postventa, dashboard basico |
| Scale Multiagente | Desde $6.500.000 COP | Desde $3.900.000 COP/mes | Empresa con varios canales, sedes o equipos | Multiagente, integraciones custom, dashboard, SLAs, QA conversacional, soporte prioritario |

### 8.2 Add-ons

| Add-on | Precio sugerido | Nota |
|---|---:|---|
| Landing web lista para IA | Desde $2.500.000 COP | One-page Vue/Vite con formulario, WhatsApp CTA, SEO basico |
| Automatizacion n8n adicional | $450.000 a $900.000 COP | Segun complejidad y sistemas |
| Template HSM adicional | $120.000 COP | Copy, variables y configuracion para aprobacion |
| Dashboard avanzado | Desde $1.200.000 COP setup | Looker Studio, Sheets, Supabase o dashboard propio |
| Carga inicial de catalogo | Desde $350.000 COP | Hasta 50 productos; mas volumen se cotiza |
| Social Media Agent mensual | Desde $850.000 COP/mes | Calendario, programacion y reporte |
| Soporte extendido | Desde $550.000 COP/mes | Horas adicionales y SLA |
| Integracion CRM custom | Desde $1.500.000 COP | HubSpot, Zoho, Pipedrive, sistema propio |

### 8.3 Como mostrar pricing en la web

La seccion de pricing debe:

- Mostrar 4 planes, no 8.
- Marcar `Growth Meta Funnel` como "Mas recomendado para PYMES".
- Tener CTA por plan: `Quiero este plan`.
- Incluir nota clara: "Los costos de Meta, pauta y herramientas externas se pagan aparte".
- Tener una fila de comparacion para canales incluidos: WhatsApp, Instagram, Facebook, Lead Ads, catalogo, CRM, dashboard.

Copy sugerido:

```text
Precios pensados para PYMES colombianas: arrancas con un flujo que vende o atiende, medimos resultado y escalamos solo si el numero da.
```

## 9. Casos de estudio con capacidades Meta

No inventar logos ni resultados reales. Si aun no hay clientes publicados, usar tarjetas marcadas como:

- `Caso piloto`
- `Demo sectorial`
- `Caso proyectado`

La web puede ser honesta y comercial al mismo tiempo.

### 9.1 Caso 1: Compraventa de carros usados

Tipo: demo principal / caso piloto.

Problema:

- Leads llegan por WhatsApp, Facebook Lead Ads e Instagram.
- Muchos preguntan precio y disponibilidad.
- El vendedor no siempre responde en menos de 5 minutos.
- No queda claro presupuesto, ciudad, financiacion ni urgencia.

Solucion:

- Agente WhatsApp califica lead.
- Facebook Lead Ads dispara conversacion automatica.
- Botones rapidos para presupuesto, tipo de vehiculo, ciudad y financiacion.
- Catalogo de vehiculos destacados.
- Handoff al vendedor cuando el lead esta caliente.
- Registro en CRM/Sheets con origen de campana.

Capacidades Meta:

- WhatsApp texto, botones, listas, catalogo, templates.
- Facebook Lead Ads webhook.
- Instagram DM para comentarios "precio/info".
- Estados de entrega y lectura.

Metricas objetivo:

- Respuesta inicial en menos de 30 segundos.
- 60 por ciento menos leads sin clasificar.
- 25 a 40 por ciento mas leads con datos completos.
- 6 a 12 horas semanales ahorradas en preguntas repetidas.

### 9.2 Caso 2: Restaurante o cafe con domicilios y reservas

Tipo: demo sectorial.

Problema:

- Preguntas repetidas por menu, horario, ubicacion, reservas y domicilios.
- Comentarios en Instagram con "precio", "menu" o "donde estan".
- Pedidos se pierden entre DMs, WhatsApp y llamadas.

Solucion:

- Agente IG responde comentarios y envia DM.
- WhatsApp envia menu en imagen/PDF o catalogo.
- Bot captura pedido o reserva.
- Ubicacion y horarios automaticos.
- Template de confirmacion y recordatorio.

Capacidades Meta:

- Instagram comentarios, DMs, story replies.
- WhatsApp multimedia, ubicacion, botones, catalogo.
- Templates para confirmacion.

Metricas objetivo:

- 80 por ciento de FAQs respondidas automaticamente.
- Menos pedidos perdidos en horas pico.
- Base de clientes para reactivacion semanal.

### 9.3 Caso 3: Clinica estetica, odontologia o bienestar

Tipo: caso proyectado.

Problema:

- Leads llegan de pauta y redes.
- El equipo pierde tiempo preguntando procedimiento, disponibilidad y sede.
- Muchos pacientes no asisten por falta de recordatorio.

Solucion:

- Lead Ad a WhatsApp en segundos.
- WhatsApp Flow captura procedimiento, sede, fecha tentativa y presupuesto.
- Recordatorio automatico 24h y 2h antes.
- Handoff a asesora para cerrar.
- Dashboard de citas generadas por campana.

Capacidades Meta:

- Facebook Lead Ads.
- WhatsApp Flows, templates, botones.
- Instagram DM y comentarios.

Metricas objetivo:

- Menor tiempo de primera respuesta.
- Reduccion de no-shows.
- Mejor trazabilidad de pauta a cita.

### 9.4 Caso 4: Marca ecommerce que vende por Instagram

Tipo: demo sectorial.

Problema:

- Comentarios con intencion de compra no se responden a tiempo.
- El catalogo esta disperso.
- Carritos se abandonan por falta de seguimiento.

Solucion:

- Comentario "precio" dispara respuesta y DM.
- DM lleva a WhatsApp.
- WhatsApp muestra catalogo, carrito y link de pago.
- Template de carrito abandonado.
- Postventa con confirmacion y seguimiento.

Capacidades Meta:

- Instagram comentarios, DMs, multimedia.
- WhatsApp catalogo, carrito, order details, templates.
- Facebook/Instagram insights.

Metricas objetivo:

- Mas conversaciones de compra desde contenido organico.
- Recuperacion de carritos abandonados.
- Mejor reporte de producto mas consultado.

### 9.5 Caso 5: Oficina legal o servicios profesionales

Tipo: caso piloto/backoffice.

Problema:

- Mensajes con documentos y consultas repetidas.
- Agenda desordenada.
- Mucho tiempo en clasificar solicitudes.

Solucion:

- WhatsApp recibe documentos.
- Agente clasifica tipo de solicitud.
- Resume el caso para revision humana.
- Agenda cita o solicita datos faltantes.
- Nunca da consejo sensible sin aprobacion.

Capacidades Meta:

- WhatsApp documentos, respuestas citadas, contactos, templates.
- Handoff humano.
- n8n para tareas internas.

Metricas objetivo:

- Menos tiempo en intake.
- Solicitudes mas completas antes de la consulta.
- Mejor experiencia inicial del cliente.

## 10. Calculadora de ROI

La calculadora debe estar antes del pricing o inmediatamente despues. Debe ser simple, con defaults realistas para Colombia.

### 10.1 Inputs

- Leads al mes.
- Porcentaje de leads que hoy quedan sin respuesta rapida.
- Ticket promedio en COP.
- Margen bruto estimado.
- Conversion actual.
- Mejora esperada conservadora.
- Horas semanales gastadas en tareas repetitivas.
- Costo hora del equipo.
- Plan mensual elegido.
- Setup elegido.

### 10.2 Outputs

- Leads recuperables al mes.
- Ingreso bruto adicional estimado.
- Margen adicional estimado.
- Ahorro operativo mensual.
- Beneficio mensual estimado.
- ROI mensual.
- Meses para recuperar setup.

### 10.3 Formula recomendada

```ts
export type RoiInput = {
  monthlyLeads: number
  missedLeadRate: number
  averageTicket: number
  grossMarginRate: number
  currentConversionRate: number
  expectedLiftRate: number
  weeklyManualHours: number
  hourlyCost: number
  monthlyPlanCost: number
  setupCost: number
}

export function calculateRoi(input: RoiInput) {
  const missedLeads = input.monthlyLeads * input.missedLeadRate
  const recoveredSales = missedLeads * input.currentConversionRate * input.expectedLiftRate
  const additionalGrossRevenue = recoveredSales * input.averageTicket
  const additionalMargin = additionalGrossRevenue * input.grossMarginRate
  const operationalSavings = input.weeklyManualHours * 4.33 * input.hourlyCost
  const monthlyBenefit = additionalMargin + operationalSavings
  const monthlyNet = monthlyBenefit - input.monthlyPlanCost
  const roi = input.monthlyPlanCost > 0 ? monthlyNet / input.monthlyPlanCost : 0
  const paybackMonths = monthlyNet > 0 ? input.setupCost / monthlyNet : Infinity

  return {
    missedLeads,
    recoveredSales,
    additionalGrossRevenue,
    additionalMargin,
    operationalSavings,
    monthlyBenefit,
    monthlyNet,
    roi,
    paybackMonths
  }
}

// ponytail: self-check tiny, upgrade to unit tests only when ROI logic grows.
console.assert(
  calculateRoi({
    monthlyLeads: 100,
    missedLeadRate: 0.3,
    averageTicket: 500000,
    grossMarginRate: 0.35,
    currentConversionRate: 0.08,
    expectedLiftRate: 0.5,
    weeklyManualHours: 5,
    hourlyCost: 12000,
    monthlyPlanCost: 690000,
    setupCost: 1200000
  }).monthlyBenefit > 0
)
```

### 10.4 UI recomendada

Componente: `src/components/sections/RoiCalculatorSection.vue`

Controles:

- Inputs numericos simples.
- Sliders solo para porcentajes.
- Formato COP con `Intl.NumberFormat`.
- Selector de plan.
- Resultado en 3 bloques grandes: `Beneficio mensual`, `ROI`, `Recuperas setup en`.

No usar libreria de charts. Para V2 basta con numeros claros y una barra CSS.

## 11. FAQ recomendada

Componente: `src/components/sections/FaqSection.vue`

Usar HTML nativo:

```vue
<details v-for="item in faqs" :key="item.question" class="faq-item">
  <summary>{{ item.question }}</summary>
  <p>{{ item.answer }}</p>
</details>
```

Preguntas:

1. Que diferencia hay entre un chatbot y un agente IA?
2. Necesito tener WhatsApp Business API aprobado?
3. Pueden automatizar Instagram y Facebook tambien?
4. El agente puede responder comentarios de reels o posts?
5. Que pasa si el agente no sabe responder?
6. Puedo aprobar mensajes antes de que se envien?
7. Se integra con mi CRM, Google Sheets o sistema actual?
8. Cuanto tarda salir a produccion?
9. Cuanto cuesta mantenerlo al mes?
10. Los costos de Meta estan incluidos?
11. Mis datos y los de mis clientes estan seguros?
12. Sirve si mi negocio vende por Instagram pero no tiene ecommerce?
13. Pueden crear contenido y publicarlo en redes?
14. Como se mide si el agente esta generando plata?
15. Que pasa si quiero cancelar?

Respuestas deben ser concretas. Ejemplo:

```text
Un chatbot suele responder preguntas. Un agente IA hace parte de un flujo: entiende intencion, pide datos, consulta herramientas, registra el lead, avisa al equipo y hace seguimiento con reglas.
```

## 12. Integraciones posibles

La seccion debe agrupar por resultado, no solo logos.

### 12.1 Canales Meta

- WhatsApp Business Cloud API.
- WhatsApp Flows.
- WhatsApp Catalog.
- WhatsApp Templates HSM.
- Facebook Lead Ads.
- Facebook Messenger.
- Facebook Comments.
- Facebook Page Insights.
- Instagram DMs.
- Instagram Comments.
- Instagram Story Replies.
- Instagram Publishing.
- Instagram Insights.
- Meta webhooks.

### 12.2 Automatizacion

- n8n.
- Make.
- Zapier.
- Webhooks propios.
- Google Apps Script cuando el cliente vive en Sheets.

### 12.3 CRM y ventas

- HubSpot.
- Zoho CRM.
- Pipedrive.
- Salesforce.
- Airtable.
- Google Sheets.
- Notion.
- CRMs propios via API.

### 12.4 Ecommerce e inventario

- Shopify.
- WooCommerce.
- Tiendanube si el cliente la usa.
- Google Sheets como inventario simple.
- Catalogo WhatsApp.
- ERP o POS via API cuando exista.

### 12.5 Pagos Colombia

- Wompi.
- Mercado Pago.
- PayU.
- Bold.
- ePayco.
- Links de pago manuales.
- Nequi o Daviplata como instruccion asistida cuando no haya API.

### 12.6 Analitica y tracking

- GA4.
- Meta Pixel.
- Meta Conversions API.
- Vercel Analytics.
- Looker Studio.
- Sheets dashboard.
- Eventos propios enviados desde n8n.

### 12.7 IA y datos

- OpenAI.
- Anthropic Claude.
- Google Gemini.
- Meta Llama.
- Bases vectoriales si el cliente necesita RAG.
- PostgreSQL o Supabase si se requiere persistencia.
- Documentos PDF, FAQs, catalogos y politicas internas.

Nota tecnica: no agregar todas estas integraciones al sitio como codigo. Mostrarlas como capacidades comerciales y activar solo las que cada plan necesite.

## 13. Componentes propuestos

Estructura minima recomendada:

```text
src/
  App.vue
  components/
    AgentNetwork.vue
    sections/
      HeroSection.vue
      TrustBar.vue
      ProblemSection.vue
      MetaEcosystemSection.vue
      ServicesSection.vue
      UseCasesSection.vue
      InteractiveDemoSection.vue
      CaseStudiesSection.vue
      RoiCalculatorSection.vue
      PricingSection.vue
      ProcessSection.vue
      IntegrationsSection.vue
      ComparisonSection.vue
      FaqSection.vue
      ContactSection.vue
      AppFooter.vue
  data/
    content.ts
    services.ts
    pricing.ts
    cases.ts
    faq.ts
    integrations.ts
  utils/
    roi.ts
  styles/
    main.scss
    _tokens.scss
    _layout.scss
    _sections.scss
    _forms.scss
    _responsive.scss
```

No crear `components/ui/Button.vue`, `Card.vue`, `Badge.vue` todavia. La app no lo necesita. Usar clases SCSS compartidas: `.btn`, `.section`, `.eyebrow`, `.tag`, `.panel`.

### 13.1 Nuevo `src/App.vue`

Debe quedar como orquestador:

```vue
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from './components/sections/HeroSection.vue'
import TrustBar from './components/sections/TrustBar.vue'
import ProblemSection from './components/sections/ProblemSection.vue'
import MetaEcosystemSection from './components/sections/MetaEcosystemSection.vue'
import ServicesSection from './components/sections/ServicesSection.vue'
import RoiCalculatorSection from './components/sections/RoiCalculatorSection.vue'
import PricingSection from './components/sections/PricingSection.vue'
import FaqSection from './components/sections/FaqSection.vue'
import ContactSection from './components/sections/ContactSection.vue'
import AppFooter from './components/sections/AppFooter.vue'

gsap.registerPlugin(ScrollTrigger)

const locale = ref<'es' | 'en'>('es')
let lenis: Lenis | null = null

onMounted(() => {
  lenis = new Lenis({ duration: 1.05, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => lenis?.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  gsap.from('[data-reveal]', {
    y: 28,
    autoAlpha: 0,
    duration: 0.72,
    ease: 'power3.out',
    stagger: 0.06,
    scrollTrigger: { trigger: '.site-main', start: 'top 72%' }
  })
})

onUnmounted(() => {
  lenis?.destroy()
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
</script>

<template>
  <main class="site-main">
    <HeroSection :locale="locale" @toggle-locale="locale = locale === 'es' ? 'en' : 'es'" />
    <TrustBar />
    <ProblemSection />
    <MetaEcosystemSection />
    <ServicesSection />
    <RoiCalculatorSection />
    <PricingSection />
    <FaqSection />
    <ContactSection />
    <AppFooter />
  </main>
</template>
```

Nota: el ejemplo omite algunas secciones para mantenerlo corto. La implementacion final debe incluir todas las secciones del orden recomendado.

### 13.2 Tipos de datos

Archivo: `src/data/content.ts`

```ts
export type Channel = 'whatsapp' | 'instagram' | 'facebook' | 'messenger' | 'web' | 'crm' | 'n8n'

export type Service = {
  id: string
  category: 'ventas' | 'soporte' | 'ecommerce' | 'social' | 'automatizacion' | 'consultoria'
  title: string
  short: string
  outcome: string
  channels: Channel[]
  metaCapabilities: string[]
  deliverables: string[]
  startingAt?: string
}

export type PricingPlan = {
  id: string
  name: string
  setup: number
  monthly: number
  recommended?: boolean
  description: string
  includes: string[]
  limits: string[]
}
```

### 13.3 Ejemplo de servicio

Archivo: `src/data/services.ts`

```ts
import type { Service } from './content'

export const services: Service[] = [
  {
    id: 'whatsapp-sales-agent',
    category: 'ventas',
    title: 'Agente de ventas por WhatsApp',
    short: 'Califica leads y avisa al vendedor cuando hay oportunidad real.',
    outcome: 'Menos leads perdidos y mas conversaciones listas para cierre.',
    channels: ['whatsapp', 'crm', 'n8n'],
    metaCapabilities: ['Botones rapidos', 'Listas', 'Templates HSM', 'Webhooks', 'Estados de lectura'],
    deliverables: ['Guion conversacional', 'Flujo n8n', 'Registro CRM', 'Resumen de lead', 'Secuencia de seguimiento'],
    startingAt: '$690.000 COP/mes'
  }
]
```

## 14. Mejoras tecnicas especificas

### 14.1 Endurecer `api/lead.js`

Objetivo: evitar errores tontos antes de meter mas trafico.

Cambios:

- Capturar JSON invalido.
- Validar email basico.
- Validar longitud maxima de campos.
- Agregar honeypot `company_website`.
- Agregar `AbortController` con timeout.
- Enviar metadata: `created_at`, `user_agent`, `referer`, `utm_source`, `utm_campaign`.
- Incluir `phone` como recomendado fuerte o requerido en planes WhatsApp.

Ejemplo:

```js
const REQUIRED_FIELDS = ['name', 'business_type', 'email', 'phone', 'need']
const MAX_FIELD_LENGTH = 2000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function parseBody(req) {
  if (typeof req.body !== 'string') return req.body || {}
  try {
    return JSON.parse(req.body || '{}')
  } catch {
    return null
  }
}

function clean(value, max = MAX_FIELD_LENGTH) {
  return String(value || '').trim().slice(0, max)
}
```

No agregar base de datos para rate limit en esta fase. Si llega spam real, se agrega Turnstile o rate limit en edge. Primero medir.

### 14.2 Mejorar Three.js en `AgentNetwork.vue`

Cambios:

- Usar el tamano del contenedor.
- Pausar si `document.hidden`.
- Respetar `prefers-reduced-motion`.
- Agregar nodos con colores por canal:
  - WhatsApp: verde.
  - Instagram: coral/magenta suave.
  - Facebook: azul.
  - n8n/CRM: amber/cyan.
- Animar "paquetes" de mensajes entre nodos.
- Mantener `Points` y `LineSegments`; no meter shaders complejos en V2.

Snippet de resize:

```ts
const resize = () => {
  if (!renderer || !canvas.parentElement) return
  const { clientWidth, clientHeight } = canvas.parentElement
  camera.aspect = clientWidth / clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(clientWidth, clientHeight, false)
}
```

### 14.3 GSAP y Lenis

Cambios:

- Conectar Lenis con `ScrollTrigger.update`.
- Usar `gsap.context` dentro de secciones si se animan componentes desmontables.
- No usar animaciones por caracter en todo. Solo H1 o metricas clave.
- Respetar `prefers-reduced-motion`.

Ejemplo para secciones:

```ts
onMounted(() => {
  const ctx = gsap.context(() => {
    gsap.from('[data-card]', {
      y: 24,
      autoAlpha: 0,
      stagger: 0.05,
      scrollTrigger: { trigger: sectionRef.value, start: 'top 72%' }
    })
  }, sectionRef.value)

  cleanup = () => ctx.revert()
})
```

### 14.4 SCSS

Crear pocos parciales:

- `_tokens.scss`: colores, espaciados, radius, sombras.
- `_layout.scss`: `.site-main`, `.section`, grids.
- `_sections.scss`: hero, servicios, pricing, FAQ, casos.
- `_forms.scss`: inputs, contacto, calculadora.
- `_responsive.scss`: breakpoints.

Tokens sugeridos:

```scss
:root {
  --bg: #07110f;
  --panel: rgba(13, 24, 22, 0.78);
  --text: #eff9f4;
  --muted: #9eb3ad;
  --whatsapp: #4fffb0;
  --instagram: #ff6b9d;
  --facebook: #58a6ff;
  --automation: #ffc857;
  --danger: #ff6b6b;
  --radius: 8px;
  --max: 1180px;
}
```

### 14.5 SEO

Actualizar `index.html`:

```html
<meta name="description" content="Agenc-IA implementa agentes IA para WhatsApp, Instagram, Facebook y CRM en PYMES colombianas. Automatiza ventas, soporte, ecommerce conversacional y funnels Meta." />
<meta property="og:title" content="Agenc-IA | Agentes IA para WhatsApp, Instagram y Facebook" />
<meta property="og:description" content="Automatizacion conversacional para PYMES colombianas: WhatsApp Business API, Instagram DMs, Facebook Lead Ads, n8n y CRM." />
<meta property="og:image" content="/og-agenc-ia.jpg" />
<meta property="og:url" content="https://agenc-ia.com.co/" />
<link rel="canonical" href="https://agenc-ia.com.co/" />
```

Agregar:

- `public/robots.txt`
- `public/sitemap.xml`
- `public/og-agenc-ia.jpg`

Schema JSON-LD recomendado:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Agenc-IA",
  "areaServed": "Colombia",
  "description": "Agencia de implementacion de agentes IA para WhatsApp, Instagram, Facebook, CRM y automatizacion comercial.",
  "url": "https://agenc-ia.com.co/",
  "sameAs": []
}
</script>
```

## 15. Secciones nuevas detalladas

### 15.1 `MetaEcosystemSection.vue`

Objetivo: que el visitante entienda el sistema completo en 10 segundos.

Layout:

- Columna izquierda: texto y bullets.
- Columna derecha: diagrama visual sin libreria extra.

Diagrama:

```text
Facebook Lead Ad -> n8n -> WhatsApp -> CRM -> Vendedor
Instagram comment -> DM -> WhatsApp -> Catalogo -> Pedido
WhatsApp inbound -> Agente -> Handoff -> Seguimiento HSM
```

Copy:

```text
No automatizamos un canal aislado. Conectamos el recorrido completo: anuncio, comentario, DM, WhatsApp, CRM, seguimiento y reporte.
```

### 15.2 `ServicesSection.vue`

Requisitos:

- 15 servicios.
- Filtros por categoria.
- Cards compactas.
- Tags por canal.
- CTA en cada card: `Ver flujo`.

No usar modal en V2 si no hace falta. Un accordion/expander dentro de la card basta.

### 15.3 `InteractiveDemoSection.vue`

Tabs:

- Ventas WhatsApp.
- E-commerce conversacional.
- Instagram DM.
- Soporte.

Cada tab muestra:

- Conversacion animada.
- Datos capturados.
- Resultado enviado a CRM.
- CTA: `Quiero este flujo`.

Ejemplo de contenido:

```text
Cliente: Hola, vi el reel. Precio?
Agente IG: Te envio la info. Que talla estas buscando?
Cliente: M.
Agente IG: Perfecto. Te paso a WhatsApp con catalogo y disponibilidad.
Sistema: Lead creado: producto, talla, origen Instagram Reel.
```

### 15.4 `ComparisonSection.vue`

Tabla:

| Criterio | Chatbot generico | Agencia web tradicional | Agenc-IA |
|---|---|---|---|
| Responde WhatsApp | A veces | No | Si |
| Responde IG/FB | No | No | Si |
| Captura leads de pauta | No | Formulario | Lead Ads + WhatsApp |
| Integra CRM | Limitado | Depende | Si |
| Hace seguimiento | No | No | Templates y flujos |
| Mide ROI | No | Analytics basico | Leads, tiempos, conversion |
| Handoff humano | Basico | No | Si |

### 15.5 `PricingSection.vue`

Mostrar:

- 4 cards.
- Toggle visual `Setup + mensualidad`.
- Lista de incluido.
- Nota de costos externos.
- CTA por plan.

### 15.6 `ContactSection.vue`

Mejoras:

- Campo telefono requerido.
- Campo select con los 15 servicios.
- UTM hidden fields.
- Honeypot hidden.
- CTA alterno: link directo a WhatsApp.
- Mensaje de expectativa: "Respondemos en horario laboral. Si dejas WhatsApp, podemos enviarte el resumen del diagnostico por ahi."

## 16. Contenido de navegacion

Nav desktop:

- Servicios
- Casos
- ROI
- Precios
- FAQ
- Contacto

Nav mobile:

- Boton menu.
- Panel full-width.
- CTA fijo abajo: `Hablar por WhatsApp`.

No dejar la navegacion mobile solo oculta como hoy.

## 17. Copy sugerido por seccion

### Hero

```text
Agentes IA para vender por WhatsApp, responder Instagram y cerrar mas leads con tu equipo actual.
```

```text
Implementamos sistemas conversacionales para PYMES colombianas: WhatsApp Business API, Instagram DMs, Facebook Lead Ads, catalogos, CRM, n8n y seguimiento comercial medible.
```

### Problema

```text
Tus clientes ya estan escribiendo. El problema es que cada conversacion vive en un canal distinto y nadie alcanza a responder, clasificar y hacer seguimiento a tiempo.
```

### Servicios

```text
No compras un bot. Compras un flujo que atiende, vende, registra y avisa cuando toca intervenir.
```

### Pricing

```text
Arranca con un flujo rentable, mide resultado y escala solo cuando el numero de.
```

### Contacto

```text
Cuentanos que canal te duele mas: WhatsApp, Instagram, Facebook, ecommerce o seguimiento comercial. Te devolvemos un diagnostico corto con el primer flujo recomendado.
```

## 18. Roadmap de ejecucion realista

### Fase 0: Seguridad antes de editar

Tiempo: 30 minutos.

Tareas:

- Ejecutar `pnpm install` si hace falta.
- Ejecutar `pnpm build`.
- Confirmar que `/api/lead` no se rompe.
- Crear branch `v2-web-meta`.

Criterio de salida:

- Build actual pasa o queda registrado el error inicial.

### Fase 1: Datos y copy comercial

Tiempo: 2 a 3 horas.

Archivos:

- `src/data/content.ts`
- `src/data/services.ts`
- `src/data/pricing.ts`
- `src/data/cases.ts`
- `src/data/faq.ts`
- `src/data/integrations.ts`

Tareas:

- Migrar arrays de `App.vue` a data files.
- Crear los 15 servicios.
- Crear pricing.
- Crear FAQ.
- Crear casos piloto.
- Mantener idioma principal en espanol. El ingles puede quedar para fase posterior si no hay ventas internacionales.

Criterio de salida:

- `App.vue` ya no contiene arrays grandes de contenido.

### Fase 2: Secciones de conversion

Tiempo: 5 a 7 horas.

Componentes:

- `HeroSection.vue`
- `TrustBar.vue`
- `MetaEcosystemSection.vue`
- `ServicesSection.vue`
- `UseCasesSection.vue`
- `PricingSection.vue`
- `FaqSection.vue`
- `ContactSection.vue`
- `AppFooter.vue`

Tareas:

- Reorganizar landing.
- Agregar nav mobile.
- Agregar pricing.
- Agregar FAQ con `details`.
- Agregar integraciones.
- Agregar footer.

Criterio de salida:

- La landing se entiende sin leer todo.
- Hay CTA visible en hero, pricing y contacto.
- Mobile muestra menu funcional.

### Fase 3: Casos, demo y ROI

Tiempo: 4 a 6 horas.

Componentes:

- `InteractiveDemoSection.vue`
- `CaseStudiesSection.vue`
- `RoiCalculatorSection.vue`
- `ComparisonSection.vue`

Tareas:

- Crear demos por tab.
- Crear casos piloto con metricas objetivo.
- Crear calculadora ROI.
- Crear tabla comparativa.

Criterio de salida:

- El usuario puede calcular retorno estimado.
- Los casos conectan capacidades Meta con resultados.

### Fase 4: Animaciones y Three.js

Tiempo: 4 a 6 horas.

Archivos:

- `src/components/AgentNetwork.vue`
- `src/styles/_sections.scss`
- `src/App.vue`

Tareas:

- Red 3D por canales.
- Pulsos de mensajes.
- Scroll reveals por seccion.
- Animacion de metricas.
- Respeto a reduced motion.
- Evitar que el canvas bloquee performance en mobile.

Criterio de salida:

- Lighthouse no cae por debajo de 85 mobile.
- El canvas no se ve en blanco.
- No hay saltos de layout.

### Fase 5: API, SEO y tracking

Tiempo: 3 a 5 horas.

Archivos:

- `api/lead.js`
- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`
- `.env.example`

Tareas:

- Endurecer endpoint.
- Agregar metadata de lead.
- Preparar UTM fields.
- Agregar OG y schema.
- Agregar sitemap y robots.
- Preparar eventos para GA4/Meta Pixel si se configuran.

Criterio de salida:

- Formulario valida bien.
- Error upstream se muestra sin perder UX.
- Metadata llega a n8n.

### Fase 6: QA y deploy

Tiempo: 2 a 3 horas.

Checklist:

- `pnpm build`
- Prueba manual desktop.
- Prueba manual mobile.
- Prueba formulario con webhook de staging.
- Validar `prefers-reduced-motion`.
- Validar foco de teclado.
- Revisar textos largos en cards y botones.
- Preview deploy Vercel.

Criterio de salida:

- Landing lista para compartir con primeros leads.

## 19. Riesgos y decisiones practicas

### 19.1 No prometer pagos nativos de WhatsApp en Colombia como garantia

`META-CAPABILITIES.md` dice pagos "si disponible en Colombia". En la web vender:

```text
Links de pago y confirmacion por WhatsApp. Pagos nativos si estan disponibles para tu cuenta y caso de uso.
```

### 19.2 No prometer automatizacion total sin humano

Para legal, salud, finanzas, precios sensibles o disponibilidad:

```text
El agente prepara, califica y recomienda. El humano aprueba decisiones sensibles.
```

### 19.3 No meter dependencias nuevas

Con Vue, GSAP, Three, Lenis y SCSS alcanza.

Evitar por ahora:

- UI kit.
- Router.
- Chart library.
- Icon library.
- State manager.
- i18n library.

Agregar solo si duele de verdad.

### 19.4 No inventar casos reales

Usar "demo sectorial" o "caso piloto" hasta tener permiso de clientes reales.

### 19.5 No hacer dashboard propio en V2 si n8n/Sheets resuelve

Para la web, mostrar una maqueta visual de dashboard. Para clientes reales, arrancar con Sheets/Looker Studio si sirve.

## 20. Medicion de exito de la V2

KPIs de la web:

- Porcentaje de visitantes que hacen clic en WhatsApp.
- Porcentaje que envia formulario.
- Clics en calculadora ROI.
- Plan mas consultado.
- Servicio mas clickeado.
- Scroll depth hasta pricing.
- Leads con telefono valido.

KPIs comerciales:

- Diagnosticos agendados por semana.
- Cotizaciones enviadas.
- Cierre por plan.
- Tiempo promedio de respuesta.
- Objeciones frecuentes.

KPIs tecnicos:

- Lighthouse mobile mayor a 85.
- Build sin errores TypeScript.
- Error rate del endpoint `/api/lead`.
- Tiempo de carga inicial.
- Peso del bundle despues de modularizar.

## 21. Prioridad final de implementacion

Si hay poco tiempo, hacer en este orden:

1. Pricing + servicios 15 + copy de Meta.
2. Formulario mejorado + WhatsApp CTA.
3. Casos de estudio piloto.
4. Calculadora ROI.
5. FAQ.
6. Integraciones.
7. Three.js mejorado.
8. Animaciones avanzadas.

La parte que vende primero es el contenido y el pricing. Las animaciones ayudan, pero no reemplazan una oferta clara.

## 22. Resultado esperado

Al terminar V2, Agenc-IA debe verse como:

- Mas concreta que una agencia IA generica.
- Mas avanzada que una agencia web con chatbot.
- Mas accesible que una consultora enterprise.
- Mas confiable que un freelancer que instala bots sueltos.

Promesa final:

```text
Agenc-IA implementa agentes IA que responden, venden, registran y hacen seguimiento en los canales donde tus clientes ya estan: WhatsApp, Instagram y Facebook.
```
