<script setup lang="ts">
import type { TaskInfo, TaskStatus } from '@/types/task.ts'
import type { TabsProps } from '@/types/tab.ts'
import { computed } from 'vue'
import { TASK_FILTERS } from '@/helpers/consts.ts'

const { tabsData, activeTab } = defineProps<{
  tabsData: TaskInfo
  activeTab: TaskStatus
}>()

const emit = defineEmits<{
  tabClicked: [key: TaskStatus]
}>()

const transformTaskInfoToTabs = (tabsData: TaskInfo): TabsProps[] => {
  return Object.entries(tabsData).map(([key, value]) => ({
    id: key as TaskStatus,
    label: String(value),
  }))
}

const tabsItems = computed(() => {
  if (!tabsData) return []
  return transformTaskInfoToTabs(tabsData)
})

const onTabClicked = (status: TaskStatus) => {
  emit('tabClicked', status)
}
</script>

<template>
  <a-tabs :activeKey="activeTab" centered @change="onTabClicked" type="card" class="tabs">
    <a-tab-pane
      v-for="tab in tabsItems"
      :key="tab.id"
      :tab="TASK_FILTERS[tab.id].title + ' ' + tab.label"
    />
  </a-tabs>
</template>

<style scoped>
.tabs {
  width: 100%;
}
</style>