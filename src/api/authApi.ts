import type { Profile, UserRegistration } from '@/types/authApi.ts'
import axiosApi from '@/api/axios.ts'
import axios from 'axios'

export const register = async (newUserData: UserRegistration): Promise<Profile> => {
  try {
    const response = await axiosApi.post('/auth/signup', newUserData)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.request?.responseText
    } else {
      throw error
    }
  }
}
