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
