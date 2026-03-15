import { createRouter, createWebHistory } from 'vue-router'

import TodoListView from '@/pages/TodoListView.vue'
import TestRouterView from '@/pages/TestRouterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: TodoListView },
    { path: '/test', component: TestRouterView },
  ],
})

export default router
