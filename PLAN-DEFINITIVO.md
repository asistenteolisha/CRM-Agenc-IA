# PLAN DEFINITIVO DE EJECUCION - Agenc-IA
## Fecha: 2026-06-30

Agenc-IA vende agentes IA a PYMEs colombianas. La prioridad no es "arreglar todo"; es cerrar el menor conjunto de huecos que afecta ventas, confianza, operacion y capacidad de repetir el servicio con futuros clientes.

## 1. Cambio de priorizacion

La auditoria original tiene un punto desactualizado: en Agenc-IA ya existen `api/chat.js` y `api/lead.js`. El problema ya no es "no existe `/api/chat`"; ahora es verificar configuracion real en Vercel, UX movil, tracking, observabilidad y conversion.

### P0 - Ingresos y confianza inmediata

| Prioridad | Tarea | Impacto negocio | Responsable | Est. |
|---|---|---:|---|---:|
| P0.1 | Verificar flujo completo: web -> `/api/lead` -> n8n -> Telegram/CRM -> respuesta humana | Evita perder leads pagados u organicos | Codex + Daniel | 2h + 30m |
| P0.2 | Verificar chat real: web -> `/api/chat` -> Hermes/n8n -> fallback correcto | Dogfooding del producto que vendemos | Codex + Daniel | 2h + 30m |
| P0.3 | Corregir widget movil: viewport, teclado, overflow <360px | Primer contacto en movil, canal principal en Colombia | Codex | 2h |
| P0.4 | Quitar/condicionar placeholders `PIXEL_ID` y `GA_MEASUREMENT_ID` | Medicion limpia para pauta y decisiones | Codex + Daniel | 1h + 30m |
| P0.5 | Definir dominio canonico y WhatsApp comercial oficial | Evita links rotos, OG mal compartido y confusion comercial | Daniel | 30m |
| P0.6 | OG PNG 1200x630, robots.txt, sitemap.xml | Mejora compartidos, SEO basico y profesionalismo | Codex | 2h |
| P0.7 | Security headers basicos en Vercel | Confianza minima y menor superficie de riesgo | Codex | 1h |

### P1 - Operacion estable para no caerse vendiendo

| Prioridad | Tarea | Impacto negocio | Responsable | Est. |
|---|---|---:|---|---:|
| P1.1 | Crear swap en VPS antes de sumar servicios | Reduce riesgo OOM en demos/clientes | Daniel guiado por Codex | 30m |
| P1.2 | Backup automatizado VPS: configs, volumes criticos, env inventory sin secretos en repo | Recuperacion ante error humano/deploy | Codex + Daniel | 3h + 30m |
| P1.3 | Health endpoints para Meta Business MCP e Instagram MCP | Permite monitoreo y soporte proactivo | Codex | 2h |
| P1.4 | Uptime Kuma monitoreando web, APIs, MCPs, n8n, Traefik routes | Detectar fallas antes del cliente | Codex + Daniel | 2h + 30m |
| P1.5 | Arreglar Traefik 8tdz y permiso `published.json` | Cliente/agente existente estable | Codex + Daniel | 2h |
| P1.6 | Auth minima en dashboard nmcn | Evita exposicion interna | Codex + Daniel | 2h |

### P2 - Credibilidad comercial y casos demostrables

| Prioridad | Tarea | Impacto negocio | Responsable | Est. |
|---|---|---:|---|---:|
| P2.1 | Colegio: sacar MP4 raw del deploy o moverlos a YouTube/Vimeo/Cloudinary | Deploy confiable y caso cliente vendible | Codex + Daniel | 4h + decision |
| P2.2 | Colegio: corregir service worker roto | Evita cache roto en produccion | Codex | 1h |
| P2.3 | Colegio: comprimir imagenes grandes y arreglar PWA icons | Performance y presentacion | Codex | 3h |
| P2.4 | Analytics reales en ambas webs | Saber que vende y que no | Codex + Daniel | 2h + IDs |
| P2.5 | Prefer-reduced-motion y fixes accesibilidad basicos | Menos friccion, mejor calidad percibida | Codex | 2h |

### P3 - Escalabilidad y producto repetible

| Prioridad | Tarea | Impacto negocio | Responsable | Est. |
|---|---|---:|---|---:|
| P3.1 | Agent Factory: plantilla minima por cliente con env matrix, canales, flujos n8n y checklist | Reduce tiempo de entrega por cliente | Codex | 4h |
| P3.2 | Integrar Meta Business MCP e Instagram MCP como herramientas del playbook comercial | Convierte MCPs en oferta vendible, no solo infraestructura | Codex + Daniel | 3h |
| P3.3 | n8n workflow base: lead -> calificacion -> WhatsApp -> CRM/log -> alerta | Entrega repetible para PYMEs | Codex + Daniel | 4h |
| P3.4 | Dashboard operativo central: estado clientes/agentes/MCPs/cron jobs | Escala soporte sin memoria manual | Codex | 6h |
| P3.5 | CI minimo: build en PR/push para Agenc-IA y Colegio | Evita deploys rotos | Codex | 2h |

## 2. Dependencias entre tareas

### Dependencias duras

| Tarea bloqueada | Depende de | Por que |
|---|---|---|
| Analytics reales | GA4 ID, Meta Pixel ID, dominio final | Sin IDs reales solo se ensucia medicion |
| Sitemap/canonical/OG final | Dominio final elegido | Evita indexar URL equivocada |
| Chat real validado | `AGENT_API_KEY`, URL Hermes/n8n, token webhook en Vercel | Sin secretos no hay prueba end-to-end |
| Lead real validado | Webhook n8n, token, destino Telegram/CRM | Sin destino no hay confirmacion comercial |
| Uptime Kuma util | Health endpoints primero | Monitorear endpoints incompletos da falsos positivos |
| MCPs en playbook cliente | Health + auth + tool list estable | Antes de venderlo debe ser operable |
| Colegio assets | Decision de hosting video | No comprimir dos veces ni mover a destino temporal |
| Cambios VPS riesgosos | Backup minimo primero | No tocar Traefik/volumes sin salida de emergencia |

### Dependencias blandas

| Tarea | Puede empezar antes | Nota |
|---|---|---|
| Fix movil chat | Si | No depende de secretos |
| Security headers | Si | Validar que CSP no rompa GA/Pixel cuando se activen |
| Robots/sitemap | Si | Usar dominio actual y cambiar al final si Daniel define otro |
| CI minimo | Si | No bloquea negocio, pero reduce regresiones |
| Agent Factory template | Si | Usar Agenc-IA como cliente piloto |

## 3. Ecosistema objetivo

### Flujo comercial minimo

1. Visitante llega por SEO, referido, pauta o redes.
2. Web carga rapido en movil, con tracking real y OG correcto.
3. Lead entra por formulario, chat o WhatsApp.
4. `/api/lead` normaliza datos y envia a n8n.
5. n8n registra, califica, alerta a Daniel y dispara seguimiento.
6. Si el lead viene por chat, `/api/chat` usa Hermes/n8n y cae a respuesta local si falla.
7. Meta Business MCP e Instagram MCP permiten operar campañas, comentarios, DMs, posts e insights desde agentes internos.

### Rol de MCPs propios

| MCP | Uso interno inmediato | Uso vendible a clientes |
|---|---|---|
| Meta Business MCP - 26 tools | Gestionar Facebook Page, Lead Ads, Messenger, WhatsApp, comentarios, insights | Agente de ventas WhatsApp, respuesta Messenger, lead ads -> WhatsApp, moderacion FB, reportes |
| Instagram MCP - 10 tools | DMs, comentarios, contenido, metricas, menciones | Agente de IG DM, comentario -> DM, publicacion asistida, monitoreo de menciones |
| codebase-memory-mcp | Auditoria y mantenimiento rapido de repos | Acelera soporte interno, no vender directo aun |
| n8n | Orquestacion entre web, MCPs, CRM y alertas | Backbone de automatizaciones por cliente |
| Uptime Kuma | Monitoreo operativo | SLA interno y evidencia para clientes Pro |
| Agent Factory | Plantillas de provisionamiento | Reducir delivery de 5-15 dias a paquetes repetibles |

ponytail: no crear MCP nuevo para n8n/Kuma en esta fase; usar webhooks/API/health checks hasta que el uso manual sea repetitivo.

## 4. Mejoras adicionales no consideradas

| Mejora | Prioridad | Motivo | Responsable | Est. |
|---|---|---|---|---:|
| Consentimiento de datos en formularios: Habeas Data Colombia | P0 | Captura nombre, email, telefono; debe informar uso y contacto | Codex + Daniel valida texto | 1h |
| Registro simple de leads fallidos | P0 | Si n8n falla, Telegram puede fallar tambien; necesitamos rastro minimo | Codex | 1h |
| Eventos de conversion: lead_submit, chat_open, whatsapp_click | P0 | Medir embudo real | Codex + Daniel IDs | 1.5h |
| UTM persistida en lead/chat | P1 | Saber que campaña trae ventas | Codex | 1h |
| Matriz de secretos por entorno | P1 | Evita perder tiempo buscando env vars en Vercel/VPS | Codex + Daniel | 1.5h |
| Playbook de onboarding cliente | P2 | Repetibilidad: accesos, Meta, IG, WhatsApp, dominio, CRM, horarios | Codex | 2h |
| Plantillas de demo por vertical | P2 | PYMEs compran cuando se ven reflejadas: autos, restaurantes, opticas, educacion | Daniel + Codex | 3h |
| Politica de handoff humano | P2 | Define cuando IA pasa a Daniel/cliente | Daniel + Codex | 1h |
| Auditoria mensual de cron jobs | P2 | Evita automatizaciones invisibles rotas | Codex | 1h/mes |
| Separacion por cliente: tokens, logs, workflows, alertas | P3 | Escalabilidad y seguridad multi-cliente | Codex | 4h |

## 5. Plan dia por dia

Estimacion: 10 dias habiles, 4-6 horas efectivas por dia. Si Daniel entrega IDs, secretos y decisiones rapido, P0 queda en 2 dias.

### Dia 1 - Conversion web real

| Tarea | Responsable | Tiempo | Resultado |
|---|---|---:|---|
| Verificar env vars actuales en Vercel: lead, chat, Telegram, n8n, Hermes | Daniel + Codex | 45m | Lista de faltantes |
| Probar `/api/lead` end-to-end con payload real | Codex | 45m | Lead recibido o fallo documentado |
| Probar `/api/chat` end-to-end con mensaje real | Codex | 45m | Respuesta IA o fallback validado |
| Corregir widget movil: ancho, alto, teclado, overflow acciones | Codex | 2h | Chat usable en 320px-430px |
| Quitar scripts GA/Pixel cuando no haya IDs reales | Codex | 45m | Sin placeholders en produccion |
| Daniel define dominio canonico y confirma WhatsApp comercial | Daniel | 30m | Dominio/telefono congelados |

### Dia 2 - Tracking, SEO basico y confianza

| Tarea | Responsable | Tiempo | Resultado |
|---|---|---:|---|
| Activar GA4 y Meta Pixel reales por env vars | Codex + Daniel | 1h | PageView sin placeholders |
| Eventos `chat_open`, `whatsapp_click`, `lead_submit` | Codex | 1.5h | Conversiones medibles |
| Crear OG PNG 1200x630 y actualizar meta tags | Codex | 1h | Compartidos correctos en Facebook/WhatsApp |
| Crear `robots.txt` y `sitemap.xml` | Codex | 45m | SEO tecnico minimo |
| Agregar texto de Habeas Data en formulario/contacto | Codex + Daniel | 45m | Captura de datos mas seria |
| Security headers en `vercel.json` | Codex | 45m | Headers basicos activos |

### Dia 3 - VPS primero estable, luego cambios

| Tarea | Responsable | Tiempo | Resultado |
|---|---|---:|---|
| Inventario VPS: containers, ports, volumes, cron jobs | Codex + Daniel | 1h | Mapa operativo actual |
| Crear swap 2-4GB | Daniel guiado por Codex | 30m | Menor riesgo OOM |
| Backup minimo de configs y volumes criticos | Codex + Daniel | 2h | Restauracion posible |
| Corregir Traefik 8tdz | Codex + Daniel | 1h | Ruta estable |
| Corregir permiso `published.json` 8tdz | Codex + Daniel | 30m | Agente puede publicar |

### Dia 4 - Observabilidad

| Tarea | Responsable | Tiempo | Resultado |
|---|---|---:|---|
| Agregar `/health` a Meta Business MCP | Codex | 1h | Endpoint monitoreable |
| Agregar `/health` a Instagram MCP | Codex | 1h | Endpoint monitoreable |
| Configurar Uptime Kuma: Agenc-IA, Colegio, n8n, MCPs, agentes VPS | Daniel + Codex | 1.5h | Alertas basicas |
| Documentar runbook de caida: que mirar primero | Codex | 1h | Soporte mas rapido |
| Verificar Hermes local detecta codebase-memory-mcp | Daniel + Codex | 30m | Herramienta disponible |

### Dia 5 - Colegio como caso vendible

| Tarea | Responsable | Tiempo | Resultado |
|---|---|---:|---|
| Decidir destino videos: YouTube/Vimeo/Cloudinary | Daniel | 30m | Decision cerrada |
| Reemplazar MP4 raw por embeds/URLs externas | Codex | 2h | Deploy baja fuerte |
| Corregir `public/sw.js` | Codex | 1h | PWA no cachea `/src/main.tsx` |
| Comprimir imagenes grandes sin cambiar nombres publicos | Codex | 2h | Performance mejor |
| Corregir icons PWA JPG -> PNG si aplica | Codex | 45m | PWA mas limpia |

### Dia 6 - Seguridad y accesibilidad minima

| Tarea | Responsable | Tiempo | Resultado |
|---|---|---:|---|
| Auth minima en dashboard nmcn | Codex + Daniel | 2h | Dashboard no publico |
| Revisar CORS/rate limit server-side en APIs Agenc-IA | Codex | 1h | Menos abuso |
| `prefers-reduced-motion` en Agenc-IA/Colegio donde falte | Codex | 1.5h | UX accesible |
| Revisar `v-html` del chat y mantener escape/test minimo | Codex | 45m | XSS bajo control |
| Build de Agenc-IA y Colegio | Codex | 45m | Regresiones visibles |

### Dia 7 - Producto repetible con MCPs

| Tarea | Responsable | Tiempo | Resultado |
|---|---|---:|---|
| Crear matriz de oferta por canal: WhatsApp, IG, FB, Lead Ads | Codex + Daniel | 1h | Paquetes claros |
| Mapear 26 tools Meta a casos de uso vendibles | Codex | 1h | Catalogo interno |
| Mapear 10 tools Instagram a casos de uso vendibles | Codex | 45m | Catalogo interno |
| Crear workflow base n8n: lead -> califica -> WhatsApp/alerta -> log | Codex + Daniel | 2h | Demo operable |
| Definir handoff humano y horarios por cliente | Daniel + Codex | 45m | Regla reusable |

### Dia 8 - Agent Factory y onboarding

| Tarea | Responsable | Tiempo | Resultado |
|---|---|---:|---|
| Plantilla cliente en Agent Factory: envs, canales, n8n, MCPs, alertas | Codex | 3h | Provisionamiento repetible |
| Checklist onboarding cliente: accesos Meta, IG, WABA, CRM, dominio, copy | Codex | 1.5h | Menos improvisacion |
| Crear estructura por cliente: `client_id`, secretos, workflows, logs | Codex | 1.5h | Base multi-cliente |
| Daniel valida campos comerciales obligatorios | Daniel | 30m | Checklist usable en ventas |

### Dia 9 - CI/CD minimo y documentacion viva

| Tarea | Responsable | Tiempo | Resultado |
|---|---|---:|---|
| GitHub Action/Vercel check: build Agenc-IA | Codex | 1h | Deploy menos riesgoso |
| GitHub Action/Vercel check: build Colegio | Codex | 1h | Caso cliente protegido |
| Consolidar docs operativos en Obsidian o repo docs | Codex + Daniel | 1.5h | Una fuente de verdad |
| Crear calendario mensual de auditoria: cron, backups, MCPs, analytics | Codex | 1h | Mantenimiento simple |
| Revisar gbrain estado basico | Daniel + Codex | 1h | Memoria confiable |

### Dia 10 - Validacion comercial y demo

| Tarea | Responsable | Tiempo | Resultado |
|---|---|---:|---|
| Simular lead frio desde web movil | Daniel + Codex | 30m | Flujo real validado |
| Simular lead desde Instagram/FB usando MCPs si aplica | Daniel + Codex | 1h | Demo multi-canal |
| Simular caida de n8n/Hermes y revisar fallback | Codex | 45m | Degradacion aceptable |
| Revisar dashboards/alertas Uptime Kuma | Daniel + Codex | 45m | Alertas llegan |
| Preparar demo de 15 minutos para PYME | Daniel + Codex | 2h | Guion vendible |
| Decidir siguiente vertical: autos, restaurantes, opticas o educacion | Daniel | 30m | Siguiente paquete |

## 6. Que puede hacer Codex vs Daniel

### Codex puede hacer automaticamente

- Editar Agenc-IA: widget, APIs, tracking condicional, SEO tecnico, headers, sitemap, robots.
- Crear pruebas/manual checks pequenos para chat, lead y formatter.
- Editar Colegio: service worker, assets referenciados, icons, performance basica.
- Preparar scripts/checklists/runbooks.
- Agregar health endpoints en MCPs.
- Crear workflows n8n exportables si existen credenciales o ejemplos.
- Crear CI minimo.
- Mapear tools de Meta/Instagram a ofertas y plantillas operativas.

### Requiere intervencion manual de Daniel

- Entregar o crear GA4 Measurement ID y Meta Pixel ID.
- Confirmar dominio canonico final.
- Confirmar numero WhatsApp comercial y cuenta WABA usada para ventas.
- Pegar secretos en Vercel/VPS/n8n cuando Codex no tenga acceso.
- Acceder al VPS si requiere 2FA/SSH no disponible.
- Decidir hosting de videos Colegio.
- Validar copy legal de Habeas Data.
- Aprobar cambios en activos/clientes antes de publicar.
- Probar alertas reales en Telegram/WhatsApp desde su telefono.

## 7. Escalabilidad para futuros clientes

### Regla de oro

Cada cliente debe tener configuracion separada: tokens, workflows, logs, alertas, horarios, prompt, politicas de handoff y canales. Compartir codigo esta bien; compartir secretos o estados operativos no.

### Paquete minimo por cliente

| Area | Debe existir |
|---|---|
| Identidad | `client_id`, nombre comercial, vertical, ciudad, tono |
| Canales | WhatsApp, Instagram, Facebook, web chat, formulario |
| Secretos | Tokens por cliente fuera del repo |
| Automatizacion | Workflow n8n versionado/exportado |
| IA | Prompt, FAQ, limites, handoff |
| Datos | CRM/log destino, retencion, consentimiento |
| Monitoreo | Health checks, Uptime Kuma, alerta responsable |
| Reporte | Leads, conversaciones, conversiones, errores |

### Como usar los MCPs propios para escalar

- Meta Business MCP debe ser el puente para WhatsApp Business, Facebook Page, Messenger, Lead Ads, comentarios e insights.
- Instagram MCP debe cubrir DMs, comentarios, publicaciones, menciones e insights.
- n8n orquesta. Los MCPs ejecutan acciones. Agent Factory provisiona la plantilla. Uptime Kuma vigila.
- Primero vender 3 paquetes repetibles:
  1. **WhatsApp Vendedor 24/7**: captura, califica, agenda y alerta.
  2. **Instagram DM + Comentarios**: responde engagement y convierte comentarios en conversaciones.
  3. **Meta Ads Lead Follow-up**: Lead Ads -> WhatsApp inmediato -> CRM -> seguimiento.

ponytail: no construir dashboard multi-tenant completo hasta tener 3 clientes activos usando el mismo flujo; antes basta una matriz por cliente + Uptime Kuma + n8n.

## 8. Definicion de terminado

### P0 terminado cuando

- Un lead real desde movil llega a Daniel con UTM y datos correctos.
- Chat responde con IA o fallback claro, sin romper en 320px.
- No hay placeholders de GA/Pixel en produccion.
- WhatsApp click, chat open y lead submit quedan medidos.
- OG/robots/sitemap/security headers estan publicados.

### P1 terminado cuando

- VPS tiene swap y backup minimo probado.
- MCPs, n8n, webs y agentes tienen health/monitoring.
- 8tdz y nmcn no tienen fallas operativas obvias.

### P2 terminado cuando

- Colegio baja peso de deploy de forma material.
- Service worker no cachea rutas inexistentes.
- Caso Colegio puede mostrarse sin disculpas tecnicas.

### P3 terminado cuando

- Existe una plantilla repetible de cliente.
- Meta Business MCP e Instagram MCP estan incluidos en los flujos vendibles.
- Hay checklist de onboarding y handoff humano.

## 9. Orden recomendado si solo hay 8 horas

1. Probar y arreglar lead/chat end-to-end.
2. Corregir widget movil.
3. Quitar placeholders GA/Pixel y activar tracking real si Daniel entrega IDs.
4. Crear OG PNG, robots, sitemap y headers.
5. Crear swap + backup minimo VPS.
6. Health checks MCP + Uptime Kuma.

Eso cubre ventas, confianza y operacion. Lo demas puede esperar sin bloquear ingresos.
