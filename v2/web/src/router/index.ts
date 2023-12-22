import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue'),
  }, {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterPage.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
