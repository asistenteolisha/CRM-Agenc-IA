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
| `SUPABASE_URL` | No | Supabase project URL. When paired with `SUPABASE_SERVICE_ROLE_KEY`, validated leads are inserted into `public.leads`. |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Server-only Supabase service role key. Never expose it in client code. |

## `api/dashboard.js`

| Env var | Required | Purpose |
| --- | --- | --- |
| `DASHBOARD_API_TOKEN` | Yes | Bearer token required to read `/api/dashboard`. |
| `SUPABASE_URL` | Yes | Supabase project URL. |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server-only Supabase service role key used to read dashboard tables. |

Public endpoints return controlled fallbacks if optional integrations are missing. `api/lead.js` still validates and accepts leads without Telegram, Supabase, or n8n configured, but delivery only happens when the matching env vars are set in Vercel.
