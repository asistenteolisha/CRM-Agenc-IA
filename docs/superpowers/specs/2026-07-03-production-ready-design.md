# Agenc-IA Production-Ready Design

## Goal

Launch `agenciadia.tech` as a trustworthy sales site with final pricing, working lead/chat capture, a private operating dashboard, and verified production integrations.

## Scope

### Public website

- Keep the existing Vue 3, Vue Router, GSAP, Lenis, and SCSS architecture.
- Publish the four approved offers and dual COP/USD prices.
- Use the approved hero promise and “Diagnóstico gratuito” CTA.
- Keep the existing process, FAQ, analytics, SEO, and responsive work where it already meets the requirement.
- Remove unverified testimonials.
- Present sector examples as `Demo sectorial` or `Caso proyectado`; never as measured client results.

### Private dashboard

- Add a protected `/dashboard` area for the agency operator.
- Support email/password sign-in through Supabase Auth.
- Show summary counts and simple views for clients, leads, conversations, and plans.
- Provide only the CRUD actions needed to operate those records; no speculative reporting engine or role hierarchy.

### Data and APIs

- Use Supabase tables `clients`, `leads`, `conversations`, and `plans`.
- Enable RLS on every table. Authenticated agency users may manage records; public visitors get no direct table access.
- Keep public writes behind Vercel serverless endpoints.
- Store website form leads and chat conversations when Supabase server credentials are configured.
- Keep the existing n8n notification path so a database outage does not silently lose a commercial notification.

### Production

- Build and verify the public pages and dashboard on mobile and desktop.
- Deploy the tested revision to Vercel.
- Add `agenciadia.tech` and `www.agenciadia.tech` to the Vercel project.
- Inspect current Hostinger DNS before replacing records, then apply only the records Vercel currently requires.
- Test the contact form, web chat, WhatsApp handoff, authentication, persistence, canonical URLs, analytics configuration, and DNS/HTTPS.

## Architecture

The marketing site remains static Vue rendered by Vite. The dashboard is another Vue route using the same application and a small Supabase client. Public lead/chat requests go through the existing `/api` serverless functions, which validate input before writing to Supabase and notifying n8n.

```text
Visitor -> Vue site -> /api/lead or /api/chat -> Supabase
                                      \-----> n8n/WhatsApp notification

Operator -> /dashboard -> Supabase Auth -> RLS-protected tables
```

## Security and failure handling

- No service-role key is exposed to the browser.
- Public APIs validate content type, payload size, required fields, and allowed values.
- RLS is enabled before dashboard use.
- Authentication failure returns to the sign-in view without exposing records.
- Persistence and upstream-notification failures are logged and reported without leaking secrets.
- Existing rate limiting, CORS, honeypot, and privacy consent protections remain in place.

## Verification

- `npm run build` is the minimum code check.
- One small API self-check covers input validation and persistence fallbacks.
- Browser checks cover the home page, pricing, contact submission, chat, dashboard sign-in, authenticated dashboard tables, mobile layout, and reduced-motion behavior.
- Production checks cover DNS, TLS, canonical metadata, robots/sitemap, GA4/Meta IDs, and the live WhatsApp route.

## Explicit non-goals

- Multi-tenant SaaS roles, billing, custom charts, exports, pipeline automation, and advanced CRM workflows.
- Fabricated testimonials, client names, or performance metrics.
- Replacing the existing framework, animation stack, or styling system.

