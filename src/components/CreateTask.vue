<script setup lang="ts">
import { createTask } from '@/api/tasksApi.ts'
import { reactive, ref } from 'vue'
import type { UnwrapRef } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import { createEditTaskRules } from '@/helpers/consts.ts'
import { openNotificationWithIcon } from '@/helpers/helpers.ts'

const emit = defineEmits<{
  taskCreated: []
}>()

interface FormState {
  title: string
}

const formRef = ref<FormInstance>()
const formState: UnwrapRef<FormState> = reactive({
  title: '',
})

const handleSubmit = () => {
  formRef.value
    ?.validate()
    .then(async () => {
      const newTaskData = {
        isDone: false,
        title: formState.title.trim(),
      }

      await createTask(newTaskData)

      emit('taskCreated')
      resetForm()
      openNotificationWithIcon('success', 'Задача успешно создана')
    })
    .catch((error) => {
      console.log('error: ', error)
      openNotificationWithIcon('error', 'Не удалось создать задачу')
    })
}

const resetForm = () => {
  formRef.value && formRef.value.resetFields()
}
</script>

<template>
  <a-form
    ref="formRef"
    :model="formState"
    layout="inline"
    :rules="createEditTaskRules"
    class="add-task"
  >
    <a-form-item name="title">
      <a-input v-model:value="formState.title" placeholder="Task To Be Done" />
    </a-form-item>

    <a-button html-type="submit" type="primary" size="large" @click="handleSubmit">
      Создать
    </a-button>
  </a-form>
</template>

<style scoped>
.add-task {
  width: 100%;
  display: flex;
  margin-bottom: 20px;

  & input {
    width: 275px;
  }
}
</style>
