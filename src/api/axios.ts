import axios, { type AxiosInstance } from 'axios'
import { BASE_URL, REFRESH_TOKEN_KEY } from '@/helpers/consts.ts'
import { useAuthStore } from '@/stores/auth.ts'
import router from '@/router'
import { useUserStore } from '@/stores/user.ts'

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

axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      const userStore = useUserStore()
      authStore.setAccessToken(null)
      userStore.setUserProfileData(null)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
      await router.push('/login')
    }

    return Promise.reject(error)
  },
)
