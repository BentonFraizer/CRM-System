export const validateTaskTitle = (title: string): string => {
  let errorMessage = ''
  const MIN_TITLE_LENGTH = 2
  const MAX_TITLE_LENGTH = 64
  if (title.length === 0) {
    errorMessage = 'Это поле не может быть пустым'
  } else if (title.length < MIN_TITLE_LENGTH) {
    errorMessage = 'Минимальная длина текста 2 символа'
  } else if (title.length > MAX_TITLE_LENGTH) {
    errorMessage = 'Максимальная длина текста 64 символа'
  }

  return errorMessage
}

export const TABS = {
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
