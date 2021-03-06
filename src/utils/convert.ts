/* eslint-disable no-continue */
import Layout from '@/layout/index.vue';
import { BuildRouteConf, NormolizedMenuTree } from '@/types/system';

function loadView(c : string, componentName ?: string) {
  return () => new Promise((resolve) => {
    require([`@/views${c}.vue`], (component) => {
      if (componentName) {
        component.default.name = componentName;
      }
      resolve(component);
    });
  });
}

// 将后台传递的路由文件给转换成 router config 准备传递给 Vue Router
// eslint-disable-next-line no-underscore-dangle
function _convertRouterConfig(route : BuildRouteConf) {
  // 过滤外部链接
  if (typeof route.component === 'string') {
    if (route.component.toLowerCase() === 'layout') route.component = Layout;
    else {
      const c = route.component;
      route.component = loadView(c, route?.name);
    }
  }
  if (route.children && Array.isArray(route.children)) route.children.forEach((r : any) => _convertRouterConfig(r));
}

export function convertRouterConfig(configs :BuildRouteConf | Array<BuildRouteConf>):Array<BuildRouteConf> {
  if (Array.isArray(configs)) {
    configs.forEach((conf) => _convertRouterConfig(conf));
  } else _convertRouterConfig(configs);
  if (Array.isArray(configs)) {
    return configs;
  } return [configs];
}

// 将路由表生成为 菜单
export function covertNormalizeMenuTree(menuTree : BuildRouteConf): NormolizedMenuTree {
  const { path, children, meta } = menuTree;
  const result:NormolizedMenuTree = {
    target: path, icon: meta?.icon || '', hasChildren: (children && children.length > 0) || false, children: [], outLink: meta?.outLink || false, title: meta?.title || '未定义',
  };
  if (!children || result.outLink) return result;
  if (children.length === 1) {
    result.hasChildren = false;
    const child = children[0];
    result.target = child.path;
    result.children = [];
    result.icon = child?.meta?.icon || result.icon;
    result.title = child?.meta?.title || result.title;
    result.outLink = child?.meta?.outLink || result.outLink;
  }
  if (result.hasChildren) {
    result.children = children.map((childSource) => covertNormalizeMenuTree(childSource));
  }
  return result;
}

export function decodeUrlC(url : string) {
  return decodeURIComponent(url);
}

export function toCamelCase(name : string) : string {
  let isBreakLine = false;
  let result = '';
  for (let i = 0; i < name.length; i++) {
    if (isBreakLine) {
      isBreakLine = false;
      result += name.charAt(i).toUpperCase();
      continue;
    }
    if (name.charAt(i) === '-') {
      isBreakLine = true;
      continue;
    }
    result += name.charAt(i);
  }
  return result;
}
