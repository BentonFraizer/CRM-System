import type { Rule } from 'ant-design-vue/es/form'

const MIN_TITLE_LENGTH = 2
const MAX_TITLE_LENGTH = 64

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

export const USER_ROLES = { ADMIN: 'ADMIN', USER: 'USER', MODERATOR: 'MODERATOR' } as const
export const REFRESH_TOKEN_KEY = 'refresh_token'

export const BASE_URL = 'https://easydev.club/api/v1'

export const CREATE_EDIT_TASK_RULES: Record<string, Rule[]> = {
  title: [
    {
      validator: async (_, value) => {
        if (!value || !value.trim()) {
          throw new Error('Это поле не может быть пустым')
        }
      },
      trigger: 'change',
    },
    { min: MIN_TITLE_LENGTH, message: 'Минимальная длина текста 2 символа', trigger: 'blur' },
    { max: MAX_TITLE_LENGTH, message: 'Максимальная длина текста 64 символа', trigger: 'blur' },
  ],
}
