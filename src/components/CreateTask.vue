<script setup lang="ts">
import { ref } from 'vue'
import { createTask } from '@/api/tasksApi.js'
import { validateTaskTitle } from '@/helpers/helpers.js'

const emit = defineEmits(['taskCreated'])

const newTaskTitle = ref('')
const errorMessage = ref('')

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
  <div class="add-task">
    <div class="input-wrapper">
      <input type="text" placeholder="Task To Be Done" v-model.trim="newTaskTitle" />
      <span class="error-message">{{ errorMessage }}</span>
    </div>
    <button @click="handleAddTask">Создать</button>
  </div>
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
    border-bottom: 2px solid gray;
  }

  & button {
    cursor: pointer;
    background-color: #5393ff;
    border: none;
    border-radius: 10px;
    color: white;
    padding: 5px 30px;
    font-size: 20px;
  }

  & button:hover {
    background-color: #4c86e8;
  }
}

.input-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.error-message {
  color: red;
  font-size: 14px;
  height: 16px;
}
</style>
