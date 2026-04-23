<script setup lang="ts">
import { ref, reactive, h } from 'vue'
import { FolderTwoTone, HomeTwoTone } from '@ant-design/icons-vue'

const selectedKeys = ref<string[]>(['1'])

const items = reactive([
  {
    key: '1',
    icon: () => h(HomeTwoTone),
    label: 'Список задач',
    onClick: () => console.log('Список задач clicked'),
  },
  {
    key: '2',
    icon: () => h(FolderTwoTone),
    label: 'Профиль',
    onClick: () => console.log('Профиль clicked'),
  },
])
</script>

<template>
  <a-layout class="layout">
    <a-layout-sider breakpoint="lg" collapsed-width="0">
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" :items="items">
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content>
        <slot></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.layout {
  height: 100vh;
  background-color: red !important;
}
</style>
