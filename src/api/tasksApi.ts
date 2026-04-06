import { TABS } from '@/helpers/helpers.ts'
import type { MetaResponse, TaskRequest } from '@/types/api.ts'
import type { Task, TaskInfo } from '@/types/task.ts'

export const getTasks = async (status = TABS.all.status): Promise<MetaResponse<Task, TaskInfo>> => {
  const response = await fetch(`https://easydev.club/api/v1/todos?filter=${status}`)
  if (!response.ok) {
    const errorData = await response.json()

    throw new Error(errorData.message || 'Не удалось загрузить список задач')
  }

  return await response.json()
}

export const createTask = async (newTaskData: TaskRequest) => {
  try {
    await fetch('https://easydev.club/api/v1/todos', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(newTaskData),
    })
  } catch (error) {
    throw error
  }
}

export const updateTask = async (taskDataToSend: TaskRequest) => {
  const { id, isDone, title } = taskDataToSend
  try {
    await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ title, isDone }),
    })
  } catch (error) {
    throw error
  }
}

export const deleteTask = async (id: number) => {
  try {
    await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
      },
    })
  } catch (error) {
    throw error
  }
}
