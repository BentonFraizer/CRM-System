import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Profile } from '@/types/auth.ts'

export const useUserStore = defineStore('user', () => {
  const userProfileData = ref<Profile | null>(null)
  const roles = computed(() => userProfileData.value?.roles ?? [])

  function setUserProfileData(userData: Profile | null) {
    userProfileData.value = userData
  }

  return { userProfileData, setUserProfileData, roles }
})
