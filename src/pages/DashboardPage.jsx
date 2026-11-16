import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import TaskCard from '../components/TaskCard'
import { useAuth } from '../hooks/useAuth'
import { useTasks } from '../hooks/useTasks'
import {
  getLocalDateString,
  getTaskSummary,
  getVisibleTasks,
} from '../lib/taskUtils'

const priorityLabels = {
  low: 'Rendah',
  medium: 'Sedang',
  high: 'Tinggi',
}

function DashboardPage() {
  const { user } = useAuth()
  const { tasks, loading, error, refreshTasks, updateTask, deleteTask } =
    useTasks()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState('due_date')
  const today = getLocalDateString()

  const categories = useMemo(
    () =>
      [...new Set(tasks.map((task) => task.category).filter(Boolean))].sort(
        (first, second) => first.localeCompare(second, 'id'),
      ),
    [tasks],
  )

  const summary = useMemo(() => getTaskSummary(tasks, today), [tasks, today])

  const visibleTasks = useMemo(
    () =>
      getVisibleTasks(tasks, {
        searchTerm,
        statusFilter,
        priorityFilter,
        categoryFilter,
        sortBy,
      }),
    [tasks, searchTerm, statusFilter, priorityFilter, categoryFilter, sortBy],
  )

  function resetFilters() {
    setSearchTerm('')
    setStatusFilter('all')
    setPriorityFilter('all')
    setCategoryFilter('all')
    setSortBy('due_date')
  }

  async function handleToggle(task, isDone) {
    await updateTask(task.id, {
      status: isDone ? 'done' : 'todo',
      completed_at: isDone ? new Date().toISOString() : null,
    })
  }

  async function handleDelete(task) {
    if (!window.confirm(`Hapus tugas "${task.title}"? Tindakan ini tidak dapat dibatalkan.`)) {
      return
    }
    await deleteTask(task.id)
  }

  return (
    <div className="dashboard-page">
      <AppHeader />
      <main className="dashboard-content">
        <div className="dashboard-toolbar">
          <div>
            <p className="eyebrow">Daftar tugas</p>
            <h1>Halo, {user?.email}</h1>
          </div>
          <Link className="primary-link" to="/tugas/baru">
            Tambah tugas
          </Link>
        </div>

        {error && (
          <div className="form-error task-error" role="alert">
            <span>{error}</span>
            <button type="button" className="text-button" onClick={refreshTasks}>
              Coba lagi
            </button>
          </div>
        )}

        {loading && tasks.length === 0 && (
          <p className="task-status" role="status">
            Memuat daftar tugas...
          </p>
        )}

        {(tasks.length > 0 || (!loading && !error)) && (
          <section className="summary-grid" aria-label="Ringkasan tugas">
            <article className="summary-card">
              <span>Total</span>
              <strong>{summary.total}</strong>
            </article>
            <article className="summary-card">
              <span>Belum selesai</span>
              <strong>{summary.todo}</strong>
            </article>
            <article className="summary-card">
              <span>Selesai</span>
              <strong>{summary.done}</strong>
            </article>
            <article className="summary-card summary-card-overdue">
              <span>Terlambat</span>
              <strong>{summary.overdue}</strong>
            </article>
          </section>
        )}

        {tasks.length > 0 && (
          <section className="task-controls" aria-label="Cari dan saring tugas">
            <label className="filter-field">
              Cari judul
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Cari tugas..."
              />
            </label>
            <label className="filter-field">
              Status
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="all">Semua status</option>
                <option value="todo">Belum selesai</option>
                <option value="done">Selesai</option>
              </select>
            </label>
            <label className="filter-field">
              Prioritas
              <select
                value={priorityFilter}
                onChange={(event) => setPriorityFilter(event.target.value)}
              >
                <option value="all">Semua prioritas</option>
                {Object.entries(priorityLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="filter-field">
              Kategori
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
              >
                <option value="all">Semua kategori</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <label className="filter-field">
              Urutkan
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              >
                <option value="due_date">Tenggat terdekat</option>
                <option value="priority">Prioritas</option>
                <option value="created_at">Terbaru dibuat</option>
              </select>
            </label>
          </section>
        )}

        {!loading && !error && tasks.length === 0 && (
          <section className="empty-state">
            <h2>Belum ada tugas</h2>
            <p>Tambahkan tugas pertama agar semua tenggat lebih mudah dipantau.</p>
            <Link className="primary-link" to="/tugas/baru">
              Tambah tugas pertama
            </Link>
          </section>
        )}

        {tasks.length > 0 && visibleTasks.length === 0 && (
          <section className="empty-state filtered-empty-state">
            <h2>Tidak ada tugas yang cocok</h2>
            <p>Coba ubah kata pencarian atau filter yang dipilih.</p>
            <button
              className="text-button"
              type="button"
              onClick={resetFilters}
            >
              Reset pencarian dan filter
            </button>
          </section>
        )}

        {visibleTasks.length > 0 && (
          <>
            <p className="task-result-count" role="status">
              Menampilkan {visibleTasks.length} dari {tasks.length} tugas
            </p>
            <ul className="task-list">
              {visibleTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  )
}

export default DashboardPage
