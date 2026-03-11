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
    <ul class="tabs">
      <li class="active" value="all">
        Все <span>{{ tasksInfo.info?.all }}</span>
      </li>
      <li value="inWork">
        В работе <span>{{ tasksInfo.info?.inWork }}</span>
      </li>
      <li value="completed">
        Сделано <span>{{ tasksInfo.info?.completed }}</span>
      </li>
    </ul>
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

ul {
  padding: 0;
}

li {
  list-style-type: none;
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
    font-size: 20px;
  }

  & button:hover {
    background-color: #4c86e8;
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

/* Компонент табов/вкладок */
.tabs {
  display: flex;
  gap: 10px;

  & li {
    background-color: lightgray;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
    opacity: 0.7;
  }

  & li span {
    font-weight: bold;
  }

  & li:hover {
    background-color: #b7b7b7;
  }

  & li.active {
    opacity: 1;
    background-color: #727272;
    color: white;
  }
}
</style>
