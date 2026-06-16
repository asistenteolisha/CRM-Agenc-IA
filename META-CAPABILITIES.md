# Capacidades Meta Business API — Agenc-IA (Junio 2026)

## Estado: TODOS los permisos habilitados en ambos tokens

### WhatsApp Business API (WABA: 2267260200684454)
- **Número:** +57 1116814244856682
- **System User:** AgencIA01 (token permanente EAAf1v...)
- **Webhook:** Conectado y funcionando

#### Capacidades habilitadas:
1. **Mensajes de texto** — Respuestas automáticas 24/7
2. **Mensajes multimedia** — Imágenes, videos, documentos, audio, stickers
3. **Mensajes de ubicación** — Enviar/recibir ubicaciones
4. **Mensajes de contacto** — Compartir vCards
5. **Mensajes interactivos:**
   - Listas interactivas (hasta 10 opciones)
   - Botones de respuesta rápida (hasta 3)
   - Botones de llamada a la acción (CTA)
   - Secciones con descripción
6. **Mensajes de catálogo:**
   - Enviar productos del catálogo de WhatsApp
   - Mensajes de pedido (order details)
   - Carrito de compras
7. **Templates de mensajes (HSM):**
   - Notificaciones de seguimiento
   - Alertas de inventario
   - Recordatorios de cita
   - Mensajes de bienvenida
   - Promociones y ofertas
8. **Reacciones a mensajes** — Emojis como respuesta
9. **Citas/respuestas** — Reply to specific messages
10. **Marcado de mensajes** — Read receipts, typing indicators
11. **Archivos adjuntos** — PDFs, documentos varios
12. **Contactos y perfil:**
   - Leer perfil de contactos
   - Actualizar perfil del negocio (foto, descripción, dirección, horario, email, website)
   - Obtener estado de cuenta verificada
13. **Medios:**
   - Subir/download de medios
   - Envío de stickers (incluidos animated)
14. **Flujos de conversación (Flows):**
   - Formularios interactivos dentro de WhatsApp
   - Captura de datos estructurados
   - Encuestas y cuestionarios
15. **Pagos (si disponible en Colombia):**
   - Solicitar pagos dentro del chat
   - Links de pago
16. **QR codes y links wa.me** — Para captura de leads
17. **Webhooks en tiempo real:**
   - Mensajes recibidos
   - Estados de entrega (sent, delivered, read)
   - Cambios de estado de contacto
   - Errores y límites de rate

### Facebook Pages API (Page ID: 1316176550044533)
- **App:** Agenc-AI
- **Permisos habilitados:**

#### Capacidades:
1. **Gestión de comentarios:**
   - Leer todos los comentarios en posts
   - Responder comentarios automáticamente
   - Ocultar/mostrar comentarios
   - Eliminar comentarios ofensivos
   - Detectar sentimiento en comentarios
2. **Gestión de mensajes (Messenger):**
   - Recibir/enviar mensajes privados
   - Respuestas rápidas
   - Mensajes con attachments
   - Persistent menu
   - Ice breakers (preguntas iniciales sugeridas)
3. **Gestión de posts:**
   - Crear posts programados
   - Publicar contenido (texto, imagen, video, enlace)
   - Obtener métricas de posts (reacciones, shares, alcance)
4. **Gestión de página:**
   - Actualizar información de la página
   - Gestionar roles de la página
   - Obtener estadísticas de la página (insights)
   - Gestión de eventos
5. **Webhooks:**
   - Comentarios en tiempo real
   - Mensajes en tiempo real
   - Reacciones
   - Posts publicados
6. **Lead Ads:**
   - Capturar leads de formularios de Facebook
   - Webhooks de nuevos leads
   - Descargar información del lead

### Instagram API (conectado a la misma App)
- **Permisos habilitados:**

#### Capacidades:
1. **Gestión de comentarios:**
   - Leer comentarios en posts y reels
   - Responder comentarios automáticamente
   - Moderación de comentarios
   - Detectar y filtrar spam
2. **Gestión de mensajes (DM):**
   - Recibir/enviar DMs
   - Respuestas a stories
   - Mensajes multimedia
3. **Gestión de contenido:**
   - Publicar fotos, videos, reels, carruseles
   - Programar publicaciones
   - Obtener métricas de posts
   - Gestión de hashtags
4. **Gestión de perfil:**
   - Actualizar biografía
   - Obtener insights de cuenta
   - Métricas de audiencia
5. **Menciones y tags:**
   - Monitorear menciones de la marca
   - Responder a menciones
   - Tracking de UGC (user-generated content)
6. **Webhooks:**
   - Comentarios en tiempo real
   - Mensajes en tiempo real
   - Menciones

### Servicios de IA que podemos construir con esto:

#### 1. Chatbot WhatsApp Multi-Canal
- Respuesta automática 24/7 en WhatsApp
- Calificación de leads (presupuesto, urgencia, preferencias)
- Envío de catálogo de productos
- Agendamiento de citas
- Seguimiento post-venta
- Notificaciones proactivas (templates HSM)
- Flujos de conversación personalizados
- Integración con CRM para seguimiento

#### 2. Agente de Social Media
- Respuesta automática a comentarios en FB e Instagram
- Moderación inteligente de comentarios tóxicos
- Publicación automática de contenido programado
- Captura de leads desde comentarios ("Déjanos tu número")
- Respuesta a DMs de Instagram
- Monitoreo de menciones
- Reportes de engagement automáticos

#### 3. Funnel Completo de Captura
- Lead Ad en Facebook → Webhook → WhatsApp automático
- Comentario en post → DM automático con info
- Link en bio → Formulario → WhatsApp
- QR code físico → WhatsApp → Calificación → CRM
- Story mention → DM de agradecimiento + oferta

#### 4. E-commerce Conversacional
- Catálogo de WhatsApp con productos
- Pedidos directamente en el chat
- Confirmación de pedido por template HSM
- Seguimiento de envío automático
- Recordatorios de carrito abandonado
- Cross-selling inteligente

#### 5. Soporte Multi-Plataforma
- Unificar WhatsApp + FB Messenger + Instagram DMs
- Handoff a humano cuando el bot no puede resolver
- Historial de conversación unificado
- Métricas de satisfacción
- Escalamiento automático por urgencia

#### 6. Marketing Automatizado
- Publicación cross-platform (FB + IG simultáneo)
- Respuesta automática a engagement
- Retargeting vía WhatsApp a leads fríos
- Campañas de reactivación por template
- A/B testing de mensajes
- Reportes automatizados de métricas

#### 7. Análisis de Competencia y Mercado
- Monitorear menciones de competidores
- Tracking de tendencias en el sector
- Sentiment analysis de comentarios
- Reportes de rendimiento comparativo
