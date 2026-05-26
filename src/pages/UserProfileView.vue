<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref, reactive, type UnwrapRef } from 'vue'
import type { User, UserRequest } from '@/types/user.ts'
import { editUser, getUserById } from '@/api/adminApi.ts'
import type { FormInstance } from 'ant-design-vue'
import { openNotificationWithIcon } from '@/helpers/helpers.ts'
import { EDIT_USER_PROFILE_FORM_RULES } from '@/helpers/consts.ts'

const route = useRoute()

const userData = ref<User | null>(null)
const isEditMode = ref<boolean>(false)

const isRequestInProgress = ref<boolean>(false)

const initialFormState = ref<UserRequest>({
  username: '',
  email: '',
  phoneNumber: '',
})

interface FormEditUserState {
  username: string
  email: string
  phoneNumber: string
}

const formRef = ref<FormInstance>()
const formState: UnwrapRef<FormEditUserState> = reactive({
  username: '',
  email: '',
  phoneNumber: '',
})

const handleSubmit = () => {
  isRequestInProgress.value = true
  formRef.value
    ?.validate()
    .then(async () => {
      const newUserData = {
        id: route.params.id,
        username: formState.username.trim(),
        email: formState.email.trim(),
        phoneNumber: formState.phoneNumber.trim(),
      }

      const updaterUserData = await editUser(newUserData)
      initialization(updaterUserData)
      userData.value = updaterUserData
      isEditMode.value = false

      openNotificationWithIcon('success', 'Профиль успешно изменен')
    })
    .catch((error) => {
      openNotificationWithIcon('error', 'Ошибка изменения данных профиля', error)
    })
    .finally(() => (isRequestInProgress.value = false))
}

const handleActivateEditMode = () => {
  initialFormState.value = userData.value
  isEditMode.value = true
}

const handleCancelEditMode = () => {
  formState.username = initialFormState.value.username
  formState.email = initialFormState.value.email
  formState.phoneNumber = initialFormState.value.phoneNumber

  isEditMode.value = false
}

const initialization = (userData: User): void => {
  initialFormState.value = userData

  formState.username = userData.username
  formState.email = userData.email
  formState.phoneNumber = userData.phoneNumber
}

onMounted(async () => {
  userData.value = await getUserById(route.params.id)

  initialization(userData.value)
  console.log('userData.value: ', userData.value)
})
</script>

<template>
  <AppLayout>
    <template v-if="userData">
      <div class="header">
        <h3>Пользователь: {{ userData.username }}</h3>
        <a-button type="primary" @click="$router.push('/users')">Вернуться</a-button>
      </div>
      <template v-if="isEditMode">
        <div class="user-form">
          <a-form
            ref="formRef"
            :model="formState"
            :label-col="{ flex: '160px' }"
            :wrapper-col="{ flex: '300px' }"
            :rules="EDIT_USER_PROFILE_FORM_RULES"
            name="registration"
            @finish="handleSubmit"
            class="form"
            layout="horizontal"
          >
            <a-form-item label="Имя пользователя" name="username">
              <a-input v-model:value="formState.username" />
            </a-form-item>

            <a-form-item label="Почтовый адрес" name="email">
              <a-input v-model:value="formState.email" />
            </a-form-item>

            <a-form-item label="Номер телефона" name="phoneNumber">
              <a-input v-model:value="formState.phoneNumber" placeholder="+79998887766" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
              <a-button
                type="default"
                :loading="isRequestInProgress"
                :disabled="isRequestInProgress"
                html-type="button"
                @click="handleCancelEditMode"
                class="cancel-btn"
              >
                Отмена
              </a-button>
              <a-button
                class="submit-button"
                type="primary"
                :loading="isRequestInProgress"
                :disabled="isRequestInProgress"
                html-type="submit"
              >
                Сохранить
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </template>
      <template v-else>
        <div class="user-info">
          <a-typography>Имя: {{ userData.username }}</a-typography>
          <a-typography>Email: {{ userData.email }}</a-typography>
          <a-typography>Номер телефона: {{ userData.phoneNumber }}</a-typography>
          <a-button type="primary" @click="handleActivateEditMode" class="btn edit-btn">
            Редактировать
          </a-button>
        </div>
      </template>
    </template>
  </AppLayout>
</template>

<style scoped>
.header {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px;

  & h3 {
    margin: 0;
  }
}

.user-info {
  display: flex;
  flex-direction: column;
  padding: 30px;
  gap: 30px;
}

.user-form {
  display: flex;
  padding: 30px;
}

.edit-btn {
  margin-top: 30px;
  max-width: 150px;
}

.cancel-btn {
  margin-right: 10px;
}

/* Выравнивание label по левому краю */
:deep(.ant-form-item-label) {
  text-align: left;
}
</style>
