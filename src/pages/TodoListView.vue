<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getTasks } from '@/api/tasksApi.ts'
import { TASK_FILTERS } from '@/helpers/consts.ts'
import CreateTask from '@/components/CreateTask.vue'
import TasksTabs from '@/components/TasksTabs.vue'
import TasksList from '@/components/TasksList.vue'
import type { MetaResponse } from '@/types/api.ts'
import type { Task, TaskInfo, TaskStatus } from '@/types/task.ts'
import { loadTasks } from '@/helpers/helpers.ts'

const tasksInfo = ref<MetaResponse<Task, TaskInfo>>()
const isLoading = ref<boolean>(false)
const activeTab = ref<TaskStatus>(TASK_FILTERS.all.status)

const onTabClick = async (status: TaskStatus) => {
  activeTab.value = status
  tasksInfo.value = await loadTasks(
    activeTab.value,
    isLoading,
    'Не удалось загрузить список задач для вкладки',
  )
}

const onUpdateTasks = async () => {
  tasksInfo.value = await loadTasks(activeTab.value, isLoading, 'Не удалось обновить список задач')
}

onMounted(async () => {
  tasksInfo.value = await loadTasks(activeTab.value, isLoading, 'Не удалось загрузить список задач')
})
</script>

<template>
  <div class="container">
    <CreateTask @task-created="onUpdateTasks" />

    <TasksTabs
      v-if="tasksInfo"
      :tabs-data="tasksInfo.info"
      :active-tab="activeTab"
      @tab-clicked="onTabClick"
    />

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
  background-color: var(--bg-primary);
}
</style>
