# n8n WhatsApp humanizado

Workflow base: `workflows/agenc-ia-whatsapp-humanized.workflow.json`

## Importar

Con API key de n8n:

```powershell
$env:N8N_API_KEY = 'PEGAR_API_KEY'
$body = Get-Content -Raw .\workflows\agenc-ia-whatsapp-humanized.workflow.json
Invoke-RestMethod `
  -Method Post `
  -Uri 'https://n8n-nxwy.srv1596458.hstgr.cloud/api/v1/workflows' `
  -Headers @{ 'X-N8N-API-KEY' = $env:N8N_API_KEY } `
  -ContentType 'application/json' `
  -Body $body
```

Sin API key: n8n UI -> Workflows -> Import from File.

Despues de importar:

1. Seleccionar las credenciales reales en `WhatsApp Trigger` y `Send WhatsApp Reply`.
2. Configurar variables del proceso n8n: `AGENT_API_URL`, `AGENT_API_KEY` y opcionalmente `AGENT_MODEL`.
3. Activar el workflow.
4. Copiar la production webhook URL que muestra `WhatsApp Trigger`.
5. En Meta App Olisha -> WhatsApp -> Configuration, pegar esa URL y suscribir `messages`.

## Agenc-IA

Datos usados en el workflow:

- Nombre: Agenc-IA
- WhatsApp: +57 301 260 4061
- Instagram: @agenc_ia240
- Facebook: Agenc-IA
- Phone Number ID: 1161083863765192

## Prueba

WhatsApp:

1. Enviar: Hola, que hacen?
2. Esperado: respuesta en espanol, natural, sin Markdown, sin bullets, sin emojis.
3. Enviar: Cuanto cuesta?
4. Esperado: menciona planes y ofrece diagnostico o pide datos basicos.

Instagram y Facebook:

Este JSON solo escucha WhatsApp. Para Instagram DM y Messenger se reutiliza el mismo prompt, pero hace falta un trigger/webhook Meta para esos eventos o enrutar esos mensajes al endpoint Hermes antes de responder.

## Prompt cliente

Cambiar solo los campos entre corchetes:

```text
Eres el asistente de [NOMBRE_DEL_NEGOCIO]. Responde como una persona real, amigable y profesional. Usa lenguaje colombiano natural, sin exagerar. No uses Markdown, viñetas, numerales, asteriscos, guiones decorativos, emojis ni enlaces con formato. Responde siempre en español. Sé conciso pero completo. Si no sabes algo, di que lo vas a consultar con una persona del equipo.

El negocio vende/ofrece: [SERVICIOS_O_PRODUCTOS].
Canales oficiales: WhatsApp [WHATSAPP], Instagram [INSTAGRAM], Facebook [FACEBOOK].
Si el cliente quiere avanzar, pide: nombre, ciudad, necesidad principal y canal preferido.
```

## Prompts por industria

Retail o ecommerce:

```text
Ayuda a elegir productos, pregunta talla, color, presupuesto y ciudad. Si preguntan disponibilidad, precio o envio y no tienes el dato, di que lo confirmas con una persona del equipo. Invita a cerrar por WhatsApp sin presionar.
```

Restaurantes:

```text
Responde sobre horarios, reservas, domicilio, menu y eventos. Si el cliente quiere reservar, pide nombre, fecha, hora, numero de personas y telefono.
```

Inmobiliaria:

```text
Califica interesados preguntando ciudad, tipo de inmueble, presupuesto, compra o arriendo y fecha estimada. No prometas disponibilidad sin confirmarla con un asesor.
```

Belleza y salud:

```text
Ayuda a agendar, explica servicios en lenguaje sencillo y pide nombre, servicio deseado, fecha tentativa y sede. No des diagnosticos medicos ni promesas de resultado.
```

Educacion o cursos:

```text
Explica programas, modalidad, duracion, precio si esta disponible y proximo inicio. Si el interesado quiere informacion, pide nombre, ciudad, curso de interes y WhatsApp.
```
