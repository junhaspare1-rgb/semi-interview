create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles
  for select
  using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles
  for insert
  with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute function public.set_updated_at();

create table if not exists public.question_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role_id text not null,
  question_id text not null,
  bookmarked boolean not null default false,
  status text check (status in ('known', 'confused') or status is null),
  updated_at timestamptz not null default now(),
  unique (user_id, role_id, question_id)
);

create index if not exists question_progress_user_role_idx
  on public.question_progress (user_id, role_id, updated_at desc);

alter table public.question_progress enable row level security;

drop policy if exists "question_progress_select_own" on public.question_progress;
create policy "question_progress_select_own"
  on public.question_progress
  for select
  using (auth.uid() = user_id);

drop policy if exists "question_progress_insert_own" on public.question_progress;
create policy "question_progress_insert_own"
  on public.question_progress
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "question_progress_update_own" on public.question_progress;
create policy "question_progress_update_own"
  on public.question_progress
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "question_progress_delete_own" on public.question_progress;
create policy "question_progress_delete_own"
  on public.question_progress
  for delete
  using (auth.uid() = user_id);

create table if not exists public.behavior_answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null,
  title text,
  answer_text text not null default '',
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists behavior_answers_user_question_idx
  on public.behavior_answers (user_id, question_id, updated_at desc);

alter table public.behavior_answers enable row level security;

drop policy if exists "behavior_answers_select_own" on public.behavior_answers;
create policy "behavior_answers_select_own"
  on public.behavior_answers
  for select
  using (auth.uid() = user_id);

drop policy if exists "behavior_answers_insert_own" on public.behavior_answers;
create policy "behavior_answers_insert_own"
  on public.behavior_answers
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "behavior_answers_update_own" on public.behavior_answers;
create policy "behavior_answers_update_own"
  on public.behavior_answers
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "behavior_answers_delete_own" on public.behavior_answers;
create policy "behavior_answers_delete_own"
  on public.behavior_answers
  for delete
  using (auth.uid() = user_id);

drop trigger if exists behavior_answers_set_updated_at on public.behavior_answers;
create trigger behavior_answers_set_updated_at
  before update on public.behavior_answers
  for each row
  execute function public.set_updated_at();

grant usage on schema public to anon, authenticated;

grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.question_progress to authenticated;
grant select, insert, update, delete on public.behavior_answers to authenticated;

create table if not exists public.question_roles (
  id text primary key,
  label text not null,
  short_label text not null,
  description text not null default '',
  enabled boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.question_roles enable row level security;

drop trigger if exists question_roles_set_updated_at on public.question_roles;
create trigger question_roles_set_updated_at
  before update on public.question_roles
  for each row
  execute function public.set_updated_at();

create table if not exists public.question_categories (
  id text primary key,
  role_id text not null references public.question_roles(id) on delete cascade,
  name text not null,
  slug text not null,
  is_main boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (role_id, name),
  unique (role_id, slug)
);

create index if not exists question_categories_role_idx
  on public.question_categories (role_id, sort_order, name);

alter table public.question_categories enable row level security;

drop trigger if exists question_categories_set_updated_at on public.question_categories;
create trigger question_categories_set_updated_at
  before update on public.question_categories
  for each row
  execute function public.set_updated_at();

create table if not exists public.questions (
  id text primary key,
  role_id text not null references public.question_roles(id) on delete cascade,
  source_question_id text not null,
  category_id text references public.question_categories(id) on delete set null,
  category_name text not null,
  difficulty text not null check (difficulty in ('입문', '실전', '심화', '지엽')),
  question_text text not null,
  answer_full text not null default '',
  answer_short text not null default '',
  keywords jsonb not null default '[]'::jsonb,
  active boolean not null default true,
  is_free boolean not null default true,
  seo_published boolean not null default false,
  sort_order integer not null default 0,
  estimated_answer_minutes numeric,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (role_id, source_question_id)
);

create index if not exists questions_role_active_idx
  on public.questions (role_id, active, sort_order);

create index if not exists questions_category_idx
  on public.questions (category_id, difficulty, sort_order);

alter table public.questions enable row level security;

drop trigger if exists questions_set_updated_at on public.questions;
create trigger questions_set_updated_at
  before update on public.questions
  for each row
  execute function public.set_updated_at();

grant select, insert, update, delete on public.question_roles to service_role;
grant select, insert, update, delete on public.question_categories to service_role;
grant select, insert, update, delete on public.questions to service_role;
