create table if not exists public.tributes (
  id uuid primary key default gen_random_uuid(),
  name varchar(100) not null,
  message text not null check (char_length(message) between 3 and 1000),
  created_at timestamptz not null default now()
);

alter table public.tributes enable row level security;

drop policy if exists "Public can read tributes" on public.tributes;
drop policy if exists "Public can submit tributes" on public.tributes;

create policy "Public can read tributes"
on public.tributes for select
using (true);

create policy "Public can submit tributes"
on public.tributes for insert
to anon
with check (
  char_length(name) between 2 and 100
  and char_length(message) between 3 and 1000
);
