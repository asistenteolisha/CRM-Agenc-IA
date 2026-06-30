# CONTEXTO DE AUDITORÍA COMPLETA — Agenc-IA
## Fecha: 2026-06-30

Eres el arquitecto principal de Agenc-IA, una agencia de agentes IA para PYMEs colombianas.
Tu trabajo es revisar este plan maestro, mejorarlo, priorizarlo, y crear un plan de ejecución definitivo.

## ECOSISTEMA ACTUAL

### Local (Windows, E:\)
- **Agenc-IA Web** (E:\workspace\Agenc-IA\) — Vue3+GSAP+Lenis+SCSS, deploy Vercel
- **Colegio Santa Rosa** (E:\workspace\Colegio\) — React+Tailwind+shadcn, deploy Vercel
- **Meta Business MCP** (E:\workspace\meta-business-mcp\) — 26 tools, Python FastMCP
- **Instagram MCP** (E:\workspace\instagram-mcp\) — 10 tools, Python FastMCP
- **Agent Factory** (E:\workspace\agent-factory\) — Template system para provisionar agentes
- **n8n Workflows** (E:\workspace\n8n-workflows\) — Workflows de automatización
- **gbrain** (E:\gbrain\) — Knowledge brain con RAG híbrido
- **Obsidian vault** (E:\AgenciaDIA\vault\)
- **codebase-memory-mcp** — Recién instalado, 6 proyectos indexados

### VPS (Hostinger, srv1596458.hstgr.cloud, 8GB RAM)
- **zhmv** (Lía) — Agente principal, 4 subagentes, 3 cron jobs
- **nmcn** (Showcase Agenc-IA) — 9 subagentes, 6 cron jobs, web-chat-agent
- **8tdz** (Olisha Autos) — 7 subagentes, 5 cron jobs
- **meta-business-mcp** — Docker, puerto 8000
- **instagram-mcp** — Docker, puerto 8080
- **n8n** — Puerto 32811
- **Traefik** — Reverse proxy, puertos 80/443
- **Uptime Kuma** — Monitoreo, puerto 3001

### MCPs Configurados
- codebase-memory-mcp (local, 14 tools)
- Meta Business MCP (VPS, 26 tools)
- Instagram MCP (VPS, 10 tools)
- Context7, Playwright, Vercel, GitHub, Supabase (en Codex)
- Pipeboard Meta Ads (en OpenCode + Codex)

## PROBLEMAS ENCONTRADOS

### 🔴 CRÍTICOS
1. **Chatbot web Agenc-IA roto** — No existe /api/chat, solo keyword matching. En móvil el panel se desboda.
   - Archivo: E:\workspace\Agenc-IA\src\components\chat\ChatWidget.vue
   - fetch('/api/chat') siempre falla (no hay serverless function)
   - Panel a calc(100vw - 32px) y 460px se desboda en pantallas pequeñas
   - Sin manejo de visualViewport para teclado virtual iOS/Android
   - Quick-action buttons overflow en pantallas <360px

2. **Colegio: 257MB de deploy** — 21 MP4s raw + 100+ JPGs en public/Images/
   - Videos deberían estar en YouTube/Vimeo/Cloudinary
   - PNGs de 1.5-2MB cada uno sin comprimir
   - Deploy inflado innecesariamente

3. **Service Worker del Colegio roto** — Cachea /src/main.tsx que no existe en producción
   - Archivo: E:\workspace\Colegio\public\sw.js

4. **Analytics placeholders** — GA4 y Meta Pixel son strings vacíos en ambas webs

### 🟡 MEDIOS
5. VPS sin swap (7.8GB RAM, riesgo OOM)
6. Traefik routing error en 8tdz (labels con nombre de router vacío)
7. 8tdz permission denied en published.json
8. nmcn dashboard sin auth provider
9. OG image es SVG en Agenc-IA (Facebook no lo renderiza)
10. Sin robots.txt ni sitemap.xml en Agenc-IA
11. Sin security headers en ambas webs (X-Frame-Options, HSTS, CSP)
12. next-themes mal usado en Colegio (no es Next.js)
13. Service Worker cache list rota en Colegio
14. PNGs grandes sin comprimir en Colegio
15. Sin prefers-reduced-motion en Colegio
16. MCPs del VPS no conectados a Hermes local

### 🟢 MENORES
17. Hash routing /#/ en Agenc-IA (mejor createWebHistory)
18. Sin linter/formatter ni tests en Agenc-IA
19. Rate limiting solo client-side (localStorage)
20. Bundle de 325KB sin code splitting
21. Espacios en filenames del Colegio
22. GA Measurement ID vacío en Colegio
23. PWA icons son .jpg en Colegio (deberían ser .png)
24. Sin breadcrumb structured data en Colegio
25. Sin Cache-Control headers en ambas webs
26. Sin hreflang en Colegio
27. Twitter card sin twitter:site en Colegio
28. v-html usado en ChatWidget (XSS mitigado pero pattern cuestionable)
29. formatText en segundo script block (pattern inusual en Vue)
30. No hay API de analytics propia
31. MCPs no tienen health endpoint
32. Traefik no tiene rate limiting configurado
33. Sin backup automatizado del VPS
34. Sin pipeline CI/CD propio (solo Vercel auto-deploy)
35. gbrain no verificado recientemente
36. Obsidian vault no sincronizado
37. codebase-memory-mcp recién instalado, verificar que Hermes lo detecte
38. Cron jobs de agentes no auditados recientemente

## SUGERENCIAS DE MEJORA

### APIs
1. API unificada de chat (Vercel → n8n → Lía) — Chatbot con IA real
2. Webhook de WhatsApp para Agenc-IA — Leads directo a CRM
3. Health check endpoint para MCPs — Monitoreo proactivo

### MCPs
4. n8n MCP — Gestionar workflows desde agentes
5. Uptime Kuma MCP — Monitoreo desde agentes
6. Vercel MCP ya configurado en Codex

### Organización
7. Consolidar docs en Obsidian
8. Automatizar backups del VPS
9. Pipeline CI/CD propio
10. Monitoring dashboard centralizado

## RESTRICCIONES
- Daniel prefiere simplicidad, pocas skills (~30-40)
- Precios premium (no rebajarse de competencia)
- Cuando algo requiere config manual, prefiere darle prompt a Codex
- Disco E:\ es el cerebro — toda la memoria persistente vive ahí
- VPS tiene 8GB RAM, 96GB disco (17% usado)
- Meta Business MCP y Instagram MCP ya están construidos y desplegados
- codebase-memory-mcp ya indexó 6 proyectos

## TU TAREA
1. Revisa este plan maestro
2. Mejora la priorización (¿qué impacta más al negocio?)
3. Identifica dependencias entre tareas
4. Sugiere mejoras adicionales que no hayamos considerado
5. Crea un plan de ejecución día por día con tareas concretas
6. Incluye estimaciones de tiempo realistas
7. Marca qué puede hacer Codex vs qué requiere intervención manual de Daniel
8. Considera el impacto en clientes futuros (escalabilidad)
