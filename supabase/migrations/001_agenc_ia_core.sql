create extension if not exists pgcrypto with schema extensions;

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact_name text,
  email text,
  phone text,
  business_type text,
  status text not null default 'lead' check (status in ('lead', 'active', 'paused', 'churned')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  plan_key text not null check (plan_key in ('starter', 'growth', 'pro', 'web')),
  plan_name text not null,
  monthly_cop integer not null default 0,
  monthly_usd integer not null default 0,
  setup_cop integer not null default 0,
  setup_usd integer not null default 0,
  status text not null default 'quoted' check (status in ('quoted', 'active', 'paused', 'cancelled')),
  starts_at date,
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete set null,
  name text not null,
  email text,
  phone text,
  business_type text,
  service_interest text,
  need text,
  source text not null default 'website',
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'won', 'lost')),
  data_consent boolean not null default false,
  utm jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete set null,
  channel text not null check (channel in ('whatsapp', 'instagram', 'facebook', 'messenger', 'web')),
  external_thread_id text,
  customer_name text,
  customer_phone text,
  status text not null default 'open' check (status in ('open', 'human_handoff', 'closed')),
  transcript jsonb not null default '[]'::jsonb,
  last_message_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists conversations_lead_id_idx on public.conversations (lead_id);
create index if not exists conversations_last_message_at_idx on public.conversations (last_message_at desc);
create index if not exists plans_client_id_idx on public.plans (client_id);

alter table public.clients enable row level security;
alter table public.plans enable row level security;
alter table public.leads enable row level security;
alter table public.conversations enable row level security;

grant usage on schema public to service_role;
grant all on public.clients, public.plans, public.leads, public.conversations to service_role;

-- ponytail: no anon/authenticated policies yet; dashboard reads through server-side service role until real user auth exists.
