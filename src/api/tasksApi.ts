import { TASK_FILTERS } from '@/helpers/consts.ts'
import type {
  Task,
  TaskInfo,
  TaskStatus,
  CreateUpdateTaskResponse,
  MetaResponse,
  TaskRequest,
} from '@/types/task.ts'
import axiosApi from '@/api/axios.ts'

export const getTasks = async (
  status: TaskStatus = TASK_FILTERS.all.status,
): Promise<MetaResponse<Task, TaskInfo>> => {
  try {
    const response = await axiosApi.get('/todos', {
      params: {
        filter: status,
      },
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export const createTask = async (newTaskData: TaskRequest): Promise<CreateUpdateTaskResponse> => {
  try {
    const response = await axiosApi.post('/todos', newTaskData)

    return response.data
  } catch (error) {
    throw error
  }
}

export const updateTask = async (
  taskDataToSend: TaskRequest,
): Promise<CreateUpdateTaskResponse> => {
  const { id, isDone, title } = taskDataToSend
  try {
    const response = await axiosApi.put(`/todos/${id}`, { title: title, isDone: isDone })

    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteTask = async (id: number): Promise<void> => {
  try {
    await axiosApi.delete(`/todos/${id}`)
  } catch (error) {
    throw error
  }
}
