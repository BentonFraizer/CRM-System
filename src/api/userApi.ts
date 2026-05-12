import axiosApi from '@/api/axios.ts'
import type { Profile } from '@/types/authApi.ts'

export const getUserProfileData = async (): Promise<Profile> => {
  try {
    const response = await axiosApi.get('/user/profile')

    return response.data
  } catch (error) {
    throw error
  }
}
