<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue'
import { reactive, ref, type UnwrapRef } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import { EMPTY_FIELD_ERROR_TEXT, REGISTRATION_FORM_RULES } from '@/helpers/consts.ts'
import type { Rule } from 'ant-design-vue/es/form'
import { register } from '@/api/authApi.ts'
import { openNotificationWithIcon } from '@/helpers/helpers.ts'

interface FormRegistrationState {
  username: string
  login: string
  password: string
  checkPassword: string
  email: string
  phoneNumber: string
}

const formRef = ref<FormInstance>()
const formState: UnwrapRef<FormRegistrationState> = reactive({
  username: '',
  login: '',
  password: '',
  checkPassword: '',
  email: '',
  phoneNumber: '',
})

const isRegistrationSuccess = ref<boolean>(false)
const isRequestInProgress = ref<boolean>(false)

const handleSubmit = () => {
  isRequestInProgress.value = true
  formRef.value
    ?.validate()
    .then(async () => {
      const newUserData = {
        username: formState.username.trim(),
        login: formState.login.trim(),
        password: formState.password,
        email: formState.email.trim(),
        phoneNumber: formState.phoneNumber.trim(),
      }

      await register(newUserData)

      resetForm()
      openNotificationWithIcon('success', 'Регистрация прошла успешно')
      isRegistrationSuccess.value = true
    })
    .catch((error) => {
      openNotificationWithIcon('error', 'Ошибка регистрации', error)
    })
    .finally(() => (isRequestInProgress.value = false))
}

const resetForm = () => {
  formRef.value && formRef.value.resetFields()
}

const validateCheckPasswordField = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject(EMPTY_FIELD_ERROR_TEXT)
  } else if (value !== formState.password) {
    return Promise.reject('Пароли не совпадают')
  } else {
    return Promise.resolve()
  }
}
</script>

<template>
  <AuthLayout>
    <a-form
      ref="formRef"
      :model="formState"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 24 }"
      :rules="REGISTRATION_FORM_RULES"
      name="registration"
      @finish="handleSubmit"
      class="registration-form"
    >
      <a-form-item label="Имя пользователя" name="username">
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item label="Логин" name="login">
        <a-input v-model:value="formState.login" />
      </a-form-item>

      <a-form-item label="Пароль" name="password">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item
        label="Повторите пароль"
        name="checkPassword"
        :rules="[{ required: true, validator: validateCheckPasswordField, trigger: 'blur' }]"
      >
        <a-input-password v-model:value="formState.checkPassword" />
      </a-form-item>

      <a-form-item label="Почтовый адрес" name="email">
        <a-input v-model:value="formState.email" />
      </a-form-item>

      <a-form-item label="Номер телефона" name="phone">
        <a-input v-model:value="formState.phoneNumber" placeholder="+79998887766" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button
          type="primary"
          :loading="isRequestInProgress"
          :disabled="isRequestInProgress"
          html-type="submit"
        >
          Зарегистрироваться
        </a-button>
      </a-form-item>
    </a-form>

    <a-result v-if="isRegistrationSuccess" status="success" title="Регистрация прошла успешно">
      <router-link to="/login">Перейти на страницу авторизации для входа в систему</router-link>
    </a-result>
  </AuthLayout>
</template>

<style scoped>
.registration-form {
  max-width: 60%;
  width: 100%;
}
</style>
