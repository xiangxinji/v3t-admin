import Layout from '@/layout/index.vue';

function loadView(c : string) {
  return () => new Promise((resolve) => {
    require([`@/views${c}.vue`], resolve);
  });
}

// 将后台传递的路由文件给转换成 router config 准备传递给 Vue Router
// eslint-disable-next-line no-underscore-dangle
function _convertRouterConfig(route : any) {
  if (typeof route.component === 'string') {
    if (route.component.toLowerCase() === 'layout') route.component = Layout;
    else {
      const c = route.component;
      route.component = loadView(c);
    }
  }
  if (route.children && Array.isArray(route.children)) route.children.forEach((r : any) => _convertRouterConfig(r));
}

export function convertRouterConfig(configs :any) {
  if (Array.isArray(configs)) {
    configs.forEach((conf) => _convertRouterConfig(conf));
  } else _convertRouterConfig(configs);
  if (Array.isArray(configs)) {
    return configs;
  } return [configs];
}

export function decodeUrlC(url : string) {
  return decodeURIComponent(url);
}
