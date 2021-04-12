import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';
import constantsRouters from './constants';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  ...constantsRouters,
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home,
        meta: {
          title: '首页',
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
