<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { TABS } from '@/helpers/helpers'
import AddTask from '@/components/AddTask.vue'
import TasksTabs from '@/components/TasksTabs.vue'
import TasksList from '@/components/TasksList.vue'

const tasksInfo = ref({
  data: [],
  info: {},
  meta: {},
})

const isLoading = ref(false)
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

const onTabClick = (key) => {
  activeTab.value = key
  getTasks(key)
}

const updateTasks = () => {
  getTasks(activeTab.value)
}

onMounted(() => {
  getTasks()
})
</script>

<template>
  <div class="container">
    <AddTask @update-tasks="updateTasks" />

    <TasksTabs @on-tab-click="onTabClick" :tabs-data="tasksInfo.info" :active-tab="activeTab" />

    <div v-if="isLoading">Loading...</div>

    <TasksList
      v-else-if="tasksInfo.data.length > 0"
      :tasks-data="tasksInfo.data"
      @update-tasks="updateTasks"
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
  border: 2px solid #5393ff;
  border-radius: 30px;
  padding: 30px;
  background-color: #efefef;
}
</style>
