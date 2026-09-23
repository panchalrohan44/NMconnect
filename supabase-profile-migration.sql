-- Run this once in the Supabase SQL Editor for an existing project.
-- It brings older profiles tables up to date without deleting any data.

alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists display_name text;
alter table public.profiles add column if not exists college text;
alter table public.profiles add column if not exists clubs_fests text;
alter table public.profiles add column if not exists bio text;
alter table public.profiles add column if not exists interests text;
alter table public.profiles add column if not exists is_bot boolean not null default false;
alter table public.profiles add column if not exists bot_batch text;

notify pgrst, 'reload schema';
