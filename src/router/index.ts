import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/authStore'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        isAuthRequired: true
      }
    },
    {
      // id değeri sadece rakam olabilir.
      path: '/about/:id(\\d+)',
      // id değeri sadece string olabilir.
      // path: '/about/:id(\\D+)',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        isAuthRequired: true
      }
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestView.vue'),
      meta: {
        isAuthRequired: true
      }
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
    const isAuth: boolean = JSON.parse(localStorage.getItem('isAuth') || 'false')
    if (to.meta.isAuthRequired && !isAuth) {
      next({ name: 'login', query: { auth: 'error' } })
    }
    next()
  }
)


export default router
