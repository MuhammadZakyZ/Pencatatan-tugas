import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import TaskForm from '../components/TaskForm'
import { createTask, getTaskById, updateTask } from '../services/tasksService'

function TaskFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)
  const [initialTask, setInitialTask] = useState(null)
  const [loadingTask, setLoadingTask] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return undefined

    let isMounted = true
    async function loadTask() {
      setLoadingTask(true)
      setError('')
      try {
        const task = await getTaskById(id)
        if (isMounted) setInitialTask(task)
      } catch (loadError) {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : 'Tugas tidak dapat dimuat. Silakan coba lagi.',
          )
        }
      } finally {
        if (isMounted) setLoadingTask(false)
      }
    }

    void loadTask()
    return () => {
      isMounted = false
    }
  }, [id])

  async function handleSubmit(task) {
    setSaving(true)
    setError('')
    try {
      if (isEditing) {
        await updateTask(id, task)
      } else {
        await createTask(task)
      }
      navigate('/', { replace: true })
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : 'Tugas tidak dapat disimpan. Silakan coba lagi.',
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="dashboard-page">
      <AppHeader />
      <main className="task-form-card">
        <Link className="text-link back-link" to="/">
          Kembali ke daftar tugas
        </Link>
        <p className="eyebrow">{isEditing ? 'Perbarui tugas' : 'Tugas baru'}</p>
        <h1>{isEditing ? 'Ubah tugas' : 'Tambah tugas'}</h1>
        {loadingTask ? (
          <p className="task-status" role="status">
            Memuat tugas...
          </p>
        ) : error && isEditing && !initialTask ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : (
          <TaskForm
            key={initialTask?.id ?? 'new'}
            initialTask={initialTask}
            isEditing={isEditing}
            loading={saving}
            error={error}
            onSubmit={handleSubmit}
          />
        )}
      </main>
    </div>
  )
}

export default TaskFormPage
