import { Link } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import TaskCard from '../components/TaskCard'
import { useAuth } from '../hooks/useAuth'
import { useTasks } from '../hooks/useTasks'

function DashboardPage() {
  const { user } = useAuth()
  const { tasks, loading, error, refreshTasks, updateTask, deleteTask } =
    useTasks()

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

        {!loading && !error && tasks.length === 0 && (
          <section className="empty-state">
            <h2>Belum ada tugas</h2>
            <p>Tambahkan tugas pertama agar semua tenggat lebih mudah dipantau.</p>
            <Link className="primary-link" to="/tugas/baru">
              Tambah tugas pertama
            </Link>
          </section>
        )}

        {tasks.length > 0 && (
          <ul className="task-list">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}

export default DashboardPage
