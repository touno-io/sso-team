import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/:catchAll(.*)",
    redirect: '/'
  },
  {
    path: '/sign-in',
    name: 'signin',
    component: () => import('./pages/sign-in.vue')
  },
  {
    path: '/',
    name: '404',
    component: () => import('./pages/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
