import { REFRESH_TOKEN_KEY } from '@/helpers/consts.ts'
import { refresh } from '@/api/authApi.ts'
import { getUserProfileData } from '@/api/userApi.ts'
import { useUserStore } from '@/stores/user.ts'
import { AuthState } from '@/helpers/helpers.ts'

export const authState = new AuthState()

export const initAuth = async () => {
  const userStore = useUserStore()
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)

  if (!refreshToken) {
    authState.clearAccessToken()
    authState.resetIsAuthorized()
    userStore.setUserProfileData(null)
    return
  }

  try {
    const { accessToken, refreshToken: newRefreshToken } = await refresh({ refreshToken })
    authState.setAccessToken(accessToken)

    const userProfileData = await getUserProfileData()
    userStore.setUserProfileData(userProfileData)

    if (newRefreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken)
      authState.setIsAuthorized(true)
    }
  } catch {
    authState.clearAccessToken()
    authState.resetIsAuthorized()
    userStore.setUserProfileData(null)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  }
}
