export const TASK_FILTERS = {
  all: {
    status: 'all',
    title: 'Все',
  },
  inWork: {
    status: 'inWork',
    title: 'В работе',
  },
  completed: {
    status: 'completed',
    title: 'Завершенные',
  },
} as const

export const BASE_URL = 'https://easydev.club/api/v1'
