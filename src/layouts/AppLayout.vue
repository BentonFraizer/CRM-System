<script setup lang="ts">
import { ref, reactive, h, computed } from 'vue'
import { FolderTwoTone, HomeTwoTone, IdcardTwoTone } from '@ant-design/icons-vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import { useUserStore } from '@/stores/user.ts'
import { hasUserRole } from '@/helpers/helpers.ts'
import { USER_ROLES } from '@/helpers/consts.ts'

const userStore = useUserStore()
const userData = userStore.getUserProfileData

let isUserAdmin = false
let isUserModerator = false
if (userData?.roles.length) {
  isUserAdmin = hasUserRole(userData?.roles, USER_ROLES.ADMIN)
  isUserModerator = hasUserRole(userData?.roles, USER_ROLES.MODERATOR)
}

const route = useRoute()
const currentPath = computed(() => route.path)

const selectedKeys = ref<string[]>([currentPath.value])

const items = reactive([
  {
    key: '/',
    icon: () => h(HomeTwoTone),
    label: 'Список задач',
    onClick: () => router.push('/'),
  },
  {
    key: '/profile',
    icon: () => h(FolderTwoTone),
    label: 'Профиль',
    onClick: () => router.push('/profile'),
  },
  (isUserAdmin || isUserModerator) && {
    key: '/users',
    icon: () => h(IdcardTwoTone),
    label: 'Пользователи',
    onClick: () => router.push('/users'),
  },
])
</script>

<template>
  <a-layout>
    <a-layout-sider class="fixed-sider" breakpoint="lg" collapsed-width="0">
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" :items="items">
      </a-menu>
    </a-layout-sider>
    <a-layout class="right-layout">
      <a-layout-content>
        <slot></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.fixed-sider {
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}

.right-layout {
  margin-left: 200px;
  overflow: auto;
  height: 100vh;
}
</style>
