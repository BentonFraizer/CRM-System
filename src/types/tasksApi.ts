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

export interface UserMetaResponse<T> {
  data: T[]
  meta: {
    totalAmount: number
    sortBy: string
    sortOrder: 'asc' | 'desc'
  }
}
