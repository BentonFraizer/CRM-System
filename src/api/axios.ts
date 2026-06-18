import axios, { type AxiosInstance } from 'axios'
import { BASE_URL, REFRESH_TOKEN_KEY } from '@/helpers/consts.ts'
import router from '@/router'
import { useUserStore } from '@/stores/user.ts'
import { authState } from '@/helpers/initAuth'

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
  const accessToken = authState.geAccessToken()

  if (accessToken) {
    config.headers.set('Authorization', `Bearer ${accessToken}`)
  }
  return config
})

axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const userStore = useUserStore()
      authState.clearAccessToken()
      userStore.setUserProfileData(null)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
      await router.push('/login')
    }

    return Promise.reject(error)
  },
)
