<script setup lang="ts">
import { onMounted, ref } from 'vue'

const MIN_TITLE_LENGTH = 2
const MAX_TITLE_LENGTH = 64

const tasksInfo = ref({
  data: [],
  info: {},
  meta: {},
})
const isLoading = ref(false)

const newTaskTitle = ref('')
const errorMessage = ref('')

const getTasks = async () => {
  isLoading.value = true
  try {
    const response = await fetch('https://easydev.club/api/v1/todos')
    if (response.ok) {
      tasksInfo.value = await response.json()
      tasksInfo.value = { ...tasksInfo.value, data: tasksInfo.value.data.reverse() }
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const addTask = async () => {
  if (newTaskTitle.value.length < MIN_TITLE_LENGTH) {
    errorMessage.value = 'Минимум 2 символа'
  } else if (newTaskTitle.value.length > MAX_TITLE_LENGTH) {
    errorMessage.value = 'Максимум 64 символа'
  } else {
    errorMessage.value = ''
    const newTaskData = {
      isDone: false,
      title: newTaskTitle.value,
    }
    try {
      const response = await fetch('https://easydev.club/api/v1/todos', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(newTaskData),
      })
      if (response.ok) {
        await getTasks()
      }
    } catch (error) {
      console.error(error)
    } finally {
      newTaskTitle.value = ''
    }
  }
}

onMounted(() => {
  getTasks()
})
</script>

<template>
  <div class="container">
    <div class="add-task">
      <div class="input-wrapper">
        <input type="text" placeholder="Task To Be Done" v-model.trim="newTaskTitle" />
        <span class="error-message">{{ errorMessage }}</span>
      </div>
      <button @click="addTask">Add</button>
    </div>
    <div class="tabs"></div>
    <div v-if="isLoading">Loading...</div>
    <ul v-else class="tasks-list">
      <li v-for="task in tasksInfo.data" :key="task.id">{{ task.title }}</li>
    </ul>
  </div>
</template>

<style scoped>
body {
  padding: 0;
}

.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Добавление задачи */
.add-task {
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
    border-radius: 5px;
    color: white;
    padding: 5px 30px;
  }
}

.input-wrapper {
  width: 250px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  & .error-message {
    color: red;
    font-size: 12px;
    height: 14px;
  }
}

/* Компонент задачи */
.tasks-list {
  padding: 0;

  & li {
    list-style-type: none;
  }
}
</style>
