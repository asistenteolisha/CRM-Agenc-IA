# API env vars for Vercel

## `api/chat.js`

| Env var | Required | Purpose |
| --- | --- | --- |
| `AGENT_API_URL` | No | Hermes Agent API base URL. Defaults to `http://srv1596458.hstgr.cloud:8642`. |
| `AGENT_API_KEY` | Yes, for Hermes replies | Bearer token for the Hermes Agent API. Without it, chat falls back to n8n or the local canned reply. |
| `AGENCIA_IA_N8N_CHAT_WEBHOOK_URL` | Yes, for n8n chat fallback | n8n webhook URL used if Hermes is not configured or fails. |
| `AGENCIA_IA_N8N_WEBHOOK_TOKEN` | Yes, for n8n | Shared token sent as `x-agent-dispatch-token` for chat and lead webhooks. |

## `api/lead.js`

| Env var | Required | Purpose |
| --- | --- | --- |
| `AGENCIA_IA_N8N_LEAD_WEBHOOK_URL` | Yes, for n8n lead delivery | n8n webhook URL for validated lead payloads. |
| `AGENCIA_IA_N8N_WEBHOOK_TOKEN` | Yes, for n8n | Shared token sent as `x-agent-dispatch-token`. |
| `TELEGRAM_BOT_TOKEN` | No | Telegram bot token for lead notifications. |
| `TELEGRAM_CHAT_ID` | No | Telegram chat/channel ID for lead notifications. |

Both endpoints return controlled fallbacks if optional integrations are missing. `api/lead.js` still validates and accepts leads without Telegram or n8n configured, but lead delivery to n8n only happens when both `AGENCIA_IA_N8N_LEAD_WEBHOOK_URL` and `AGENCIA_IA_N8N_WEBHOOK_TOKEN` are set in Vercel.
