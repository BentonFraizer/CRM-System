import { getTasks } from '@/api/tasksApi.ts'
import type { TaskStatus } from '@/types/task.ts'
import { notification } from 'ant-design-vue'
import type { NotificationTypes } from '@/types/notification.ts'
import type { Role } from '@/types/auth.ts'

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

export const hasUserRole = (currenUserRoles: Role[], roleToCheck: Role) => {
  return currenUserRoles.includes(roleToCheck)
}

export const formatIsoDate = (isoDate: string): string => {
  return new Date(isoDate).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
