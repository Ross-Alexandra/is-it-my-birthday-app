import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import { AuthApi } from '@/api/auth';

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
    path: '/verify',
    name: 'Verify',
    component: () => import('@/views/verify-page.vue'),
  }, {
    path: '/logout',
    name: 'Logout',
    component: () => ({/* Not a real route! */}),
    beforeEnter: async () => {
        try {
            await AuthApi.logout();
        } finally {
            window.location.href = '/home';
        }
    }
  }, {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/register-page.vue'),
  }, {
    path: '/legal',
    name: 'Legal',
    component: () => import('@/views/legal-page.vue'),
  },{
    path: '/:pathMatch(.*)*',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
