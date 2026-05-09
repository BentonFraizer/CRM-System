import { createRouter, createWebHistory } from 'vue-router'

import TodoListView from '@/pages/TodoListView.vue'
import ProfileView from '@/pages/ProfileView.vue'
import RegistrationVue from '@/pages/RegistrationVue.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: TodoListView },
    { path: '/profile', component: ProfileView },
    { path: '/registration', component: RegistrationVue },
  ],
})

export default router
