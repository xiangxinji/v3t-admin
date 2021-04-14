import Layout from '@/layout/index.vue';
import { MenuTree, NormolizedMenuTree } from '@/types/system';

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

// 将路由表生成为 菜单
export function covertNormalizeMenuTree(menuTree : MenuTree): NormolizedMenuTree {
  const { path, children, meta } = menuTree;
  const result:NormolizedMenuTree = {
    target: path, icon: meta?.icon || '', hasChildren: children && children.length > 0, children: [], outLink: false, title: meta?.title || '未定义',
  };
  if (!children) return result;
  if (children.length === 1) {
    result.hasChildren = false;
    const child = children[0];
    result.target = child.path;
    result.children = [];
    result.icon = child?.meta?.icon || '';
    result.title = child?.meta?.title || '未定义';
  }
  if (result.hasChildren) {
    result.children = children.map((childSource) => covertNormalizeMenuTree(childSource));
  }
  return result;
}

export function decodeUrlC(url : string) {
  return decodeURIComponent(url);
}
