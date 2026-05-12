import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null)
  const getAccessToken = computed(() => accessToken.value)

  function setAccessToken(token: string | null) {
    accessToken.value = token
  }

  return { accessToken, getAccessToken, setAccessToken }
})
