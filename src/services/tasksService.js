import { supabase } from '../lib/supabaseClient'

const taskColumns =
  'id,title,description,category,priority,status,due_date,completed_at,created_at,updated_at'

export async function getTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select(taskColumns)
    .order('due_date', { ascending: true, nullsFirst: false })
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error('Daftar tugas tidak dapat dimuat. Silakan coba lagi.')
  }
  return data
}

export async function getTaskById(id) {
  const { data, error } = await supabase
    .from('tasks')
    .select(taskColumns)
    .eq('id', id)
    .maybeSingle()

  if (error) {
    throw new Error('Tugas tidak dapat dimuat. Silakan coba lagi.')
  }
  if (!data) {
    throw new Error('Tugas tidak ditemukan atau tidak dapat diakses.')
  }
  return data
}

export async function createTask(task) {
  const { data, error } = await supabase
    .from('tasks')
    .insert(task)
    .select(taskColumns)
    .single()

  if (error) {
    throw new Error('Tugas tidak dapat disimpan. Periksa data dan coba lagi.')
  }
  return data
}

export async function updateTask(id, changes) {
  const { data, error } = await supabase
    .from('tasks')
    .update(changes)
    .eq('id', id)
    .select(taskColumns)
    .maybeSingle()

  if (error) {
    throw new Error('Perubahan tugas tidak dapat disimpan. Silakan coba lagi.')
  }
  if (!data) {
    throw new Error('Tugas tidak ditemukan atau tidak dapat diakses.')
  }
  return data
}

export async function deleteTask(id) {
  const { data, error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
    .select('id')
    .maybeSingle()

  if (error) {
    throw new Error('Tugas tidak dapat dihapus. Silakan coba lagi.')
  }
  if (!data) {
    throw new Error('Tugas tidak ditemukan atau tidak dapat diakses.')
  }
}
