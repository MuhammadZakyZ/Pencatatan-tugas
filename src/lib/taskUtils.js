export function getLocalDateString(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getDueDateStatus(task, today = getLocalDateString()) {
  if (!task.due_date) return null
  if (task.due_date === today) return 'today'
  if (task.status !== 'done' && task.due_date < today) return 'overdue'
  return null
}

function compareDueDates(first, second) {
  if (!first.due_date && !second.due_date) return 0
  if (!first.due_date) return 1
  if (!second.due_date) return -1
  return first.due_date.localeCompare(second.due_date)
}

export function getVisibleTasks(
  tasks,
  {
    searchTerm = '',
    statusFilter = 'all',
    priorityFilter = 'all',
    categoryFilter = 'all',
    sortBy = 'due_date',
  } = {},
) {
  const priorityOrder = { high: 0, medium: 1, low: 2 }
  const normalizedSearch = searchTerm.trim().toLocaleLowerCase('id-ID')
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLocaleLowerCase('id-ID')
      .includes(normalizedSearch)
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
    const matchesPriority =
      priorityFilter === 'all' || task.priority === priorityFilter
    const matchesCategory =
      categoryFilter === 'all' || task.category === categoryFilter

    return (
      matchesSearch && matchesStatus && matchesPriority && matchesCategory
    )
  })

  return filteredTasks.sort((first, second) => {
    if (sortBy === 'priority') {
      return (
        priorityOrder[first.priority] - priorityOrder[second.priority] ||
        compareDueDates(first, second)
      )
    }
    if (sortBy === 'created_at') {
      return second.created_at.localeCompare(first.created_at)
    }
    return compareDueDates(first, second)
  })
}

export function getTaskSummary(tasks, today = getLocalDateString()) {
  return {
    total: tasks.length,
    todo: tasks.filter((task) => task.status === 'todo').length,
    done: tasks.filter((task) => task.status === 'done').length,
    overdue: tasks.filter(
      (task) => getDueDateStatus(task, today) === 'overdue',
    ).length,
  }
}
