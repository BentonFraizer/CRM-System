<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getTasks } from '@/api/tasksApi'
import { TABS } from '@/helpers/helpers'
import CreateTask from '@/components/CreateTask.vue'
import TasksTabs from '@/components/TasksTabs.vue'
import TasksList from '@/components/TasksList.vue'

const tasksInfo = ref({
  data: [],
  info: {},
  meta: {},
})

const isLoading = ref(false)
const activeTab = ref(TABS.all.status)

const onTabClick = async (key) => {
  activeTab.value = key
  isLoading.value = true
  tasksInfo.value = await getTasks(key)
  isLoading.value = false
}

const updateTasks = async () => {
  isLoading.value = true
  tasksInfo.value = await getTasks(activeTab.value)
  isLoading.value = false
}

onMounted(async () => {
  isLoading.value = true
  tasksInfo.value = await getTasks()
  isLoading.value = false
})
</script>

<template>
  <div class="container">
    <!--  На будущие задачи  -->
    <!--    <nav>-->
    <!--      <RouterLink to="/test">Go to test page</RouterLink>-->
    <!--    </nav>-->
    <CreateTask @update-tasks="updateTasks" />

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

/*
nav {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
 */
</style>
