import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestView.vue')
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
