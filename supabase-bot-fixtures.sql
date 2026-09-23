-- SVKM Connect test bots.
-- Run in Supabase SQL Editor as a project owner. This creates two bots
-- (Males/Females) for every supported college/course/year category.
-- Bots are marked is_bot=true so the Conversation coach stays disabled for them.

begin;

create temporary table bot_seed on commit drop as
with categories(college, course, years) as (
  values
    ('mithibai','ba',array['FY','SY','TY']),('mithibai','bsc',array['FY','SY','TY']),
    ('mithibai','bcom',array['FY','SY','TY']),('mithibai','bms',array['FY','SY','TY']),
    ('mithibai','baf',array['FY','SY','TY']),('mithibai','bbi',array['FY','SY','TY']),
    ('mithibai','bammc',array['FY','SY','TY']),('mithibai','bsc-it',array['FY','SY','TY']),
    ('nm-commerce','bcom',array['FY','SY','TY']),('nm-commerce','baf',array['FY','SY','TY']),
    ('nm-commerce','bbi',array['FY','SY','TY']),('nm-commerce','bms',array['FY','SY','TY']),
    ('nm-commerce','bsc-it',array['FY','SY','TY']),('nm-commerce','bcom-cs',array['FY','SY','TY']),
    ('nm-commerce','bcom-ms',array['FY','SY','TY']),('nmims','bba-fin',array['FY','SY','TY']),
    ('nmims','bba',array['FY','SY','TY']),('nmims','bsc-fin',array['Year 1','Year 2','Year 3']),
    ('nmims','bcom-hons',array['FY','SY','TY']),('upg','bms',array['FY','SY','TY']),
    ('upg','bammc',array['FY','SY','TY']),('upg','bsc-it',array['FY','SY','TY']),
    ('upg','bsc-aids',array['FY','SY','TY']),('upg','mcom',array['Year 1','Year 2']),
    ('upg','msc-it',array['Year 1','Year 2']),('upg','ma',array['Year 1','Year 2']),
    ('sbmp','dip-computer',array['First Year','Second Year','Third Year']),
    ('sbmp','dip-it',array['First Year','Second Year','Third Year']),
    ('sbmp','btech-computer',array['First Year','Second Year','Third Year','Final Year']),
    ('sbmp','btech-it',array['First Year','Second Year','Third Year','Final Year']),
    ('djsce','btech-extc',array['First Year','Second Year','Third Year','Final Year']),
    ('djsce','btech-it',array['First Year','Second Year','Third Year','Final Year']),
    ('djsce','btech-computer',array['First Year','Second Year','Third Year','Final Year']),
    ('djsce','btech-aiml',array['First Year','Second Year','Third Year','Final Year']),
    ('djsce','mtech',array['First Year','Final Year']),('jcl','ba-llb',array['First Year','Second Year','Third Year','Final Year']),
    ('jcl','bba-llb',array['First Year','Second Year','Third Year','Final Year']),
    ('jcl','llb',array['First Year','Second Year','Third Year']),('jcl','llm',array['Year 1','Year 2'])
), expanded as (
  select college,course,year,gender, row_number() over(order by college,course,year,gender) as n
  from categories cross join lateral unnest(years) as year
  cross join (values ('males'),('females')) genders(gender)
)
select
  ('10000000-0000-4000-8000-' || lpad(n::text,12,'0'))::uuid as id,
  format('bot-%s@svkmconnect.test',lpad(n::text,4,'0')) as email,
  initcap(replace(course,'-',' ')) || ' ' || initcap(gender) || ' (bot)' as display_name,
  18 + (n % 8) as age, gender, college, course, year,
  'SVKM Central Canteen' as favourite_hangout,
  'Campus walks, music and meeting interesting people' as hobbies,
  'A safe fixture profile for matching and connection tests.' as bio,
  format('svkm-demo-bots-2026-%s',to_char(current_date,'MMDD')) as bot_batch
from expanded;

insert into auth.users (
  id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
  is_sso_user, is_anonymous
)
select id,'authenticated','authenticated',email,
  crypt('disabled-bot-fixture-password',gen_salt('bf')),now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  jsonb_build_object('is_bot',true,'bot_batch',bot_batch),now(),now(),false,false
from bot_seed
on conflict (id) do update set email=excluded.email,raw_user_meta_data=excluded.raw_user_meta_data,updated_at=now();

insert into public.profiles (
  id,login_id,email,display_name,age,gender,college,course,year,
  favourite_hangout,hobbies,interests,clubs_fests,bio,social_handles,is_bot,bot_batch,updated_at
)
select id,email,email,display_name,age,gender,college,course,year,
  favourite_hangout,hobbies,hobbies,'SVKM Connect test fixtures',bio,'{}'::jsonb,true,bot_batch,now()
from bot_seed
on conflict (id) do update set
  login_id=excluded.login_id,email=excluded.email,display_name=excluded.display_name,
  age=excluded.age,gender=excluded.gender,college=excluded.college,course=excluded.course,
  year=excluded.year,favourite_hangout=excluded.favourite_hangout,hobbies=excluded.hobbies,
  interests=excluded.interests,bio=excluded.bio,is_bot=true,bot_batch=excluded.bot_batch,updated_at=now();

commit;

-- To remove only this fixture batch:
-- delete from auth.users where raw_user_meta_data->>'is_bot'='true'
-- and raw_user_meta_data->>'bot_batch' like 'svkm-demo-bots-2026-%';
