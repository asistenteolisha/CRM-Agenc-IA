create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete set null,
  conversation_id uuid references public.conversations(id) on delete set null,
  title text not null,
  notes text,
  status text not null default 'open' check (status in ('open', 'done')),
  priority text not null default 'normal' check (priority in ('low', 'normal', 'high')),
  due_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tasks_status_due_at_idx on public.tasks (status, due_at asc);
create index if not exists tasks_lead_id_idx on public.tasks (lead_id);
create index if not exists tasks_conversation_id_idx on public.tasks (conversation_id);

alter table public.tasks enable row level security;

grant all on public.tasks to service_role;

-- ponytail: no anon/authenticated policies yet; dashboard uses the existing server-side service role proxy until real user auth exists.
