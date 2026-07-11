import type { Rule } from 'ant-design-vue/es/form'

export const EMPTY_FIELD_ERROR_TEXT = 'Это поле не может быть пустым'
const MIN_TITLE_LENGTH = 2
const MAX_TITLE_LENGTH = 64
const MIN_USERNAME_LENGTH = 1
const MIN_LOGIN_LENGTH = 2
const MIN_PASSWORD_LENGTH = 6
const MAX_FORM_FIELDS_LENGTH = 60

const USERNAME_PATTERN = /^[a-zA-Zа-яА-ЯёЁ]+$/
const LOGIN_PATTERN = /^[a-zA-Z]+$/
const PASSWORD_PATTERN = /^\S+$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^\+?[0-9]{11}$/

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

export const REFRESH_TOKEN_KEY = 'refresh_token'

export const BASE_URL = 'https://easydev.club/api/v1'
export const SORTING_ORDER = {
  ASCEND: 'asc',
  DESCEND: 'desc',
}

export const CREATE_EDIT_TASK_RULES: Record<string, Rule[]> = {
  title: [
    {
      validator: async (_, value) => {
        if (!value || !value.trim()) {
          throw new Error(EMPTY_FIELD_ERROR_TEXT)
        }
      },
      trigger: 'change',
    },
    { min: MIN_TITLE_LENGTH, message: 'Минимальная длина текста 2 символа', trigger: 'blur' },
    { max: MAX_TITLE_LENGTH, message: 'Максимальная длина текста 64 символа', trigger: 'blur' },
  ],
}

export const REGISTRATION_FORM_RULES: Record<string, Rule[]> = {
  username: [
    {
      required: true,
      message: EMPTY_FIELD_ERROR_TEXT,
      trigger: 'change',
    },
    {
      pattern: USERNAME_PATTERN,
      message: 'Можно использовать только русские или латинские буквы (без пробелов)',
      trigger: 'change',
    },
    {
      min: MIN_USERNAME_LENGTH,
      message: 'Минимальная длина текста 1 символ',
      trigger: 'blur',
    },
    {
      max: MAX_FORM_FIELDS_LENGTH,
      message: 'Максимальная длина текста 60 символов',
      trigger: 'blur',
    },
  ],
  login: [
    {
      required: true,
      message: EMPTY_FIELD_ERROR_TEXT,
      trigger: 'change',
    },
    {
      pattern: LOGIN_PATTERN,
      message: 'Можно использовать только латинские буквы (без пробелов)',
      trigger: 'change',
    },
    {
      min: MIN_LOGIN_LENGTH,
      message: 'Минимальная длина текста 2 символа',
      trigger: 'blur',
    },
    {
      max: MAX_FORM_FIELDS_LENGTH,
      message: 'Максимальная длина текста 60 символов',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: EMPTY_FIELD_ERROR_TEXT,
      trigger: 'change',
    },
    {
      pattern: PASSWORD_PATTERN,
      message: 'Пароль не должен содержать пробелы',
      trigger: 'change',
    },
    {
      min: MIN_PASSWORD_LENGTH,
      message: 'Минимальная длина текста 6 символов',
      trigger: 'blur',
    },
    {
      max: MAX_FORM_FIELDS_LENGTH,
      message: 'Максимальная длина текста 60 символов',
      trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: EMPTY_FIELD_ERROR_TEXT,
      trigger: 'change',
    },
    {
      pattern: EMAIL_PATTERN,
      message: 'Введите валидный email',
      trigger: 'blur',
    },
  ],
  phoneNumber: [
    {
      pattern: PHONE_PATTERN,
      message: 'Введите номер телефона в формате +79998887766',
      trigger: 'blur',
    },
  ],
}

export const AUTHORIZATION_FORM_RULES: Record<string, Rule[]> = {
  login: [
    {
      required: true,
      message: EMPTY_FIELD_ERROR_TEXT,
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: EMPTY_FIELD_ERROR_TEXT,
      trigger: 'blur',
    },
  ],
}

export const EDIT_USER_PROFILE_FORM_RULES: Record<string, Rule[]> = {
  username: [
    {
      required: true,
      message: EMPTY_FIELD_ERROR_TEXT,
      trigger: 'change',
    },
    {
      pattern: USERNAME_PATTERN,
      message: 'Можно использовать только русские или латинские буквы (без пробелов)',
      trigger: 'change',
    },
    {
      min: MIN_USERNAME_LENGTH,
      message: 'Минимальная длина текста 1 символ',
      trigger: 'blur',
    },
    {
      max: MAX_FORM_FIELDS_LENGTH,
      message: 'Максимальная длина текста 60 символов',
      trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: EMPTY_FIELD_ERROR_TEXT,
      trigger: 'change',
    },
    {
      pattern: EMAIL_PATTERN,
      message: 'Введите валидный email',
      trigger: 'blur',
    },
  ],
  phoneNumber: [
    {
      pattern: PHONE_PATTERN,
      message: 'Введите номер телефона в формате +79998887766',
      trigger: 'blur',
    },
  ],
}
