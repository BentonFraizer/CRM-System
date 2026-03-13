<script setup lang="ts">
import TaskItem from '@/components/TaskItem.vue'

const { tasksData } = defineProps(['tasksData'])
defineEmits(['updateTasks'])
</script>

<template>
  <ul class="tasks-list">
    <TaskItem :tasks-data="tasksData" @update-tasks="$emit('updateTasks')" />
  </ul>
</template>

<style scoped>
.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
