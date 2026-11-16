create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 120),
  description text check (char_length(description) <= 1000),
  category text check (char_length(category) <= 50),
  priority text not null default 'medium'
    check (priority in ('low','medium','high')),
  status text not null default 'todo'
    check (status in ('todo','done')),
  due_date date,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tasks_user_due_idx
  on public.tasks (user_id, due_date);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists tasks_set_updated_at on public.tasks;
create trigger tasks_set_updated_at
  before update on public.tasks
  for each row execute function public.set_updated_at();

alter table public.tasks enable row level security;

create policy "Pengguna melihat tugas sendiri"
  on public.tasks for select
  using (auth.uid() = user_id);

create policy "Pengguna menambah tugas sendiri"
  on public.tasks for insert
  with check (auth.uid() = user_id);

create policy "Pengguna mengubah tugas sendiri"
  on public.tasks for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Pengguna menghapus tugas sendiri"
  on public.tasks for delete
  using (auth.uid() = user_id);
