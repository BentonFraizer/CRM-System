<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getTasks } from '@/api/tasksApi.ts'
import { TABS } from '@/helpers/helpers.ts'
import CreateTask from '@/components/CreateTask.vue'
import TasksTabs from '@/components/TasksTabs.vue'
import TasksList from '@/components/TasksList.vue'
import type { MetaResponse } from '@/types/api.ts'
import type { Task, TaskInfo } from '@/types/task.ts'

const tasksInfo = ref<MetaResponse<Task, TaskInfo>>()

const isLoading = ref(false)
const activeTab = ref(TABS.all.status)

const onTabClick = async (status) => {
  activeTab.value = status
  try {
    isLoading.value = true
    tasksInfo.value = await getTasks(status)
  } catch (error) {
    console.error(error)
    alert('Не удалось загрузить список задач для вкладки')
  } finally {
    isLoading.value = false
  }
}

const onUpdateTasks = async () => {
  try {
    isLoading.value = true
    tasksInfo.value = await getTasks(activeTab.value)
  } catch (error) {
    console.error(error)
    alert('Не удалось обновить список задач')
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  try {
    isLoading.value = true
    tasksInfo.value = await getTasks()
  } catch (error) {
    console.error(error)
    alert('Не удалось загрузить список задач')
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="container">
    <CreateTask @task-created="onUpdateTasks" />

    <TasksTabs @tab-clicked="onTabClick" :tabs-data="tasksInfo?.info" :active-tab="activeTab" />

    <div v-if="isLoading">Loading...</div>

    <TasksList
      v-else-if="tasksInfo?.data && tasksInfo?.data.length > 0"
      :tasks-data="tasksInfo?.data"
      @task-updated="onUpdateTasks"
    />

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
  border-radius: 30px;
  padding: 30px;
  background-color: var(--secondary-bg-color);
}
</style>
