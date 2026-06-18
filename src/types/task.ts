export interface Task {
  id: number
  title: string
  created: string
  isDone: boolean
}

export interface TaskInfo {
  all: number
  completed: number
  inWork: number
}

export type TaskStatus = 'all' | 'completed' | 'inWork'

// tasks api types
export interface MetaResponse<T, N> {
  data: T[]
  info: N
  meta: {
    totalAmount: number
  }
}

export interface TaskRequest {
  id?: number
  title: string
  isDone?: boolean
}

export interface CreateUpdateTaskResponse {
  id: number
  title: string
  isDone: boolean
  created: string
}
