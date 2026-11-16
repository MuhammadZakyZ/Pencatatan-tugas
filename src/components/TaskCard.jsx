import { Link } from 'react-router-dom'

const priorityLabels = {
  low: 'Rendah',
  medium: 'Sedang',
  high: 'Tinggi',
}

function formatDueDate(value) {
  if (!value) return null
  const [year, month, day] = value.split('-').map(Number)
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(
    new Date(year, month - 1, day),
  )
}

function TaskCard({ task, onToggle, onDelete }) {
  const isDone = task.status === 'done'

  return (
    <li className={`task-card${isDone ? ' task-card-done' : ''}`}>
      <label className="task-checkbox">
        <input
          type="checkbox"
          checked={isDone}
          onChange={(event) => onToggle(task, event.target.checked)}
          aria-label={`Tandai "${task.title}" ${isDone ? 'belum selesai' : 'selesai'}`}
        />
        <span className="task-title">{task.title}</span>
      </label>
      <div className="task-card-details">
        <span className={`priority-badge priority-${task.priority}`}>
          Prioritas {priorityLabels[task.priority]}
        </span>
        {task.category && <span>{task.category}</span>}
        {task.due_date && <span>Tenggat {formatDueDate(task.due_date)}</span>}
        <span>{isDone ? 'Selesai' : 'Belum selesai'}</span>
      </div>
      {task.description && <p className="task-description">{task.description}</p>}
      <div className="task-actions">
        <Link
          className="text-link"
          to={`/tugas/${task.id}/ubah`}
          aria-label={`Ubah tugas ${task.title}`}
        >
          Ubah
        </Link>
        <button
          className="text-button danger-button"
          type="button"
          onClick={() => onDelete(task)}
          aria-label={`Hapus tugas ${task.title}`}
        >
          Hapus
        </button>
      </div>
    </li>
  )
}

export default TaskCard
