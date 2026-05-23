export interface UserFilters {
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  isBlocked?: boolean
  limit?: number // сколько элементов на странице
  page?: number // номер страницы
}
