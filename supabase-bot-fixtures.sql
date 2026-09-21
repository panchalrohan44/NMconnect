-- SVKM Connect demo bot fixtures.
-- Run in the Supabase SQL Editor with a project owner account.
-- All fixture users are tagged with bot_batch and can be removed safely with
-- the DELETE statement at the bottom. Do not run that statement in production
-- after real users have been assigned the same batch value.

begin;

alter table public.profiles add column if not exists is_bot boolean not null default false;
alter table public.profiles add column if not exists bot_batch text;

create temporary table bot_seed (
  id uuid primary key,
  email text not null,
  display_name text not null,
  age integer not null,
  gender text not null,
  college text not null,
  course text not null,
  year text not null,
  favourite_hangout text not null,
  hobbies text not null,
  clubs_fests text not null,
  bio text not null
) on commit drop;

insert into bot_seed values
('10000000-0000-4000-8000-000000000001','bot-01@nmconnect.test','Aanya Shah (bot)',20,'woman','mithibai','ba','FY','Library 3rd Floor','Debate, sketching and campus walks','Debate Society, Rotaract','Fixture for FY B.A. matching tests.'),
('10000000-0000-4000-8000-000000000002','bot-02@nmconnect.test','Kabir Mehta (bot)',21,'man','mithibai','bsc','SY','Central Canteen','Coffee, badminton and photography','Sports Committee','Fixture for SY B.Sc matching tests.'),
('10000000-0000-4000-8000-000000000003','bot-03@nmconnect.test','Mira Iyer (bot)',22,'woman','nm-commerce','bcom','TY','Quiet Study Hall','Finance, reading and playlists','Enactus, Finance Club','Fixture for TY B.Com matching tests.'),
('10000000-0000-4000-8000-000000000004','bot-04@nmconnect.test','Dev Malhotra (bot)',20,'man','nm-commerce','bms','FY','Central Canteen','Startups, cricket and food trails','E-Cell, NSS','Fixture for FY BMS matching tests.'),
('10000000-0000-4000-8000-000000000005','bot-05@nmconnect.test','Sara Khan (bot)',23,'woman','nmims','bba','pg','Quiet Study Hall','Product design, films and yoga','Design Club','Fixture for postgraduate BBA matching tests.'),
('10000000-0000-4000-8000-000000000006','bot-06@nmconnect.test','Neil Dsouza (bot)',21,'man','upg','bsc-it','SY','Juhu Beach Walk','Coding, running and indie music','Tech Club, Rotaract','Fixture for SY B.Sc IT matching tests.'),
('10000000-0000-4000-8000-000000000007','bot-07@nmconnect.test','Tara Joshi (bot)',20,'woman','sbmp','dip-computer','FY','Central Canteen','Robotics, chess and sketching','Robotics Club','Fixture for first-year diploma matching tests.'),
('10000000-0000-4000-8000-000000000008','bot-08@nmconnect.test','Arjun Rao (bot)',22,'man','djsce','btech-cse','TY','Juhu Beach Walk','Cloud computing, football and travel','CSI, Sports Committee','Fixture for TY engineering matching tests.'),
('10000000-0000-4000-8000-000000000009','bot-09@nmconnect.test','Zoya Merchant (bot)',21,'woman','jcl','ba-llb','SY','Library 3rd Floor','Moot court, podcasts and public speaking','Legal Aid Cell','Fixture for SY law matching tests.'),
('10000000-0000-4000-8000-000000000010','bot-10@nmconnect.test','Ishaan Verma (bot)',24,'man','all','baf','pg','Quiet Study Hall','Accounting, chess and jazz','Finance Club','Fixture for postgraduate BAF matching tests.'),
('10000000-0000-4000-8000-000000000011','bot-11@nmconnect.test','Rhea Menon (bot)',20,'nonbinary','nm-commerce','bbi','FY','Central Canteen','Illustration, volunteering and cafes','NSS, Arts Circle','Fixture for non-binary BBI matching tests.'),
('10000000-0000-4000-8000-000000000012','bot-12@nmconnect.test','Om Patil (bot)',22,'any','mithibai','bsc-it','TY','Juhu Beach Walk','Data science, cycling and documentaries','Data Science Club','Fixture for prefer-not-to-say matching tests.');

insert into auth.users (
  id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
  is_sso_user, is_anonymous
)
select id, 'authenticated', 'authenticated', email,
  crypt('disabled-bot-fixture-password', gen_salt('bf')), now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  jsonb_build_object('bot_batch','nmconnect-demo-bots-2026-09','is_bot',true),
  now(), now(), false, false
from bot_seed
on conflict (id) do update set
  email = excluded.email,
  raw_user_meta_data = excluded.raw_user_meta_data,
  updated_at = now();

insert into public.profiles (
  id, login_id, email, display_name, age, gender, college, course, year,
  favourite_hangout, hobbies, interests, clubs_fests, bio, social_handles,
  is_bot, bot_batch, updated_at
)
select id, email, email, display_name, age, gender, college, course, year,
  favourite_hangout, hobbies, hobbies, clubs_fests, bio, '{}'::jsonb,
  true, 'nmconnect-demo-bots-2026-09', now()
from bot_seed
on conflict (id) do update set
  login_id = excluded.login_id,
  email = excluded.email,
  display_name = excluded.display_name,
  age = excluded.age,
  gender = excluded.gender,
  college = excluded.college,
  course = excluded.course,
  year = excluded.year,
  favourite_hangout = excluded.favourite_hangout,
  hobbies = excluded.hobbies,
  interests = excluded.interests,
  clubs_fests = excluded.clubs_fests,
  bio = excluded.bio,
  is_bot = true,
  bot_batch = excluded.bot_batch,
  updated_at = now();

commit;

-- Removal command for this exact fixture batch:
-- delete from auth.users
-- where raw_user_meta_data->>'bot_batch' = 'nmconnect-demo-bots-2026-09';
