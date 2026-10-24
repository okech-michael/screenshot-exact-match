-- Server-side enquiry creation: validates, throttles and assigns a reference atomically.
create or replace function public.create_enquiry(
  p_category text,
  p_full_name text,
  p_phone text,
  p_email text,
  p_county text,
  p_town text,
  p_estate text,
  p_property_type text,
  p_preferred_contact text,
  p_preferred_time text,
  p_description text,
  p_details jsonb,
  p_source text
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_recent int;
  v_ref text;
begin
  -- Basic sanity: reject empty required fields at the DB boundary too.
  if p_category is null or p_full_name is null or p_phone is null
     or length(trim(p_full_name)) < 2 or length(trim(p_phone)) < 7 then
    raise exception 'INVALID_INPUT';
  end if;

  -- Rate limit: at most 3 enquiries from the same phone number per 15 minutes.
  select count(*) into v_recent
  from public.enquiries
  where phone = p_phone and created_at > now() - interval '15 minutes';
  if v_recent >= 3 then
    raise exception 'RATE_LIMITED';
  end if;

  v_ref := 'HN-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 8));

  insert into public.enquiries (
    reference, category, full_name, phone, email, county, town, estate,
    property_type, preferred_contact, preferred_time, description, details, source
  ) values (
    v_ref,
    p_category::public.enquiry_category,
    trim(p_full_name),
    trim(p_phone),
    nullif(trim(coalesce(p_email, '')), ''),
    nullif(trim(coalesce(p_county, '')), ''),
    nullif(trim(coalesce(p_town, '')), ''),
    nullif(trim(coalesce(p_estate, '')), ''),
    nullif(trim(coalesce(p_property_type, '')), ''),
    coalesce(p_preferred_contact, 'phone'),
    nullif(trim(coalesce(p_preferred_time, '')), ''),
    trim(p_description),
    coalesce(p_details, '{}'::jsonb),
    coalesce(nullif(trim(p_source), ''), 'website')
  );

  return v_ref;
end;
$$;

revoke all on function public.create_enquiry(text, text, text, text, text, text, text, text, text, text, text, jsonb, text) from public;
grant execute on function public.create_enquiry(text, text, text, text, text, text, text, text, text, text, text, jsonb, text) to anon, authenticated;
