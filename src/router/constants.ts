export default [
  {
    path: '/login',
    component: () => import('@/views/User/login.vue'),
  },
  {
    path: '/exception/404',
    component: () => import('@/views/Exception/404.vue'),
  },
];

export const noFindRoute = { path: '/:pathMatch(.*)*', redirect: '/exception/404', hidden: true };
