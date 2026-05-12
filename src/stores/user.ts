import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Profile } from '@/types/authApi.ts'

export const useUserStore = defineStore('user', () => {
  const userProfileData = ref<Profile | null>(null)
  const getUserProfileData = computed(() => userProfileData.value)

  function setUserProfileData(userData: Profile | null) {
    userProfileData.value = userData
  }

  return { userProfileData, getUserProfileData, setUserProfileData }
})
