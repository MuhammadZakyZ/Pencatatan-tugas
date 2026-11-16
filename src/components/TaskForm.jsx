import { useState } from 'react'
import { Link } from 'react-router-dom'

function getToday() {
  const date = new Date()
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date.toISOString().slice(0, 10)
}

function TaskForm({
  initialTask,
  isEditing,
  loading,
  error,
  onSubmit,
}) {
  const [title, setTitle] = useState(initialTask?.title ?? '')
  const [description, setDescription] = useState(
    initialTask?.description ?? '',
  )
  const [category, setCategory] = useState(initialTask?.category ?? '')
  const [priority, setPriority] = useState(initialTask?.priority ?? 'medium')
  const [dueDate, setDueDate] = useState(initialTask?.due_date ?? '')
  const [validationError, setValidationError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setValidationError('')

    const trimmedTitle = title.trim()
    if (!trimmedTitle || trimmedTitle.length > 120) {
      setValidationError('Judul wajib diisi dan maksimal 120 karakter.')
      return
    }
    if (description.trim().length > 1000) {
      setValidationError('Deskripsi maksimal 1000 karakter.')
      return
    }
    if (category.trim().length > 50) {
      setValidationError('Kategori maksimal 50 karakter.')
      return
    }
    if (!isEditing && dueDate && dueDate < getToday()) {
      setValidationError('Tenggat tidak boleh sebelum hari ini.')
      return
    }

    onSubmit({
      title: trimmedTitle,
      description: description.trim() || null,
      category: category.trim() || null,
      priority,
      due_date: dueDate || null,
    })
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="form-field">
        Judul
        <input
          type="text"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={120}
          required
        />
      </label>
      <label className="form-field">
        Deskripsi
        <textarea
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          maxLength={1000}
          rows={4}
        />
      </label>
      <div className="task-form-row">
        <label className="form-field">
          Kategori / mata kuliah
          <input
            type="text"
            name="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            maxLength={50}
          />
        </label>
        <label className="form-field">
          Prioritas
          <select
            name="priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            <option value="low">Rendah</option>
            <option value="medium">Sedang</option>
            <option value="high">Tinggi</option>
          </select>
        </label>
      </div>
      <label className="form-field">
        Tenggat
        <input
          type="date"
          name="due_date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          min={isEditing ? undefined : getToday()}
        />
      </label>
      {(validationError || error) && (
        <p className="form-error" role="alert">
          {validationError || error}
        </p>
      )}
      <div className="task-form-actions">
        <Link className="secondary-link" to="/">
          Batal
        </Link>
        <button className="form-submit" type="submit" disabled={loading}>
          {loading
            ? 'Menyimpan...'
            : isEditing
              ? 'Simpan perubahan'
              : 'Simpan tugas'}
        </button>
      </div>
    </form>
  )
}

export default TaskForm
