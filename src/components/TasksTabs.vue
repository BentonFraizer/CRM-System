<script setup lang="ts">
import type { TaskInfo, TaskStatus } from '@/types/task.ts'
import Tabs from '@/ui/Tabs.vue'
import type { TabsProps } from '@/types/tab.ts'
import { computed } from 'vue'

const { tabsData, activeTab } = defineProps<{
  tabsData: TaskInfo
  activeTab: TaskStatus
}>()

const emit = defineEmits<{
  tabClicked: [key: TaskStatus]
}>()

const getTabItemsCorrectFormat = (tabsData: TaskInfo): TabsProps[] => {
  return Object.entries(tabsData).map(([key, value]) => ({
    id: key as TaskStatus,
    label: String(value),
  }))
}

const tabsItems = computed(() => {
  if (!tabsData) return []
  return getTabItemsCorrectFormat(tabsData)
})

const onTabClicked = (status: TaskStatus) => {
  emit('tabClicked', status)
}
</script>

<template>
  <Tabs :tabs="tabsItems" :active-tab="activeTab" @on-tab-click="onTabClicked" />
</template>

<style scoped></style>
