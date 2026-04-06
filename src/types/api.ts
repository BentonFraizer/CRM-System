export interface MetaResponse<T, N> {
  data: T[]
  info?: N
  meta: {
    totalAmount: number
  }
}

export interface TaskRequest {
  id?: number
  title: string
  isDone?: boolean
}
