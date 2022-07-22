import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/:catchAll(.*)",
    redirect: '/sign-in'
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/index.vue')
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('../views/sign-in.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
