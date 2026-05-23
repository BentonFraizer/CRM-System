import { REFRESH_TOKEN_KEY } from '@/helpers/consts.ts'
import { useAuthStore } from '@/stores/auth.ts'
import { login, refresh } from '@/api/authApi.ts'
import { getUserProfileData } from '@/api/userApi.ts'
import { useUserStore } from '@/stores/user.ts'

export const initAuth = async () => {
  const userStore = useUserStore()
  const authStore = useAuthStore()
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)

  if (!refreshToken) {
    authStore.setAccessToken(null)
    authStore.setIsAuthorized(false)
    userStore.setUserProfileData(null)

    // TODO: удалить до return после merge в develop
    const tokens = await login({ login: 'admin', password: '123456' })
    authStore.setAccessToken(tokens.accessToken)
    const userProfileData = await getUserProfileData()
    userStore.setUserProfileData(userProfileData)
    return
  }

  try {
    const { accessToken, refreshToken: newRefreshToken } = await refresh({ refreshToken })
    authStore.setAccessToken(accessToken)

    const userProfileData = await getUserProfileData()
    userStore.setUserProfileData(userProfileData)

    if (newRefreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken)
      authStore.setIsAuthorized(true)
    }
  } catch {
    authStore.setAccessToken(null)
    authStore.setIsAuthorized(false)
    userStore.setUserProfileData(null)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  }
}
