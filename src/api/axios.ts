import axios, { type AxiosInstance } from 'axios'
import { BASE_URL } from '@/helpers/consts.ts'
import { useAuthStore } from '@/stores/auth.ts'

const axiosApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
  },
  timeout: 10000,
})

export default axiosApi

axiosApi.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  const accessToken = authStore.getAccessToken

  if (accessToken) {
    config.headers.set('Authorization', `Bearer ${accessToken}`)
  }
  return config
})
