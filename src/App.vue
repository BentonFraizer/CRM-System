<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { validateTaskTitle, TABS } from '@/helpers/helpers'

const tasksInfo = ref({
  data: [],
  info: {},
  meta: {},
})
const isLoading = ref(false)

const newTaskTitle = ref('')
const errorMessage = ref('')

const editableTaskId = ref(null)
const editableTaskTitle = ref(null)
const editableTaskErrorMessage = ref(null)

const activeTab = ref(TABS.all.status)

const getTasks = async (status = TABS.all.status) => {
  isLoading.value = true
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos?filter=${status}`)
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
  errorMessage.value = validateTaskTitle(newTaskTitle.value)
  const isTitleValid = !errorMessage.value.length

  if (isTitleValid) {
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
        await getTasks(activeTab.value)
      }
    } catch (error) {
      console.error(error)
    } finally {
      newTaskTitle.value = ''
    }
  }
}

const saveEditTask = async (taskData) => {
  // Выход из режима редактирования если в заголовок задачи не было внесено изменений
  if (editableTaskTitle.value === taskData.title) {
    editableTaskId.value = null
    editableTaskTitle.value = null
    return
  }

  editableTaskErrorMessage.value = validateTaskTitle(editableTaskTitle.value)
  const isTitleValid = !editableTaskErrorMessage.value?.length

  if (isTitleValid) {
    const taskDataToSend = {
      isDone: taskData.isDone,
      title: editableTaskTitle.value,
    }
    try {
      isLoading.value = true
      const response = await fetch(`https://easydev.club/api/v1/todos/${taskData.id}`, {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(taskDataToSend),
      })
      if (response.ok) {
        await getTasks(activeTab.value)
      }
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
      editableTaskId.value = null
      editableTaskTitle.value = null
    }
  }
}

const deleteTask = async (taskId) => {
  try {
    isLoading.value = true
    const response = await fetch(`https://easydev.club/api/v1/todos/${taskId}`, {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
      },
    })
    if (response.ok) {
      await getTasks(activeTab.value)
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const toggleIsDoneTask = async (taskData) => {
  const taskDataToSend = {
    isDone: !taskData.isDone,
    title: taskData.title,
  }
  try {
    isLoading.value = true
    const response = await fetch(`https://easydev.club/api/v1/todos/${taskData.id}`, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(taskDataToSend),
    })
    if (response.ok) {
      await getTasks(activeTab.value)
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

// TODO: при разделении на компоненты скорее всего обработчик необходимо будет переименовать в onEditButtonClick (если он будет передаваться в компонент задачи)
const handleEditButtonClick = (taskData) => {
  editableTaskId.value = taskData.id
  editableTaskTitle.value = taskData.title
}

const handleCancelEditButtonClick = () => {
  editableTaskId.value = null
  editableTaskTitle.value = null
  editableTaskErrorMessage.value = null
}

const handleTabClick = (key) => {
  activeTab.value = key
  getTasks(key)
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
      <button @click="addTask">Создать</button>
    </div>
    <ul class="tabs">
      <li
        v-for="(value, key) in tasksInfo.info"
        :key="TABS[key].status"
        :value="key"
        @click="handleTabClick(key)"
        :class="{ active: activeTab === TABS[key].status }"
      >
        {{ TABS[key].title }} <span>{{ value }}</span>
      </li>
    </ul>
    <div v-if="isLoading">Loading...</div>
    <ul v-else-if="tasksInfo.data.length > 0" class="tasks-list">
      <li v-for="task in tasksInfo.data" :key="task.id" class="task">
        <template v-if="editableTaskId === task.id">
          <div class="tasks-list__edit-left">
            <input type="text" v-model="editableTaskTitle" />
            <span class="error-message">{{ editableTaskErrorMessage }}</span>
          </div>
          <div class="tasks-list__right">
            <button class="icon icon--check" type="button" @click="saveEditTask(task)" />
            <button class="icon icon--close" type="button" @click="handleCancelEditButtonClick" />
          </div>
        </template>

        <template v-else>
          <div class="tasks-list__left">
            <input type="checkbox" @change="toggleIsDoneTask(task)" />
            <span :class="{ 'is-done': task.isDone }">{{ task.title }}</span>
          </div>
          <div class="tasks-list__right">
            <button class="icon icon--edit" type="button" @click="handleEditButtonClick(task)" />
            <button class="icon icon--trash" type="button" @click="deleteTask(task.id)" />
          </div>
        </template>
      </li>
    </ul>
    <div v-else>Список пуст</div>
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
  width: 450px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #5393ff;
  border-radius: 30px;
  padding: 30px;
  background-color: #efefef;
}

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

/* Список задач */
.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.task {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 450px;
  height: 40px;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
}

.tasks-list__edit-left {
  display: flex;
  flex-direction: column;

  & input {
    width: 270px;
  }
}

.tasks-list__right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.tasks-list__left {
  display: flex;

  input {
    margin-right: 10px;
  }

  & .is-done {
    text-decoration: line-through;
    color: gray;
  }
}

.icon {
  display: block;

  margin: 0;
  padding: 0;
  width: 20px;
  height: 20px;

  cursor: pointer;

  border: none;
  background-color: transparent;
  background-size: cover;
}

.icon--edit {
  background-image: url('@/assets/img/icon-pencil.svg');
}

.icon--trash {
  width: 16px;
  background-image: url('@/assets/img/icon-trash.svg');
}

.icon--check {
  background-image: url('@/assets/img/icon-check.svg');
}

.icon--close {
  height: 24px;
  width: 24px;
  background-image: url('@/assets/img/icon-close.svg');
}
</style>
