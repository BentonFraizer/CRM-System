import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string>('')
  const getAccessToken = computed(() => accessToken.value)

  function setAccessToken(token: string) {
    accessToken.value = token
  }

  return { accessToken, getAccessToken, setAccessToken }
})
