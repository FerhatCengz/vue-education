import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Admin'
      },
      beforeEnter: (to, from, next) => {
        if (to.query.name === 'admin') {
          next()
        }
      }
    },
    {
      path: '/about/:id',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})


// router.afterEach((to, from) => {
//   console.log('afterEach')
// })
//
// router.beforeEach((to, from, next) => {
//   console.log('beforeEach')
//   next()
// })


export default router
