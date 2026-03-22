<script setup lang="ts">
import TaskItem from '@/components/TaskItem.vue'

const { tasksData } = defineProps(['tasksData'])
defineEmits(['taskUpdated'])
</script>

<template>
  <ul class="tasks-list">
    <TaskItem :tasks-data="tasksData" @task-updated="$emit('taskUpdated')" />
  </ul>
</template>

<style scoped>
.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
