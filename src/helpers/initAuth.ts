import { REFRESH_TOKEN_KEY } from '@/helpers/consts.ts'
import { refresh } from '@/api/authApi.ts'
import { getUserProfileData } from '@/api/userApi.ts'
import { useUserStore } from '@/stores/user.ts'
import { Auth } from '@/helpers/helpers.ts'

export const auth = new Auth()

export const initAuth = async () => {
  const userStore = useUserStore()
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)

  if (!refreshToken) {
    auth.clearAccessToken()
    auth.resetIsAuthorized()
    userStore.setUserProfileData(null)
    return
  }

  try {
    const { accessToken, refreshToken: newRefreshToken } = await refresh({ refreshToken })
    auth.setAccessToken(accessToken)

    const userProfileData = await getUserProfileData()
    userStore.setUserProfileData(userProfileData)

    if (newRefreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken)
      auth.setIsAuthorized(true)
    }
  } catch {
    auth.clearAccessToken()
    auth.resetIsAuthorized()
    userStore.setUserProfileData(null)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  }
}
