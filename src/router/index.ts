import { createRouter, createWebHistory } from 'vue-router'

import TodoListView from '@/pages/TodoListView.vue'
import ProfileView from '@/pages/ProfileView.vue'
import RegistrationVue from '@/pages/RegistrationVue.vue'
import AuthorizationVue from '@/pages/AuthorizationVue.vue'
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
    { path: '/registration', component: RegistrationVue },
    { path: '/login', component: AuthorizationVue },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  const isAuth = authStore.getAccessToken

  if (to.meta.requiresAuth && !isAuth) {
    return '/login'
  }

  if (to.path === '/login' && isAuth) {
    return '/'
  }
})

export default router
