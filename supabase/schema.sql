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
