<script setup lang="ts">
import { ref } from 'vue'
import { createTask } from '@/api/tasksApi.ts'
import { validateTaskTitle } from '@/helpers/helpers.ts'
import Button from '@/ui/Button.vue'
import Input from '@/ui/Input.vue'

const emit = defineEmits<{
  taskCreated: []
}>()

const newTaskTitle = ref<string>('')
const errorMessage = ref<string>('')

const handleAddTask = async () => {
  errorMessage.value = validateTaskTitle(newTaskTitle.value)
  const isTitleValid = !errorMessage.value.length
  if (isTitleValid) {
    try {
      const newTaskData = {
        isDone: false,
        title: newTaskTitle.value,
      }

      await createTask(newTaskData)

      newTaskTitle.value = ''
      emit('taskCreated')
    } catch (error) {
      console.error(error)
      alert('Не удалось создать задачу')
    }
  }
}
</script>

<template>
  <form @submit.prevent="handleAddTask" class="add-task">
    <Input
      type="text"
      placeholder="Task To Be Done"
      v-model:value.trim="newTaskTitle"
      :error-message="errorMessage"
      size="large"
      style-name="border: 0; border-bottom: 1px solid var(--border-btn-default)"
    />
    <Button html-type="submit" type="primary" size="large">Создать</Button>
  </form>
</template>

<style scoped>
.add-task {
  width: 100%;
  display: flex;
  gap: 10px;
}
</style>
