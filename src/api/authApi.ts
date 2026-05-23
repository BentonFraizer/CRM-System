import type { AuthData, Token, RefreshToken } from '@/types/auth.ts'
import axiosApi from '@/api/axios.ts'
import axios from 'axios'

export const login = async (authUserData: AuthData): Promise<Token> => {
  try {
    const response = await axiosApi.post('/auth/signin', authUserData)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.request?.responseText
    } else {
      throw error
    }
  }
}

export const refresh = async (oldRefreshToken: RefreshToken): Promise<Token> => {
  try {
    const response = await axiosApi.post('/auth/refresh', oldRefreshToken)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.request?.responseText
    } else {
      throw error
    }
  }
}
