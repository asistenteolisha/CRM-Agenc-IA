# Agenc-IA Production-Ready Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `agenciadia.tech` with truthful public content, final pricing, durable lead/chat capture, a secure internal dashboard, and verified production integrations.

**Architecture:** Keep the existing Vue/Vite marketing site and Vercel functions. Add one Supabase migration and one protected dashboard route; public writes remain server-side and the browser uses Supabase only after authentication.

**Tech Stack:** Vue 3, Vue Router, TypeScript, SCSS, Vercel Functions, Supabase Postgres/Auth/RLS, n8n.

---

## File map

- Delete `src/components/sections/TestimonialsSection.vue`: unverified social proof must not ship.
- Modify `src/pages/HomePage.vue`: remove testimonials and retain approved hero/CTA.
- Modify `src/data/content.ts`: mark sector examples explicitly.
- Modify `src/data/cases.ts`: replace fabricated clients, quotes, and metrics with three labeled demos and expected capabilities.
- Modify `src/components/sections/CaseStudiesSection.vue`: render demos honestly.
- Modify `src/pages/CasesPage.vue`: replace “resultados reales” copy.
- Create `scripts/check-content.mjs`: one runnable honesty/pricing check.
- Create `supabase/migrations/202607030001_operating_dashboard.sql`: tables, indexes, timestamp trigger, and admin-only RLS.
- Modify `package.json` and lockfile: install the official Supabase browser client.
- Create `src/lib/supabase.ts`: configured singleton with an explicit missing-env state.
- Create `src/pages/DashboardPage.vue`: sign-in plus the smallest useful operating dashboard.
- Modify `src/router.ts`: history URLs, dashboard route, and auth guard.
- Modify `src/App.vue`: do not render public chrome around the dashboard.
- Modify `src/styles/main.scss`: dashboard and truthful demo styling.
- Modify `src/components/chat/ChatWidget.vue`: stable chat session ID.
- Modify `api/chat.js`: persist user/agent turns without exposing service credentials.
- Modify `api/lead.js`: await persistence and notifications before the serverless invocation ends.
- Modify `scripts/test-lead-api.mjs`: assert required validation and configured persistence call.
- Create `scripts/test-chat-api.mjs`: assert empty-message rejection and durable conversation payload.
- Modify `.env.example`: document browser/server Supabase variables.
- Modify `API-ENV-VARS.md`: document Vercel variables and ownership.
- Modify `E:/workspace/PROMPT-MASTER-PLAN.md`: replace the stale task list with actual status, gates, and rollback notes.

### Task 1: Remove fabricated proof and lock final commercial content

**Files:**
- Create: `scripts/check-content.mjs`
- Delete: `src/components/sections/TestimonialsSection.vue`
- Modify: `src/pages/HomePage.vue`
- Modify: `src/data/content.ts`
- Modify: `src/data/cases.ts`
- Modify: `src/components/sections/CaseStudiesSection.vue`
- Modify: `src/pages/CasesPage.vue`

- [ ] **Step 1: Add the failing content check**

```js
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const files = await Promise.all([
  'src/pages/HomePage.vue',
  'src/pages/CasesPage.vue',
  'src/components/sections/CaseStudiesSection.vue',
  'src/data/cases.ts',
  'src/data/pricing.ts'
].map((file) => readFile(file, 'utf8')))

const content = files.join('\n')
for (const claim of ['Resultados reales', 'Testimonios', 'Dueña del salón', 'Chef propietario']) {
  assert.equal(content.includes(claim), false, `Unverified claim remains: ${claim}`)
}

for (const price of ['399000', '799000', '1399000', '2499000']) {
  assert.equal(content.includes(price), true, `Approved COP price missing: ${price}`)
}
```

- [ ] **Step 2: Run it and verify it fails**

Run: `node scripts/check-content.mjs`

Expected: failure naming `Resultados reales` or `Testimonios`.

- [ ] **Step 3: Make proof truthful**

Remove the testimonials component and its `HomePage.vue` import/render. Replace the case data with three anonymous examples labeled `Demo sectorial`, remove all quotes, and express `results` as expected operational outcomes without percentages, revenue, savings, or client claims.

Keep these approved public values:

```text
Starter: 399000 COP / 99 USD monthly; 999000 COP / 249 USD setup
Growth: 799000 COP / 199 USD monthly; 1999000 COP / 499 USD setup
Pro: 1399000 COP / 349 USD monthly; 3999000 COP / 999 USD setup
Web Profesional: 2499000 COP / 620 USD one-time
```

- [ ] **Step 4: Re-run the check**

Run: `node scripts/check-content.mjs`

Expected: exit code 0.

### Task 2: Create the minimum secure Supabase model

**Files:**
- Create: `supabase/migrations/202607030001_operating_dashboard.sql`

- [ ] **Step 1: Write the migration**

```sql
create extension if not exists pgcrypto;

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 200),
  company text,
  email text,
  phone text,
  status text not null default 'active' check (status in ('active', 'inactive')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete set null,
  name text not null check (char_length(name) between 1 and 200),
  email text,
  phone text,
  business_type text,
  service_interest text,
  need text,
  source text not null default 'website',
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'won', 'lost')),
  data_consent boolean not null default false,
  utm jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  external_id text unique,
  channel text not null check (channel in ('web', 'whatsapp', 'instagram', 'facebook')),
  contact_name text,
  contact_handle text,
  status text not null default 'open' check (status in ('open', 'closed', 'handoff')),
  summary text,
  messages jsonb not null default '[]'::jsonb check (jsonb_typeof(messages) = 'array'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  name text not null check (name in ('starter', 'growth', 'pro', 'web')),
  status text not null default 'pending' check (status in ('pending', 'active', 'paused', 'cancelled')),
  setup_cop bigint not null default 0 check (setup_cop >= 0),
  monthly_cop bigint not null default 0 check (monthly_cop >= 0),
  started_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_status_created_at_idx on public.leads(status, created_at desc);
create index if not exists conversations_channel_updated_at_idx on public.conversations(channel, updated_at desc);
create index if not exists plans_client_id_idx on public.plans(client_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists clients_set_updated_at on public.clients;
create trigger clients_set_updated_at before update on public.clients
for each row execute function public.set_updated_at();

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at before update on public.leads
for each row execute function public.set_updated_at();

drop trigger if exists conversations_set_updated_at on public.conversations;
create trigger conversations_set_updated_at before update on public.conversations
for each row execute function public.set_updated_at();

drop trigger if exists plans_set_updated_at on public.plans;
create trigger plans_set_updated_at before update on public.plans
for each row execute function public.set_updated_at();

alter table public.clients enable row level security;
alter table public.leads enable row level security;
alter table public.conversations enable row level security;
alter table public.plans enable row level security;

create or replace function public.is_agenc_admin()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'leinadgalaxy@gmail.com';
$$;

revoke all on function public.is_agenc_admin() from public;
grant execute on function public.is_agenc_admin() to authenticated;

do $$
declare
  table_name text;
begin
  foreach table_name in array array['clients', 'leads', 'conversations', 'plans']
  loop
    execute format('drop policy if exists admin_all on public.%I', table_name);
    execute format(
      'create policy admin_all on public.%I for all to authenticated using (public.is_agenc_admin()) with check (public.is_agenc_admin())',
      table_name
    );
  end loop;
end
$$;
```

- [ ] **Step 2: Validate the migration through Supabase tooling**

Apply the migration to the connected Agenc-IA project, then query:

```sql
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in ('clients', 'leads', 'conversations', 'plans')
order by tablename;
```

Expected: four rows with `rowsecurity = true`.

- [ ] **Step 3: Verify anonymous access is denied**

Use the project anonymous key to request `/rest/v1/leads?select=id&limit=1`.

Expected: no rows exposed and no anonymous CRUD policy.

### Task 3: Add Supabase authentication and dashboard route

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Create: `src/lib/supabase.ts`
- Create: `src/pages/DashboardPage.vue`
- Modify: `src/router.ts`
- Modify: `src/App.vue`
- Modify: `src/styles/main.scss`

- [ ] **Step 1: Install the existing-platform client**

Run: `corepack pnpm add @supabase/supabase-js`

Expected: dependency added with no unrelated package changes.

- [ ] **Step 2: Add the client configuration**

```ts
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseConfigured = Boolean(url && key)
export const supabase = supabaseConfigured ? createClient(url, key) : null
```

Never import a service-role key into `src/`.

- [ ] **Step 3: Add a protected route**

Use this route/guard shape:

```ts
import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from './lib/supabase'
import HomePage from './pages/HomePage.vue'
import ServicesPage from './pages/ServicesPage.vue'
import CasesPage from './pages/CasesPage.vue'
import PricingPage from './pages/PricingPage.vue'
import ContactPage from './pages/ContactPage.vue'
import AboutPage from './pages/AboutPage.vue'
import DashboardPage from './pages/DashboardPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/servicios', name: 'services', component: ServicesPage },
    { path: '/casos', name: 'cases', component: CasesPage },
    { path: '/precios', name: 'pricing', component: PricingPage },
    { path: '/nosotros', name: 'about', component: AboutPage },
    { path: '/contacto', name: 'contact', component: ContactPage },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage,
      meta: { dashboard: true, requiresAuth: true }
    }
  ],
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' })
})

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth || to.query.login === '1' || !supabase) return true
  const { data } = await supabase.auth.getSession()
  return data.session ? true : { path: '/dashboard', query: { login: '1' } }
})

export default router
```

- [ ] **Step 4: Add the dashboard**

Keep it in one page component with these concrete operations:

```ts
const tables = ['clients', 'leads', 'conversations', 'plans'] as const
const records = reactive<Record<(typeof tables)[number], Record<string, unknown>[]>>({
  clients: [], leads: [], conversations: [], plans: []
})

async function loadDashboard() {
  if (!supabase) return
  loading.value = true
  error.value = ''
  const results = await Promise.all(
    tables.map((table) => supabase.from(table).select('*').order('created_at', { ascending: false }).limit(100))
  )
  results.forEach((result, index) => {
    if (result.error) error.value ||= result.error.message
    else records[tables[index]] = result.data || []
  })
  loading.value = false
}

async function signIn() {
  if (!supabase || email.value.toLowerCase() !== 'leinadgalaxy@gmail.com') {
    error.value = 'Cuenta no autorizada.'
    return
  }
  const result = await supabase.auth.signInWithPassword({ email: email.value, password: password.value })
  if (result.error) error.value = result.error.message
  else {
    session.value = result.data.session
    await loadDashboard()
  }
}

async function updateLeadStatus(id: string, status: string) {
  if (!supabase) return
  const result = await supabase.from('leads').update({ status }).eq('id', id)
  if (result.error) error.value = result.error.message
  else await loadDashboard()
}

async function createClient() {
  if (!supabase || !newClientName.value.trim()) return
  const result = await supabase.from('clients').insert({
    name: newClientName.value.trim(),
    company: newClientCompany.value.trim() || null,
    email: newClientEmail.value.trim() || null
  })
  if (result.error) error.value = result.error.message
  else {
    newClientName.value = ''
    newClientCompany.value = ''
    newClientEmail.value = ''
    await loadDashboard()
  }
}
```

The template must render login when `session` is null, then count cards and one native table per tab. Use native buttons, inputs, selects, labels, and visible focus states. Do not add charts, exports, roles, or pagination.

- [ ] **Step 5: Isolate dashboard chrome**

Use route metadata in `App.vue`:

```vue
<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppLayout from './components/layout/AppLayout.vue'
const route = useRoute()
</script>

<template>
  <router-view v-if="route.meta.dashboard" />
  <AppLayout v-else>
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </AppLayout>
</template>
```

- [ ] **Step 6: Build**

Run: `corepack pnpm build`

Expected: `vue-tsc` and Vite finish with exit code 0.

### Task 4: Make lead and chat persistence durable

**Files:**
- Modify: `src/components/chat/ChatWidget.vue`
- Modify: `api/chat.js`
- Modify: `api/lead.js`
- Modify: `scripts/test-lead-api.mjs`
- Create: `scripts/test-chat-api.mjs`

- [ ] **Step 1: Extend the lead self-check**

Mock `global.fetch` and assert a valid request attempts a Supabase insert when `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set. Keep the existing consent check.

- [ ] **Step 2: Add the chat self-check**

Assert:

```text
empty message -> 400
valid message -> 200
configured Supabase -> POST /rest/v1/conversations
payload includes external_id, channel=web, and user/assistant messages
```

- [ ] **Step 3: Run both checks and verify chat fails**

Run:

```powershell
node scripts/test-lead-api.mjs
node scripts/test-chat-api.mjs
```

Expected: lead passes; chat fails because persistence is absent.

- [ ] **Step 4: Implement durable writes**

In `ChatWidget.vue`, create/reuse a `crypto.randomUUID()` value in `sessionStorage` and send it as `session_id`.

```ts
const sessionId = sessionStorage.getItem('agencia_chat_session') || crypto.randomUUID()
sessionStorage.setItem('agencia_chat_session', sessionId)
```

Include `{ message, session_id: sessionId }` in the chat request.

In `api/chat.js`, call this helper after a reply is selected:

```js
async function saveConversation(externalId, userMessage, agentMessage) {
  const url = String(process.env.SUPABASE_URL || '').replace(/\/$/, '')
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key || !externalId) return

  const headers = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }
  const current = await fetch(
    `${url}/rest/v1/conversations?external_id=eq.${encodeURIComponent(externalId)}&select=id,messages`,
    { headers, signal: AbortSignal.timeout(5000) }
  )
  const row = current.ok ? (await current.json())[0] : null
  const messages = [
    ...(Array.isArray(row?.messages) ? row.messages : []),
    { role: 'user', content: userMessage, at: new Date().toISOString() },
    { role: 'assistant', content: agentMessage, at: new Date().toISOString() }
  ]

  const endpoint = row
    ? `${url}/rest/v1/conversations?id=eq.${row.id}`
    : `${url}/rest/v1/conversations`
  const response = await fetch(endpoint, {
    method: row ? 'PATCH' : 'POST',
    headers: { ...headers, Prefer: 'return=minimal' },
    body: JSON.stringify(row ? { messages } : {
      external_id: externalId,
      channel: 'web',
      messages
    }),
    signal: AbortSignal.timeout(5000)
  })
  if (!response.ok) throw new Error(`Supabase conversation write failed: ${response.status}`)
}
```

`saveConversation` failure must be caught and logged after the response text is chosen; it must not erase an otherwise valid chat reply. The browser sends one message at a time, so the read/append/write ceiling is acceptable until concurrent channel ingestion exists.

In `api/lead.js`, move the n8n request into `sendLeadWebhook(payload)` and use:

```js
await Promise.allSettled([
  sendTelegramNotification(payload),
  saveLeadToSupabase(payload),
  sendLeadWebhook(payload)
])
```

This must complete before the success response so Vercel cannot terminate unfinished writes.

- [ ] **Step 5: Run checks**

Run:

```powershell
node scripts/test-lead-api.mjs
node scripts/test-chat-api.mjs
corepack pnpm build
```

Expected: all exit 0.

### Task 5: Finish public UX, SEO, analytics, and configuration

**Files:**
- Modify: `src/components/sections/PricingSection.vue`
- Modify: `src/data/pricing.ts`
- Modify: `src/styles/main.scss`
- Modify: `.env.example`
- Modify: `API-ENV-VARS.md`
- Modify: `E:/workspace/PROMPT-MASTER-PLAN.md`

- [ ] **Step 1: Preserve and verify current pricing work**

Keep the existing uncommitted dual-currency changes. Confirm every card shows COP and USD and that Web Profesional is explicitly one-time.

- [ ] **Step 2: Document exact variables**

Browser:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Server only:

```text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
AGENT_API_URL
AGENT_API_KEY
AGENCIA_IA_N8N_CHAT_WEBHOOK_URL
AGENCIA_IA_N8N_LEAD_WEBHOOK_URL
AGENCIA_IA_N8N_WEBHOOK_TOKEN
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID
```

- [ ] **Step 3: Rewrite the master plan**

Replace stale “DNS first” ordering with:

```text
P0 truth/security/data -> P1 local verification -> P2 preview deploy -> P3 DNS cutover -> P4 production smoke test
```

Record what was already complete, what this implementation changed, required manual account actions, success criteria, and rollback.

- [ ] **Step 4: Verify content and build**

Run:

```powershell
node scripts/check-content.mjs
corepack pnpm build
git diff --check
```

Expected: all exit 0.

### Task 6: Configure Supabase and Vercel production

**Files:**
- No secret values committed.

- [ ] **Step 1: Configure the browser and server variables in Vercel**

Set every required Supabase variable for Production and Preview. Preserve existing analytics, agent, n8n, and Telegram variables.

- [ ] **Step 2: Bootstrap the admin user**

Create or invite `leinadgalaxy@gmail.com` in Supabase Auth. Confirm email/password sign-in works and the user can read dashboard tables through RLS.

- [ ] **Step 3: Deploy a preview**

Deploy the current branch to Vercel and record the preview URL.

- [ ] **Step 4: Smoke-test preview**

Verify public navigation, pricing, form validation/submission, chat response, dashboard login, lead row creation, conversation row creation, and mobile layout.

Expected: no console errors; writes appear once; no anonymous table access.

### Task 7: Cut over domain and verify production

**Files:**
- No code files unless verification reveals a defect.

- [ ] **Step 1: Inspect before mutating DNS**

Read current A/AAAA/CNAME records for `agenciadia.tech` and `www`. Add both domains to the Vercel project and use Vercel’s current requested records rather than assuming stale values.

- [ ] **Step 2: Apply Hostinger DNS**

Replace only conflicting apex/www web records. Preserve MX, TXT, DKIM, DMARC, and unrelated subdomains.

- [ ] **Step 3: Promote the verified deployment**

Promote the tested build to Production. Configure one canonical host and redirect the other.

- [ ] **Step 4: Verify external behavior**

Check:

```text
https://agenciadia.tech
https://www.agenciadia.tech
/servicios
/precios
/contacto
/dashboard
/robots.txt
/sitemap.xml
/api/chat
/api/lead
```

Expected: valid TLS, one canonical host, direct route loads, no hash URLs, correct OG/JSON-LD, working APIs, and dashboard protection.

- [ ] **Step 5: Test WhatsApp handoff**

Open the production WhatsApp CTA and send one real test message through the configured agent. Confirm the reply and corresponding lead/conversation trace.

### Task 8: Final verification and handoff

**Files:**
- Modify documentation only if actual production values differ.

- [ ] **Step 1: Run the final local gate**

```powershell
node scripts/check-content.mjs
node scripts/test-lead-api.mjs
node scripts/test-chat-api.mjs
corepack pnpm build
git diff --check
```

- [ ] **Step 2: Review the scoped diff**

Run: `git status --short` and `git diff --stat`

Expected: no unrelated user files added, no secrets, and existing local edits preserved.

- [ ] **Step 3: Record production evidence**

Update `E:/workspace/PROMPT-MASTER-PLAN.md` with deployment URL, domain status, Supabase migration status, test results, and any genuinely manual follow-up.
