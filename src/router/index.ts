import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';
import constantsRouters from './constants';
import Home from '../views/Home.vue';
import About from '../views/About/index.vue';

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
          title: '这是一个比较牛牛牛的首页',
        },
      },
      {
        path: '/about',
        component: About,
        meta: {
          title: '关于我们的网站',
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
