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

export const openNotificationWithIcon = (type: NotificationTypes, message: string) => {
  notification[type]({
    message: message,
    placement: 'bottomLeft',
  })
}
