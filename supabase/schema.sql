-- Run this in the Supabase SQL editor once.

create extension if not exists "pgcrypto";

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  attending boolean not null,
  dietary text,
  created_at timestamptz not null default now()
);

alter table public.rsvps enable row level security;

-- Guests can submit RSVPs (anon key).
create policy "Anyone can insert rsvps"
  on public.rsvps
  for insert
  to anon, authenticated
  with check (true);

-- Only signed-in admins can read RSVPs.
create policy "Authenticated users can select rsvps"
  on public.rsvps
  for select
  to authenticated
  using (true);
