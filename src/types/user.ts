import type { Roles } from '@/types/auth.ts'

export interface UserFilters {
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  isBlocked?: boolean | null
  limit?: number // сколько элементов на странице
  page?: number // номер страницы
}

export interface User {
  id: number
  username: string
  email: string
  date: string // ISO date string
  isBlocked: boolean
  roles: Roles[]
  phoneNumber: string
}

export interface UserRequest {
  username?: string
  email?: string
  phoneNumber?: string
}

export interface UserRolesRequest {
  id: string
  roles: Roles[]
}

export interface MetaResponse<T> {
  data: T[]
  meta: {
    totalAmount: number
    sortBy: string
    sortOrder: 'asc' | 'desc'
  }
}
