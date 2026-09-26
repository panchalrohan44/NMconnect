-- SVKM Connect test bots.
-- Run in Supabase SQL Editor as a project owner. This creates two bots
-- (Males/Females) for EVERY college x course x year category in the site
-- catalogue, so live matches can never be empty for a real student's branch.
--
-- The category list below is generated from js/catalog.js (SVKM_CATALOG).
-- If you add a college/course/year there, re-run this file to fill the gaps.
--
-- Bots are marked is_bot=true, so the Conversation coach stays disabled for
-- them and the UI always shows a BOT badge next to their name.

begin;

-- ---------------------------------------------------------------------------
-- Profile table provisioning.
-- The fixture inserts into public.profiles, so every column it touches is
-- created here first. That makes this script safe to run on its own, safe to
-- run BEFORE supabase-schema.sql, and safe to re-run against a project whose
-- profiles table predates these columns (e.g. "column email does not exist").
-- ---------------------------------------------------------------------------
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

-- PostgREST caches the schema; reload it so newly added columns are visible.
notify pgrst, 'reload schema';

-- Deterministic name pools so re-running never reshuffles the feed.
create temporary table bot_names on commit drop as
select
  (array['Aarav','Rohan','Kabir','Vivaan','Arjun','Ishaan','Reyansh','Aditya','Dhruv','Krish','Manav','Samar'])[1 + (n % 12)] as male_first,
  (array['Ananya','Diya','Ishita','Aditi','Saanvi','Riya','Meera','Navya','Sara','Priya','Kavya','Tara'])[1 + (n % 12)] as female_first,
  (array['Sharma','Patil','Desai','Khan','Mehta','Joshi','Kapoor','Nair','Reddy','Iyer','Bose','Kulkarni'])[1 + (n % 12)] as last,
  n
from generate_series(1, 600) n;

create temporary table bot_seed on commit drop as
with categories(college, course, years) as (
  values
    ('mithibai','ba',array['FY','SY','TY']),    ('mithibai','bsc',array['FY','SY','TY']),
    ('mithibai','bcom',array['FY','SY','TY','Honours Year (NEP)']),    ('mithibai','bms',array['FY','SY','TY']),
    ('mithibai','baf',array['FY','SY','TY']),    ('mithibai','bfm',array['FY','SY','TY']),
    ('mithibai','bbi',array['FY','SY','TY']),    ('mithibai','bia',array['FY','SY','TY']),
    ('mithibai','bmf',array['FY','SY','TY']),    ('mithibai','bammc',array['FY','SY','TY']),
    ('mithibai','bsc-it',array['FY','SY','TY']),    ('mithibai','bsc-cs',array['FY','SY','TY']),
    ('mithibai','bsc-health',array['FY','SY','TY']),    ('mithibai','bsc-asda',array['FY','SY','TY']),
    ('mithibai','bsc-psych',array['FY','SY','TY']),    ('nm-commerce','bcom',array['FY','SY','TY','Honours Year (NEP)']),
    ('nm-commerce','baf',array['FY','SY','TY']),    ('nm-commerce','bbi',array['FY','SY','TY']),
    ('nm-commerce','bfm',array['FY','SY','TY']),    ('nm-commerce','bms',array['FY','SY','TY']),
    ('nm-commerce','bsc-it',array['FY','SY','TY']),    ('nm-commerce','bsc-aids-nm',array['FY','SY','TY','Honours Year (NEP)']),
    ('nm-commerce','bcom-cs',array['FY','SY','TY']),    ('nm-commerce','bcom-ms',array['FY','SY','TY']),
    ('nmims','bba-fin',array['FY','SY','TY']),    ('nmims','bba',array['FY','SY','TY']),
    ('nmims','bsc-fin',array['Year 1','Year 2','Year 3']),    ('nmims','bcom-hons',array['FY','SY','TY','Honours Year']),
    ('upg','bms',array['FY','SY','TY']),    ('upg','bammc',array['FY','SY','TY']),
    ('upg','bsc-it',array['FY','SY','TY']),    ('upg','bsc-aids',array['FY','SY','TY']),
    ('upg','bcom-ms',array['FY','SY','TY']),    ('upg','ba-ftnmp',array['FY','SY','TY']),
    ('upg','mcom',array['Year 1','Year 2']),    ('upg','msc-it',array['Year 1','Year 2']),
    ('upg','msc-aids',array['Year 1','Year 2']),    ('upg','ma',array['Year 1','Year 2']),
    ('sbmp','dip-computer',array['First Year','Second Year','Third Year']),    ('sbmp','dip-it',array['First Year','Second Year','Third Year']),
    ('sbmp','dip-civil',array['First Year','Second Year','Third Year']),    ('sbmp','dip-mechanical',array['First Year','Second Year','Third Year']),
    ('sbmp','dip-electrical',array['First Year','Second Year','Third Year']),    ('sbmp','dip-plastics',array['First Year','Second Year','Third Year']),
    ('sbmp','dip-chemical',array['First Year','Second Year','Third Year']),    ('sbmp','dip-extc',array['First Year','Second Year','Third Year']),
    ('sbmp','btech-computer',array['First Year','Second Year','Third Year','Final Year']),    ('sbmp','btech-it',array['First Year','Second Year','Third Year','Final Year']),
    ('sbmp','btech-cse',array['First Year','Second Year','Third Year','Final Year']),    ('sbmp','btech-ai',array['First Year','Second Year','Third Year','Final Year']),
    ('djsce','btech-extc',array['First Year','Second Year','Third Year','Final Year']),    ('djsce','btech-it',array['First Year','Second Year','Third Year','Final Year']),
    ('djsce','btech-computer',array['First Year','Second Year','Third Year','Final Year']),    ('djsce','btech-mechanical',array['First Year','Second Year','Third Year','Final Year']),
    ('djsce','btech-ds',array['First Year','Second Year','Third Year','Final Year']),    ('djsce','btech-aiml',array['First Year','Second Year','Third Year','Final Year']),
    ('djsce','btech-aids',array['First Year','Second Year','Third Year','Final Year']),    ('djsce','btech-iot',array['First Year','Second Year','Third Year','Final Year']),
    ('djsce','mtech',array['First Year','Final Year']),    ('djsce','phd',array['Research Year 1','Research Year 2','Research Year 3']),
    ('jcl','ba-llb',array['First Year','Second Year','Third Year','Fourth Year','Final Year']),    ('jcl','bba-llb',array['First Year','Second Year','Third Year','Fourth Year','Final Year']),
    ('jcl','llb',array['First Year','Second Year','Third Year']),    ('jcl','llm',array['Year 1','Year 2'])
), expanded as (
  select college, course, year, gender,
         row_number() over (order by college, course, year, gender) as n
  from categories
  cross join lateral unnest(years) as year
  cross join (values ('males'), ('females')) genders(gender)
), names as (
  select e.*,
         (case when e.gender = 'males' then p.male_first else p.female_first end)
           || ' ' || p.last as display_name,
         p.last as surname
  from expanded e
  join bot_names p on p.n = 1 + (e.n % 600)
), detail as (
  select
    n.*,
    (array['SVKM Central Canteen','Library lawn','Juhu Beach walk','Study Hall','Sports Complex','Student Plaza'])[1 + (n % 6)] as favourite_hangout,
    (array['Campus walks and music','Reading, films and long talks','Football, coding and chai','Dance rehearsals and photography','Debate, theatre and volunteering','Cycling, sketching and live gigs'])[1 + ((n * 3) % 6)] as hobbies,
    (array['Rotaract Club','Dance Society','Umang','Kshitij','Enactus','Music Club','Coding Club','Quizzing Collective'])[1 + ((n * 5) % 8)] as club,
    (array['Hindi','Marathi','English','Gujarati','Bengali','Tamil','Telugu'])[1 + ((n * 2) % 7)] as mother_tongue
  from names n
)
select
  ('10000000-0000-4000-8000-' || lpad(n::text, 12, '0'))::uuid as id,
  format('bot-%s@svkmconnect.test', lpad(n::text, 4, '0')) as email,
  display_name,
  18 + (n % 8) as age,
  gender,
  college,
  course,
  year,
  favourite_hangout,
  hobbies,
  club,
  mother_tongue,
  format('svkm-demo-bots-2026-%s', to_char(current_date, 'MMDD')) as bot_batch
from detail;

-- Start from a clean slate so renamed or removed categories never linger.
delete from auth.users
where raw_user_meta_data->>'is_bot' = 'true'
  and raw_user_meta_data->>'bot_batch' like 'svkm-demo-bots-2026-%'
  and not exists (select 1 from bot_seed s where s.id = auth.users.id);

insert into auth.users (
  id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
  is_sso_user, is_anonymous
)
select id, 'authenticated', 'authenticated', email,
  crypt('disabled-bot-fixture-password', gen_salt('bf')), now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  jsonb_build_object('is_bot', true, 'bot_batch', bot_batch, 'full_name', display_name),
  now(), now(), false, false
from bot_seed
on conflict (id) do update set
  email = excluded.email,
  encrypted_password = excluded.encrypted_password,
  raw_user_meta_data = excluded.raw_user_meta_data,
  updated_at = now();

insert into public.profiles (
  id, login_id, email, display_name, age, gender, college, course, year,
  favourite_hangout, hobbies, interests, clubs_fests, bio, mother_tongue,
  social_handles, is_bot, bot_batch, created_at, updated_at
)
select id, email, email, display_name, age, gender, college, course, year,
  favourite_hangout, hobbies, hobbies, club,
  'SVKM Connect demo profile used to populate live matches.',
  mother_tongue, '{}'::jsonb, true, bot_batch, now(), now()
from bot_seed
on conflict (id) do update set
  login_id = excluded.login_id, email = excluded.email, display_name = excluded.display_name,
  age = excluded.age, gender = excluded.gender, college = excluded.college, course = excluded.course,
  year = excluded.year, favourite_hangout = excluded.favourite_hangout, hobbies = excluded.hobbies,
  interests = excluded.interests, clubs_fests = excluded.clubs_fests, bio = excluded.bio,
  mother_tongue = excluded.mother_tongue, is_bot = true, bot_batch = excluded.bot_batch, updated_at = now();

commit;

-- Sanity check: every catalogue branch should have at least 2 bots.
select college, count(distinct course) as courses, count(*) as bots
from public.profiles
where is_bot and bot_batch like 'svkm-demo-bots-2026-%'
group by college
order by college;

-- To remove only this fixture batch:
-- delete from auth.users where raw_user_meta_data->>'is_bot' = 'true'
-- and raw_user_meta_data->>'bot_batch' like 'svkm-demo-bots-2026-%';
