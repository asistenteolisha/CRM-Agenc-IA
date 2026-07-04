# WhatsApp Cloud API - Agenc-IA Olisha

Fecha: 2026-07-02

## Estado

| Tarea | Estado | Nota |
| --- | --- | --- |
| Crear System User `agenc-ia-bot` Admin | Bloqueado | Chrome DevTools MCP falla antes de abrir Chrome. |
| Asignar assets App/Page/IG/WA Full control | Bloqueado | Requiere Business Settings en Meta. |
| Generar token permanente `Never` | Bloqueado | No imprimir ni guardar el token en este repo. |
| Iniciar tunnel `cloudflared` | Bloqueado | SSH al VPS devuelve `Permission denied` desde Codex. |
| Configurar webhook Olisha | Bloqueado | Falta URL HTTPS del tunnel y acceso Meta. |
| Actualizar agente en VPS | Bloqueado | Falta token y SSH. |
| Probar end-to-end | Parcial | Health y verificacion GET OK; POST webhook redirige a login. |

## IDs

| Recurso | Valor |
| --- | --- |
| Meta App | Olisha (`2733201813740919`) |
| Business Portfolio | Agenc-IA Olisha (`1020005723726843`) |
| WhatsApp Business Account | `873265519173966` |
| Phone Number ID | `1161083863765192` |
| Facebook Page | Agenc-IA (`1166638643204822`) |
| Instagram | `@agenc_ia240` |
| VPS | `srv1596458.hstgr.cloud` |
| Puerto agente | `32890` |

## Verificado desde Codex

```powershell
curl.exe http://srv1596458.hstgr.cloud:32890/health
```

Resultado: `status: ok`.

```powershell
curl.exe "http://srv1596458.hstgr.cloud:32890/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=<VERIFY_TOKEN>&hub.challenge=ok_challenge"
```

Resultado: `ok_challenge`.

```powershell
curl.exe -i -X POST http://srv1596458.hstgr.cloud:32890/whatsapp/webhook -H "Content-Type: application/json" --data-raw "{}"
```

Resultado actual: `302 Found` a `login?next=/whatsapp/webhook`. Antes de produccion, el POST publico de Meta debe responder sin login.

## Bloqueos exactos

Chrome DevTools MCP:

```text
Mcp error: -32602: js: codex/sandbox-state-meta: sandboxCwd must use the file URI scheme
```

SSH:

```text
ssh -i ~/.ssh/codex_vps_ed25519 root@srv1596458.hstgr.cloud "echo SSH_OK"
ssh: connect to host srv1596458.hstgr.cloud port 22: Permission denied
```

## Pasos pendientes

### 1. Meta Business Settings

1. Abrir Business Settings del portfolio Agenc-IA Olisha.
2. Crear System User `agenc-ia-bot` tipo Admin.
3. Asignar Full control a:
   - App Olisha.
   - Page Agenc-IA.
   - Instagram `@agenc_ia240`.
   - WhatsApp Business Account `873265519173966`.
4. Generar token con expiracion `Never`.
5. Seleccionar todos los permisos disponibles para la app. Minimo:
   - `business_management`
   - `whatsapp_business_management`
   - `whatsapp_business_messaging`
   - permisos de Page/Instagram que Meta muestre para mensajes y metadata.

### 2. VPS

Ejecutar en el VPS, no en este repo:

```bash
export WHATSAPP_ACCESS_TOKEN='PEGAR_TOKEN'
export WHATSAPP_VERIFY_TOKEN='PEGAR_VERIFY_TOKEN'
export WHATSAPP_PHONE_NUMBER_ID='1161083863765192'
export WHATSAPP_WABA_ID='873265519173966'
export META_APP_ID='2733201813740919'
```

Actualizar la configuracion real del agente con esos valores y reiniciar el servicio. No dejar el token en logs.

### 3. Tunnel

En el VPS:

```bash
cloudflared tunnel --url http://127.0.0.1:32890 --no-autoupdate
```

Copiar la URL `https://*.trycloudflare.com` y validar:

```bash
curl -i "https://TUNNEL.trycloudflare.com/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=$WHATSAPP_VERIFY_TOKEN&hub.challenge=ok_challenge"
curl -i -X POST "https://TUNNEL.trycloudflare.com/whatsapp/webhook" -H "Content-Type: application/json" --data '{}'
```

El POST no debe redirigir a login.

### 4. Meta Developers

En App Olisha > WhatsApp > Configuration:

- Callback URL: `https://TUNNEL.trycloudflare.com/whatsapp/webhook`
- Verify token: usar el valor privado.
- Webhook fields: suscribir `messages`.

### 5. Prueba final

1. Enviar mensaje real al numero conectado.
2. Confirmar que Meta entrega evento `messages`.
3. Confirmar respuesta del agente.
4. Revisar logs del VPS sin imprimir el token.
