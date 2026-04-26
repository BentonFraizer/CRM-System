import { createRouter, createWebHistory } from 'vue-router'

import TodoListView from '@/pages/TodoListView.vue'
import ProfileView from '@/pages/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: TodoListView },
    { path: '/profile', component: ProfileView },
  ],
})

export default router
