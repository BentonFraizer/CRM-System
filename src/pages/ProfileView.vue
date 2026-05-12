<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import { logout } from '@/api/authApi.ts'
import router from '@/router'
import { openNotificationWithIcon } from '@/helpers/helpers.ts'
import { useUserStore } from '@/stores/user.ts'
import { REFRESH_TOKEN_KEY } from '@/helpers/consts.ts'
import { useAuthStore } from '@/stores/auth.ts'

const userStore = useUserStore()
const authStore = useAuthStore()

const handleLogout = async () => {
  try {
    await logout()
    authStore.setAccessToken(null)
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
      <a-form
        class="form"
        name="basic"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
      >
        <a-form-item label="Имя пользователя" name="username">
          <a-input :value="userStore.userProfileData?.username" />
        </a-form-item>

        <a-form-item label="Почтовый адрес" name="email">
          <a-input :value="userStore.userProfileData?.email" />
        </a-form-item>

        <a-form-item label="Телефон" name="phone">
          <a-input :value="userStore.userProfileData?.phoneNumber" />
        </a-form-item>
      </a-form>
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

.form {
  width: 50%;
  display: flex;
  flex-direction: column;
}
</style>
