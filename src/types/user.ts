import type { Role } from '@/types/auth.ts'

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
  roles: Role[]
  phoneNumber: string
}

export interface UserRequest {
  username?: string
  email?: string
  phoneNumber?: string
}

export interface UserRequestWithId extends UserRequest {
  id: string
}

export interface UserRolesRequest {
  id: string
  roles: Role[]
}
