<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { TASK_FILTERS } from '@/helpers/consts.ts'
import CreateTask from '@/components/CreateTask.vue'
import TasksTabs from '@/components/TasksTabs.vue'
import TasksList from '@/components/TasksList.vue'
import type { MetaResponse } from '@/types/api.ts'
import type { Task, TaskInfo, TaskStatus } from '@/types/task.ts'
import { loadTasks } from '@/helpers/helpers.ts'
import AppLayout from '@/layouts/AppLayout.vue'

const INTERVAL = 5000
const tasksInfo = ref<MetaResponse<Task, TaskInfo>>()
const activeTab = ref<TaskStatus>(TASK_FILTERS.all.status)
const intervalId = ref<ReturnType<typeof setInterval>>()

const onTabClick = async (status: TaskStatus) => {
  activeTab.value = status
  tasksInfo.value = await loadTasks(
    activeTab.value,
    'Не удалось загрузить список задач для вкладки',
  )
}

const loadTasksCallback = async () => {
  tasksInfo.value = await loadTasks(activeTab.value, 'Не удалось загрузить список задач')
}

const onChangeTaskEditMode = (isEditMode: boolean) => {
  isEditMode
    ? clearInterval(intervalId.value)
    : (intervalId.value = setInterval(async () => loadTasksCallback(), INTERVAL))
}

const onUpdateTasks = async () => {
  tasksInfo.value = await loadTasks(activeTab.value, 'Не удалось обновить список задач')
}

onMounted(async () => {
  await loadTasksCallback()
  intervalId.value = setInterval(async () => loadTasksCallback(), INTERVAL)
})

onUnmounted(() => clearInterval(intervalId.value))
</script>

<template>
  <AppLayout>
    <div class="container">
      <CreateTask @task-created="onUpdateTasks" />

      <TasksTabs
        v-if="tasksInfo"
        :tabs-data="tasksInfo.info"
        :active-tab="activeTab"
        @tab-clicked="onTabClick"
      />

      <TasksList
        v-if="tasksInfo?.data && tasksInfo?.data.length > 0"
        :tasks-data="tasksInfo?.data"
        @task-updated="onUpdateTasks"
        @task-in-edit-mode="onChangeTaskEditMode(true)"
        @task-exit-edit-mode="onChangeTaskEditMode(false)"
      />

      <div v-else>Список пуст</div>
    </div>
  </AppLayout>
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
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  padding: 30px;
  background-color: var(--bg-primary);
}
</style>
