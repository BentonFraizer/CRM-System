<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import { logout } from '@/api/authApi.ts'
import router from '@/router'
import { openNotificationWithIcon } from '@/helpers/helpers.ts'
import { useUserStore } from '@/stores/user.ts'
import { REFRESH_TOKEN_KEY } from '@/helpers/consts.ts'
import { auth } from '@/helpers/initAuth.ts'

const userStore = useUserStore()

const handleLogout = async () => {
  try {
    await logout()
    auth.clearAccessToken()
    auth.resetIsAuthorized()
    userStore.setUserProfileData(null)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    await router.push('/login')
  } catch (error) {
    console.log('error: ', error)
    openNotificationWithIcon('error', 'Не удалось выполнить выход')
  }
}
</script>

<template>
  <AppLayout>
    <a-layout class="container">
      <a-button class="logout-btn" type="primary" @click="handleLogout">Выйти</a-button>
      <a-space direction="horizontal" class="space-item">
        <a-typography-text strong class="label">Имя пользователя:</a-typography-text>
        <a-typography-text>{{ userStore.userProfileData?.username }}</a-typography-text>
      </a-space>
      <a-space direction="horizontal" class="space-item">
        <a-typography-text strong class="label">Почтовый адрес:</a-typography-text>
        <a-typography-text>{{ userStore.userProfileData?.email }}</a-typography-text>
      </a-space>
      <a-space direction="horizontal" class="space-item">
        <a-typography-text strong class="label">Телефон:</a-typography-text>
        <a-typography-text>{{ userStore.userProfileData?.phoneNumber }}</a-typography-text>
      </a-space>
    </a-layout>
  </AppLayout>
</template>

<style scoped>
.container {
  padding: 50px;
}

.logout-btn {
  align-self: flex-end;
  width: 100px;
  margin-bottom: 50px;
}

.label {
  display: block;
  width: 140px;
}

.space-item {
  margin-bottom: 5px;
}
</style>
