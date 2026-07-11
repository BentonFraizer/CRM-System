import type { Profile, UserRegistration, AuthData, Token, RefreshToken } from '@/types/auth.ts'
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

export const logout = async (): Promise<string> => {
  try {
    const response = await axiosApi.post('/user/logout')
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
