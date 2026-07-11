import { getTasks } from '@/api/tasksApi.ts'
import type { TaskStatus } from '@/types/task.ts'
import { notification } from 'ant-design-vue'
import type { NotificationTypes } from '@/types/notification.ts'

export const loadTasks = async (status: TaskStatus, errorMessage: string) => {
  try {
    return await getTasks(status)
  } catch (error) {
    console.error(error)
    openNotificationWithIcon('error', errorMessage)
  }
}

export const openNotificationWithIcon = (
  type: NotificationTypes,
  message: string,
  description?: string,
) => {
  notification[type]({
    message: message,
    description: description,
    placement: 'bottomLeft',
  })
}

export const hasUserRoles = <T>(currenUserRoles: T[], roleToCheck: T[]) =>
  roleToCheck.some((role) => currenUserRoles.includes(role))

export const formatIsoDate = (isoDate: string): string => {
  return new Date(isoDate).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export class AuthState {
  #accessToken: string | null = null
  #isAuthorized: boolean = false

  geAccessToken() {
    return this.#accessToken
  }

  setAccessToken(value: string) {
    this.#accessToken = value
  }

  clearAccessToken() {
    this.#accessToken = null
  }

  getIsAuthorized() {
    return this.#isAuthorized
  }

  setIsAuthorized(value: boolean) {
    this.#isAuthorized = value
  }

  resetIsAuthorized() {
    this.#isAuthorized = false
  }
}
