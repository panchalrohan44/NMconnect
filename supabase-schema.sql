create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  login_id text unique not null,
  email text,
  age integer check (age >= 18 and age <= 99),
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

-- Columns added after the original schema was published
alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists display_name text;
alter table public.profiles add column if not exists college text;
alter table public.profiles add column if not exists clubs_fests text;
alter table public.profiles add column if not exists bio text;
alter table public.profiles add column if not exists interests text;
alter table public.profiles add column if not exists is_bot boolean not null default false;
alter table public.profiles add column if not exists bot_batch text;
create index if not exists profiles_bot_batch_idx on public.profiles (bot_batch) where is_bot = true;

-- OAuth (Google) support:
-- 1) Enable Google in Supabase Dashboard → Authentication → Providers → Google.
-- 2) Add your site URL and "auth.html" to Dashboard → Authentication → URL Configuration → Redirect URLs.
-- 3) Sign-in records are stored by Supabase Auth (auth.users); profiles are recorded below.

alter table public.profiles enable row level security;

create policy "Authenticated users can view profiles"
  on public.profiles for select
  to authenticated
  using (true);

create policy "Users can create their own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create table if not exists public.connections (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references auth.users(id) on delete cascade,
  recipient_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (requester_id, recipient_id),
  check (requester_id <> recipient_id)
);

alter table public.connections enable row level security;

create policy "Users can view their own connections"
  on public.connections for select
  to authenticated
  using (auth.uid() = requester_id or auth.uid() = recipient_id);

create policy "Users can request connections"
  on public.connections for insert
  to authenticated
  with check (auth.uid() = requester_id);

create policy "Users can update their own connection requests"
  on public.connections for update
  to authenticated
  using (auth.uid() = requester_id or auth.uid() = recipient_id)
  with check (auth.uid() = requester_id or auth.uid() = recipient_id);

-- Clubs, fests and events are stored as a plain-text list on profiles ("clubs_fests"),
-- and a profile's timetable is not modelled separately, so the legacy data model is removed.
drop table if exists public.timetable_slots cascade;
drop table if exists public.society_preferences cascade;
