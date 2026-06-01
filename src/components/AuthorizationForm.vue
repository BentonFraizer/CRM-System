<script setup lang="ts">
import { reactive, ref, type UnwrapRef } from 'vue'
import router from '@/router'
import type { FormInstance } from 'ant-design-vue'
import { useAuthStore } from '@/stores/auth.ts'
import { useUserStore } from '@/stores/user.ts'
import { AUTHORIZATION_FORM_RULES, REFRESH_TOKEN_KEY } from '@/helpers/consts.ts'
import { openNotificationWithIcon } from '@/helpers/helpers.ts'
import { login } from '@/api/authApi.ts'
import { getUserProfileData } from '@/api/userApi.ts'

const authStore = useAuthStore()
const userStore = useUserStore()

interface FormAuthorizationState {
  login: string
  password: string
}

const formRef = ref<FormInstance>()
const formState: UnwrapRef<FormAuthorizationState> = reactive({
  login: '',
  password: '',
})

const isAuthorizationSuccess = ref<boolean>(false)
const isRequestInProgress = ref<boolean>(false)

const handleSubmit = () => {
  isRequestInProgress.value = true
  formRef.value
    ?.validate()
    .then(async () => {
      const authUserData = {
        login: formState.login.trim(),
        password: formState.password,
      }

      const tokens = await login(authUserData)
      authStore.setAccessToken(tokens.accessToken)
      authStore.setIsAuthorized(true)
      localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)

      const userProfileData = await getUserProfileData()
      userStore.setUserProfileData(userProfileData)

      await router.push('/')

      resetForm()
      openNotificationWithIcon('success', 'Вход успешно выполнен')
      isAuthorizationSuccess.value = true
    })
    .catch((error) => {
      console.error(error)
      openNotificationWithIcon('error', 'Неверные логин или пароль')
    })
    .finally(() => (isRequestInProgress.value = false))
}

const resetForm = () => {
  formRef.value && formRef.value.resetFields()
}
</script>

<template>
  <a-form
    ref="formRef"
    :model="formState"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 24 }"
    :rules="AUTHORIZATION_FORM_RULES"
    name="registration"
    @finish="handleSubmit"
    class="form"
  >
    <a-form-item label="Логин" name="login">
      <a-input v-model:value="formState.login" />
    </a-form-item>

    <a-form-item label="Пароль" name="password">
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8 }">
      <a-button
        class="submit-button"
        type="primary"
        :loading="isRequestInProgress"
        :disabled="isRequestInProgress"
        html-type="submit"
      >
        Войти
      </a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped>
.form {
  max-width: 60%;
  width: 100%;
}

.submit-button {
  width: 100%;
  background-color: rgb(127, 38, 91);

  &:hover {
    background-color: rgb(143, 44, 102);
  }

  &:disabled {
    color: white;
  }
}
</style>
