import { useCallback, useEffect, useRef, useState } from 'react'
import {
  deleteTask as deleteTaskRecord,
  getTasks,
  updateTask as updateTaskRecord,
} from '../services/tasksService'

function getErrorMessage(error, fallback) {
  return error instanceof Error ? error.message : fallback
}

export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
    void getTasks()
      .then((taskList) => {
        if (isMounted.current) setTasks(taskList)
      })
      .catch((loadError) => {
        if (isMounted.current) {
          setError(
            getErrorMessage(loadError, 'Daftar tugas tidak dapat dimuat.'),
          )
        }
      })
      .finally(() => {
        if (isMounted.current) setLoading(false)
      })
    return () => {
      isMounted.current = false
    }
  }, [])

  const refreshTasks = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const taskList = await getTasks()
      if (isMounted.current) setTasks(taskList)
    } catch (loadError) {
      if (isMounted.current) {
        setError(
          getErrorMessage(loadError, 'Daftar tugas tidak dapat dimuat.'),
        )
      }
    } finally {
      if (isMounted.current) setLoading(false)
    }
  }, [])

  const updateTask = useCallback(async (id, changes) => {
    setError('')
    try {
      const updatedTask = await updateTaskRecord(id, changes)
      if (isMounted.current) {
        setTasks((currentTasks) =>
          currentTasks.map((task) => (task.id === id ? updatedTask : task)),
        )
      }
      return true
    } catch (updateError) {
      if (isMounted.current) {
        setError(
          getErrorMessage(updateError, 'Perubahan tugas tidak dapat disimpan.'),
        )
      }
      return false
    }
  }, [])

  const deleteTask = useCallback(async (id) => {
    setError('')
    try {
      await deleteTaskRecord(id)
      if (isMounted.current) {
        setTasks((currentTasks) =>
          currentTasks.filter((task) => task.id !== id),
        )
      }
      return true
    } catch (deleteError) {
      if (isMounted.current) {
        setError(
          getErrorMessage(deleteError, 'Tugas tidak dapat dihapus.'),
        )
      }
      return false
    }
  }, [])

  return { tasks, loading, error, refreshTasks, updateTask, deleteTask }
}
