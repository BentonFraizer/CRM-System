<script setup lang="ts">
import { TABS } from '@/helpers/helpers.ts'
import type { TaskInfo, TaskStatus } from '@/types/task.ts'

const { tabsData, activeTab } = defineProps<{
  tabsData: TaskInfo
  activeTab: TaskStatus
}>()
</script>

<template>
  <ul class="tabs">
    <li
      v-for="(value, key) in tabsData"
      :key="TABS[key].status"
      :value="key"
      @click="$emit('tabClicked', key)"
      :class="{ active: activeTab === TABS[key].status }"
    >
      {{ TABS[key].title }} <span>{{ value }}</span>
    </li>
  </ul>
</template>

<style scoped>
/* Компонент табов/вкладок */
ul {
  padding: 0;
}

li {
  list-style-type: none;
}

.tabs {
  display: flex;
  gap: 10px;

  & li {
    background-color: var(--bg-tab);
    cursor: pointer;
    padding: 5px 10px;
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
}
</style>
