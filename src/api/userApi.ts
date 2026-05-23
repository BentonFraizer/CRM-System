import axiosApi from '@/api/axios.ts'
import type { Profile } from '@/types/auth.ts'
import type { UserMetaResponse } from '@/types/api.ts'
import type { UserFilters } from '@/types/user.ts'

export const getUserProfileData = async (): Promise<Profile> => {
  try {
    const response = await axiosApi.get('/user/profile')

    return response.data
  } catch (error) {
    throw error
  }
}

export const getAllUsers = async (params: UserFilters): Promise<UserMetaResponse<Profile>> => {
  try {
    const response = await axiosApi.get('/admin/users', { params })

    return response.data
  } catch (error) {
    throw error
  }
}
