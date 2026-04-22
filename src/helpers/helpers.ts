import { getTasks } from '@/api/tasksApi.ts'
import type { Ref } from 'vue'
import type { TaskStatus } from '@/types/task.ts'
import { notification } from 'ant-design-vue'
import type { NotificationTypes } from '@/types/notification.ts'

export const loadTasks = async (
  status: TaskStatus,
  isLoading: Ref<boolean, boolean>,
  errorMessage: string,
) => {
  try {
    isLoading.value = true
    return await getTasks(status)
  } catch (error) {
    console.error(error)
    alert(errorMessage)
  } finally {
    isLoading.value = false
  }
}

export const openNotificationWithIcon = (type: NotificationTypes, message: string) => {
  notification[type]({
    message: message,
    placement: 'bottomLeft',
  })
}
