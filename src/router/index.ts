import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/:catchAll(.*)",
    redirect: '/'
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: () => import('../views/blogs.vue')
  },
  {
    path: '/sign-in',
    name: 'signin',
    component: () => import('../views/sign-in.vue')
  },
  {
    path: '/',
    name: '404',
    component: () => import('../views/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
