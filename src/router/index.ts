import { createRouter, createWebHistory } from 'vue-router'

import TodoListView from '@/pages/TodoListView.vue'
import ProfileView from '@/pages/ProfileView.vue'
import RegistrationView from '@/pages/RegistrationView.vue'
import AuthorizationView from '@/pages/AuthorizationView.vue'
import { useAuthStore } from '@/stores/auth.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: TodoListView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/profile',
      component: ProfileView,
      meta: {
        requiresAuth: true,
      },
    },
    { path: '/registration', component: RegistrationView },
    { path: '/login', component: AuthorizationView },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  const isAuthorized = authStore.getIsAuthorized

  if (to.meta.requiresAuth && !isAuthorized) {
    return '/login'
  }

  if ((to.path === '/login' || to.path === '/registration') && isAuthorized) {
    return '/'
  }
})

export default router
