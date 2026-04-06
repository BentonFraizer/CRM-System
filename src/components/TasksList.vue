<script setup lang="ts">
import TaskItem from '@/components/TaskItem.vue'
import type { Task } from '@/types/task.ts'

const { tasksData } = defineProps<{
  tasksData: Task[]
}>()
defineEmits<{
  taskUpdated: []
}>()
</script>

<template>
  <ul class="tasks-list">
    <TaskItem
      v-for="task in tasksData"
      :task="task"
      :key="task.id"
      @task-updated="$emit('taskUpdated')"
    />
  </ul>
</template>

<style scoped>
.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
