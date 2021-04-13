import { Router, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/token';
import settings from '@/utils/settings';
import store from '@/store';
import { decodeUrlC } from '@/utils/convert';

const loginPath = '/login';

function isLoginPath(path : string) {
  return path === loginPath;
}
function inWhiteList(path:string) {
  return settings.routerWhiteList.indexOf(path) > -1;
}

export default function usePermission(router : Router) {
  router.beforeEach((to, from, next) => {
    NProgress.start();
    if (isLoginPath(to.path)) {
      next();
    } else if (getToken()) {
      if (!store.getters.user) {
        store.dispatch('user/getUserInfo').then((user) => {
          const { roles } = user;
          store.dispatch('buildMenuTree', roles).then((menus) => {
            // eslint-disable-next-line no-unused-expressions
            Array.isArray(menus) ? menus.forEach((menu : RouteRecordRaw) => router.addRoute(menu)) : router.addRoute(menus);
            const redirect = decodeUrlC(<string>from.query.redirect || to.path);
            if (to.path === redirect) {
              next({ ...to, replace: true });
            } else {
              // 跳转到目的路由
              next({ path: redirect });
            }
          });
        });
      } else {
        next();
      }
    } else if (inWhiteList(to.path)) {
      next();
    } else {
      next({ path: loginPath, query: { redirect: to.fullPath } });
    }
  });

  router.afterEach((to, from) => {
    NProgress.done();
  });
}
