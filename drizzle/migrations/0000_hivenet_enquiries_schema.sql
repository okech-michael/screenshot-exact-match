-- HiveNet enquiry management schema

-- Enquiry lifecycle
create type public.enquiry_category as enum ('general','home','property','business','school','healthcare','installation','coverage');
create type public.enquiry_status as enum ('new','contacted','assessment_required','quotation_sent','converted','closed');
create type public.app_role as enum ('admin');

-- Staff roles (never stored on profiles)
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null default 'admin',
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

-- Public website enquiries
create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  category public.enquiry_category not null,
  status public.enquiry_status not null default 'new',
  full_name text not null,
  phone text not null,
  email text,
  county text,
  town text,
  estate text,
  property_type text,
  preferred_contact text not null default 'phone',
  preferred_time text,
  description text,
  details jsonb not null default '{}'::jsonb,
  source text not null default 'website',
  assigned_to uuid,
  follow_up_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index enquiries_status_created_idx on public.enquiries (status, created_at desc);
create index enquiries_category_idx on public.enquiries (category);

-- Internal staff notes on enquiries
create table public.enquiry_notes (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references public.enquiries(id) on delete cascade,
  author_id uuid not null,
  body text not null,
  created_at timestamptz not null default now()
);

create index enquiry_notes_enquiry_idx on public.enquiry_notes (enquiry_id, created_at desc);

-- Role helper (security definer avoids recursive RLS)
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- Keeps updated_at current
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger enquiries_touch_updated_at
before update on public.enquiries
for each row execute function public.touch_updated_at();

-- Grants: anonymous visitors may only submit enquiry columns; staff read/update
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

grant insert (category, full_name, phone, email, county, town, estate, property_type, preferred_contact, preferred_time, description, details, source) on public.enquiries to anon;
grant select, update on public.enquiries to authenticated;
grant all on public.enquiries to service_role;

grant select, insert (enquiry_id, author_id, body) on public.enquiry_notes to authenticated;
grant all on public.enquiry_notes to service_role;

alter table public.user_roles enable row level security;
alter table public.enquiries enable row level security;
alter table public.enquiry_notes enable row level security;

create policy "Staff can view all user roles"
  on public.user_roles for select to authenticated
  using (true);

create policy "Anyone may submit an enquiry"
  on public.enquiries for insert to anon
  with check (true);

create policy "Staff can view enquiries"
  on public.enquiries for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Staff can update enquiries"
  on public.enquiries for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Staff can view enquiry notes"
  on public.enquiry_notes for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Staff can add enquiry notes"
  on public.enquiry_notes for insert to authenticated
  with check (author_id = auth.uid() and public.has_role(auth.uid(), 'admin'));
