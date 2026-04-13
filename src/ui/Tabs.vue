<script setup lang="ts">
import { TABS } from '@/helpers/helpers.ts'
import type { TaskStatus } from '@/types/task.ts'
import type { TabsProps } from '@/types/tab.ts'

const { size = 'medium' } = defineProps<{
  tabs: TabsProps[]
  activeTab: TaskStatus
  size?: 'small' | 'medium' | 'large'
}>()

const emit = defineEmits<{
  onTabClick: [key: TaskStatus]
}>()

const handleTabClick = (tab: TabsProps) => {
  if (tab.disabled) return
  emit('onTabClick', tab.id)
}
</script>

<template>
  <ul class="tabs">
    <li
      v-for="value in tabs"
      :key="value.id"
      :value="value.id"
      :class="[
        size,
        {
          active: activeTab === TABS[value.id].status,
          disabled: value.disabled,
        },
      ]"
      @click="handleTabClick(value)"
    >
      {{ TABS[value.id].title }} <span>{{ value.label }}</span>
    </li>
  </ul>
</template>

<style scoped>
ul {
  padding: 0;
}

li {
  list-style-type: none;
}

.tabs {
  display: flex;
  gap: 10px;

  & li.small {
    padding: 4px 8px;
    font-size: 14px;
  }

  & li.medium {
    padding: 6px 12px;
    font-size: 14px;
  }

  & li.large {
    padding: 8px 16px;
    font-size: 16px;
  }

  & li {
    background-color: var(--bg-tab);
    cursor: pointer;
    padding: 4px 10px;
    border-radius: 5px;
    opacity: 0.7;
  }

  & li span {
    font-weight: bold;
  }

  & li:hover {
    background-color: var(--bg-tab-hover);
  }

  & li.active {
    opacity: 1;
    background-color: var(--bg-tab-active);
    color: var(--text-white);
  }

  & li.disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: default;
  }
}
</style>
