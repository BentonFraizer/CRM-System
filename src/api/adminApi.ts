import type { User, UserFilters, UserRequest, UserRolesRequest } from '@/types/user.ts'
import type { MetaResponse } from '@/types/user.ts'
import type { Profile } from '@/types/auth.ts'
import axiosApi from '@/api/axios.ts'
import axios from 'axios'

export const getAllUsers = async (params: UserFilters): Promise<MetaResponse<Profile>> => {
  try {
    const response = await axiosApi.get('/admin/users', { params })

    return response.data
  } catch (error) {
    throw error
  }
}

export const getUserById = async (id: string): Promise<User> => {
  try {
    const response = await axiosApi.get(`/admin/users/${id}`)

    return response.data
  } catch (error) {
    throw error
  }
}

export const editUser = async (data: UserRequest, id: string): Promise<User> => {
  try {
    const response = await axiosApi.put(`/admin/users/${id}`, data)

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.request?.responseText
    } else {
      throw error
    }
  }
}

export const blockUser = async (id: string): Promise<User> => {
  try {
    const response = await axiosApi.post(`/admin/users/${id}/block`)

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.request?.responseText
    } else {
      throw error
    }
  }
}

export const unblockUser = async (id: string): Promise<User> => {
  try {
    const response = await axiosApi.post(`/admin/users/${id}/unblock`)

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.request?.responseText
    } else {
      throw error
    }
  }
}

export const editUserRights = async (data: UserRolesRequest): Promise<User> => {
  const { id, ...params } = data
  try {
    const response = await axiosApi.post(`/admin/users/${id}/rights`, params)

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.request?.responseText
    } else {
      throw error
    }
  }
}

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await axiosApi.delete(`/admin/users/${id}`)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.request?.responseText
    } else {
      throw error
    }
  }
}
