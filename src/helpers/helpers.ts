import { getTasks } from '@/api/tasksApi.ts'
import type { Ref } from 'vue'
import type { TaskStatus } from '@/types/task.ts'

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
