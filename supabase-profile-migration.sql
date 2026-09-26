-- Run this once in the Supabase SQL Editor for an existing project.
-- It brings older profiles tables up to date without deleting any data.
--
-- Every column the app or supabase-bot-fixtures.sql relies on is covered here,
-- so this migration alone is enough to unblock a stale profiles table.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  login_id text unique not null,
  email text,
  age integer,
  display_name text,
  hobbies text,
  interests text,
  course text,
  year text,
  gender text,
  college text,
  clubs_fests text,
  bio text,
  favourite_hangout text,
  religion text,
  mother_tongue text,
  social_handles jsonb not null default '{}'::jsonb,
  is_bot boolean not null default false,
  bot_batch text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists login_id text;
alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists age integer;
alter table public.profiles add column if not exists display_name text;
alter table public.profiles add column if not exists hobbies text;
alter table public.profiles add column if not exists interests text;
alter table public.profiles add column if not exists course text;
alter table public.profiles add column if not exists year text;
alter table public.profiles add column if not exists gender text;
alter table public.profiles add column if not exists college text;
alter table public.profiles add column if not exists clubs_fests text;
alter table public.profiles add column if not exists bio text;
alter table public.profiles add column if not exists favourite_hangout text;
alter table public.profiles add column if not exists religion text;
alter table public.profiles add column if not exists mother_tongue text;
alter table public.profiles add column if not exists social_handles jsonb not null default '{}'::jsonb;
alter table public.profiles add column if not exists is_bot boolean not null default false;
alter table public.profiles add column if not exists bot_batch text;
alter table public.profiles add column if not exists created_at timestamptz not null default now();
alter table public.profiles add column if not exists updated_at timestamptz not null default now();

create unique index if not exists profiles_login_id_key on public.profiles (login_id);
create index if not exists profiles_bot_batch_idx on public.profiles (bot_batch) where is_bot = true;

-- Only enforce the 18+ rule when no existing row would violate it.
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.profiles'::regclass and conname = 'profiles_age_range'
  ) and not exists (
    select 1 from public.profiles where age is not null and (age < 18 or age > 99)
  ) then
    alter table public.profiles
      add constraint profiles_age_range check (age >= 18 and age <= 99);
  end if;
end $$;

-- PostgREST caches the schema; reload it so the API sees the new columns now.
notify pgrst, 'reload schema';
