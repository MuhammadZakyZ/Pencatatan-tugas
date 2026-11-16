import assert from 'node:assert/strict'
import test from 'node:test'
import {
  getDueDateStatus,
  getTaskSummary,
  getVisibleTasks,
} from './taskUtils.js'

const tasks = [
  {
    id: 'late-high',
    title: 'Algoritma graf',
    status: 'todo',
    priority: 'high',
    category: 'PemWeb',
    due_date: '2026-11-15',
    created_at: '2026-11-10T10:00:00.000Z',
  },
  {
    id: 'future-low',
    title: 'Laporan jaringan',
    status: 'todo',
    priority: 'low',
    category: 'Jaringan',
    due_date: '2026-11-20',
    created_at: '2026-11-11T10:00:00.000Z',
  },
  {
    id: 'done-today',
    title: 'Review desain',
    status: 'done',
    priority: 'medium',
    category: 'PemWeb',
    due_date: '2026-11-16',
    created_at: '2026-11-12T10:00:00.000Z',
  },
  {
    id: 'no-date',
    title: 'Baca materi',
    status: 'todo',
    priority: 'medium',
    category: null,
    due_date: null,
    created_at: '2026-11-13T10:00:00.000Z',
  },
]

test('marks overdue and today dates without flagging completed overdue tasks', () => {
  assert.equal(getDueDateStatus(tasks[0], '2026-11-16'), 'overdue')
  assert.equal(getDueDateStatus(tasks[2], '2026-11-16'), 'today')
  assert.equal(
    getDueDateStatus(
      { ...tasks[0], status: 'done' },
      '2026-11-16',
    ),
    null,
  )
  assert.equal(getDueDateStatus(tasks[3], '2026-11-16'), null)
})

test('combines case-insensitive search with status, priority, and category filters', () => {
  const result = getVisibleTasks(tasks, {
    searchTerm: 'aLgOrItMa',
    statusFilter: 'todo',
    priorityFilter: 'high',
    categoryFilter: 'PemWeb',
  })

  assert.deepEqual(result.map((task) => task.id), ['late-high'])
})

test('sorts by nearest due date with undated tasks last and by priority high first', () => {
  const byDueDate = getVisibleTasks(tasks)
  const byPriority = getVisibleTasks(tasks, { sortBy: 'priority' })

  assert.deepEqual(
    byDueDate.map((task) => task.id),
    ['late-high', 'done-today', 'future-low', 'no-date'],
  )
  assert.deepEqual(byPriority.map((task) => task.id), [
    'late-high',
    'done-today',
    'no-date',
    'future-low',
  ])
})

test('summarizes task counts and counts only unfinished overdue tasks', () => {
  assert.deepEqual(getTaskSummary(tasks, '2026-11-16'), {
    total: 4,
    todo: 3,
    done: 1,
    overdue: 1,
  })
})
