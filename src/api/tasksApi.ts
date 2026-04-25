import { TASK_FILTERS } from '@/helpers/consts.ts'
import type { CreateUpdateTaskResponse, MetaResponse, TaskRequest } from '@/types/api.ts'
import type { Task, TaskInfo, TaskStatus } from '@/types/task.ts'
import { BASE_URL } from '@/helpers/consts.ts'

export const getTasks = async (
  status: TaskStatus = TASK_FILTERS.all.status,
): Promise<MetaResponse<Task, TaskInfo>> => {
  try {
    const response = await fetch(`${BASE_URL}/todos?filter=${status}`)

    return await response.json()
  } catch (error) {
    throw error
  }
}

export const createTask = async (newTaskData: TaskRequest): Promise<CreateUpdateTaskResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(newTaskData),
    })

    return await response.json()
  } catch (error) {
    throw error
  }
}

export const updateTask = async (
  taskDataToSend: TaskRequest,
): Promise<CreateUpdateTaskResponse> => {
  const { id, isDone, title } = taskDataToSend
  try {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ title, isDone }),
    })

    return await response.json()
  } catch (error) {
    throw error
  }
}

export const deleteTask = async (id: number): Promise<void> => {
  try {
    await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
      },
    })
  } catch (error) {
    throw error
  }
}
