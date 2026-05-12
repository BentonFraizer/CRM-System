<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import { logout } from '@/api/authApi.ts'
import router from '@/router'
import { openNotificationWithIcon } from '@/helpers/helpers.ts'

const handleLogout = async () => {
  try {
    await logout()
    await router.push('/login')
  } catch (error) {
    console.log('error: ', error)
    openNotificationWithIcon('error', 'Не удалось выполнить выход')
  }
}
</script>

<template>
  <AppLayout
    ><h3 class="heading">Привет!</h3>
    <a-button @click="handleLogout">Выйти</a-button>
  </AppLayout>
</template>

<style scoped>
.heading {
  display: flex;
  justify-content: center;
  margin: 50px;
}
</style>
