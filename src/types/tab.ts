import type { TaskStatus } from '@/types/task.ts'

export interface TabsProps {
  id: TaskStatus
  label: string
  disabled?: boolean
}
