import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import usePermission from './permission';
import constantsRouters from './constants';

const routes: Array<RouteRecordRaw> = [
  ...constantsRouters,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

usePermission(router);
export default router;
