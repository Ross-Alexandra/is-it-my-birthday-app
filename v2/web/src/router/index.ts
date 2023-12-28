import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home-page.vue'),
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login-page.vue'),
  }, {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register-page.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
