-- DOM Agenda · estrutura do banco (Supabase)
-- Cole tudo no Supabase > SQL Editor > New query e clique em "Run".

-- ---------- tabelas ----------
create table if not exists public.coordinators (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete set null, -- vazio = cadastrado pelo coordenador
  name text not null check (char_length(name) between 1 and 60),
  functions text[] not null default '{}',
  unavailable text[] not null default '{}',  -- "2026-10-18" (dia todo) ou "2026-10-18|manha" (um culto)
  confirmed text[] not null default '{}',    -- "2026-10-18|manha|foto"
  active boolean not null default true,
  manual boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.settings (
  id int primary key default 1 check (id = 1),
  config jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.escalas (
  month text primary key check (month ~ '^\d{4}-\d{2}$'),
  assignments jsonb not null default '{}',
  published boolean not null default false,
  gaps int not null default 0,
  generated_at timestamptz not null default now()
);

create table if not exists public.comunicados (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 90),
  body text not null default '',
  tone text not null default 'info',
  created_at timestamptz not null default now()
);

-- ---------- quem é coordenador ----------
create or replace function public.is_coord() returns boolean
language sql security definer stable set search_path = public as $$
  select exists (select 1 from public.coordinators where user_id = auth.uid());
$$;

-- ---------- segurança (RLS) ----------
alter table public.coordinators enable row level security;
alter table public.members      enable row level security;
alter table public.settings     enable row level security;
alter table public.escalas      enable row level security;
alter table public.comunicados  enable row level security;

-- coordenadores
drop policy if exists coord_read  on public.coordinators;
drop policy if exists coord_write on public.coordinators;
create policy coord_read  on public.coordinators for select to authenticated using (true);
create policy coord_write on public.coordinators for all    to authenticated using (public.is_coord()) with check (public.is_coord());

-- membros: todos da equipe leem; cada um edita o próprio cadastro; coordenador edita todos
drop policy if exists members_read   on public.members;
drop policy if exists members_insert on public.members;
drop policy if exists members_update on public.members;
drop policy if exists members_delete on public.members;
create policy members_read   on public.members for select to authenticated using (true);
create policy members_insert on public.members for insert to authenticated
  with check (public.is_coord() or (user_id = auth.uid() and manual = false));
create policy members_update on public.members for update to authenticated
  using (public.is_coord() or user_id = auth.uid())
  with check (public.is_coord() or user_id = auth.uid());
create policy members_delete on public.members for delete to authenticated using (public.is_coord());

-- impede que um membro comum mude o próprio status "pausado"
create or replace function public.members_guard() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_coord() then
    new.active := old.active;
    new.manual := old.manual;
  end if;
  return new;
end $$;
drop trigger if exists members_guard on public.members;
create trigger members_guard before update on public.members
  for each row execute function public.members_guard();

-- configurações: todos leem; só coordenador altera
drop policy if exists settings_read  on public.settings;
drop policy if exists settings_write on public.settings;
create policy settings_read  on public.settings for select to authenticated using (true);
create policy settings_write on public.settings for all    to authenticated using (public.is_coord()) with check (public.is_coord());

-- escalas: membros só veem as publicadas; coordenador vê e edita tudo
drop policy if exists escalas_read  on public.escalas;
drop policy if exists escalas_write on public.escalas;
create policy escalas_read  on public.escalas for select to authenticated using (published or public.is_coord());
create policy escalas_write on public.escalas for all    to authenticated using (public.is_coord()) with check (public.is_coord());

-- comunicados
drop policy if exists com_read  on public.comunicados;
drop policy if exists com_write on public.comunicados;
create policy com_read  on public.comunicados for select to authenticated using (true);
create policy com_write on public.comunicados for all    to authenticated using (public.is_coord()) with check (public.is_coord());

-- ---------- atualização em tempo real ----------
do $$
declare t text;
begin
  foreach t in array array['members','settings','escalas','comunicados','coordinators'] loop
    begin
      execute format('alter publication supabase_realtime add table public.%I', t);
    exception when duplicate_object then null;
    end;
  end loop;
end $$;

-- ---------- PRIMEIRO COORDENADOR ----------
-- Depois de criar sua conta no portal, rode só a linha abaixo
-- (troque pelo seu e-mail) para virar coordenador:
--
-- insert into public.coordinators (user_id) select id from auth.users where email = 'drecacio@gmail.com';

-- O primeiro usuário pode se tornar coordenador pelo próprio portal
-- (botão "Sou o coordenador"), só enquanto não houver nenhum.
create or replace function public.claim_first_coordinator() returns void
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  lock table public.coordinators in exclusive mode;
  if not exists (select 1 from public.coordinators) then
    insert into public.coordinators (user_id) values (auth.uid());
  end if;
end $$;
revoke all on function public.claim_first_coordinator() from public, anon;
grant execute on function public.claim_first_coordinator() to authenticated;
