import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/authStore'
import supaBase from '@/plugins/supaBase'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        isAuthRequired: false,
        layout: 'NavbarLayout'
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
        isAuthRequired: true,
        layout: 'NavbarLayout'
      }
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestView.vue'),
      meta: {
        isAuthRequired: true,
        layout: 'NavbarLayout'
      }
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        layout: 'LoginLayout'
      }
    },

    {
      name: 'categories',
      path: '/categories/:id(\\d+)',
      component: () => import('../views/CategoriesView.vue'),
      meta: {
        isAuthRequired: false,
        layout: 'NavbarLayout'
      }
    },
    {
      name: 'cart',
      path: '/cart',
      component: () => import('../views/CartView.vue'),
      meta: {
        isAuthRequired: true,
        layout: 'NavbarLayout'
      }
    }

  ]
})

// router.beforeEach((to, from, next) => {
//     const isAuth: boolean = JSON.parse(localStorage.getItem('isAuth') || 'false')
//     if (to.meta.isAuthRequired && !isAuth) {
//       next({ name: 'login', query: { auth: 'error' } })
//     }
//     next()
//   }
// )

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  // beni logine yönlendir
  // return !(to.meta.isAuthRequired && !await authStore.isAuthAsync())
  if (to.meta.isAuthRequired && !await authStore.isAuthAsync()) {
    return { name: 'login', query: { auth: 'error' } }
  }

})


export default router
