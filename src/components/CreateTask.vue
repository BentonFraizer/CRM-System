<script setup lang="ts">
import { ref } from 'vue'
import { createTask } from '@/api/tasksApi.ts'
import { validateTaskTitle } from '@/helpers/helpers.ts'

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
    <div class="input-wrapper">
      <input type="text" placeholder="Task To Be Done" v-model.trim="newTaskTitle" />
      <span class="error-message">{{ errorMessage }}</span>
    </div>
    <button type="submit">Создать</button>
  </form>
</template>

<style scoped>
/* Добавление задачи */
.add-task {
  width: 100%;
  display: flex;
  gap: 10px;

  & input {
    padding: 10px 5px;
    border: 0;
    border-bottom: 2px solid var(--bg-border);
  }

  & button {
    cursor: pointer;
    background-color: var(--primary);
    border: none;
    border-radius: 10px;
    color: var(--text-white);
    padding: 5px 30px;
    font-size: 20px;
  }

  & button:hover {
    background-color: var(--primary-hover);
  }
}

.input-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.error-message {
  color: var(--danger);
  font-size: 14px;
  height: 16px;
}
</style>
