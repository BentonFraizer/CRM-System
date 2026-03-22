<script setup lang="ts">
import { TABS } from '@/helpers/helpers'

const { tabsData, activeTab } = defineProps(['tabsData', 'activeTab'])
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
    background-color: var(--primary-tab-bg-color);
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
    opacity: 0.7;
  }

  & li span {
    font-weight: bold;
  }

  & li:hover {
    background-color: var(--on-primary-tab-bg-color);
  }

  & li.active {
    opacity: 1;
    background-color: var(--active-tab-bg-color);
    color: var(--primary-color);
  }
}
</style>
