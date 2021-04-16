import { convertRouterConfig, covertNormalizeMenuTree } from '@/utils/convert';
import { BuildRouteConf } from '@/types/system';

function createRouterConfig() : BuildRouteConf {
  return {
    path: '/system',
    component: 'layout',
    meta: {
      title: '系统管理',
    },
    children: [
      {
        path: '/system/config',
        component: '/system/config',
        meta: {
          title: '系统配置',
        },
      },
      {
        path: '/system/config',
        component: '/system/config',
        meta: {
          title: '系统配置',
        },
      },
    ],
  };
}
function createRouterConfigCaseOneChildren() : BuildRouteConf {
  const r = createRouterConfig();
  if (r.children) r.children.pop();
  return r;
}

describe('基本转换工具类', () => {
  it('测试 convertRouterConfig 转换路由表', () => {
    const buildRouterConfigs = convertRouterConfig(createRouterConfig());
    expect(Array.isArray(buildRouterConfigs)).toBeTruthy();
    expect(typeof buildRouterConfigs[0].component).toEqual('object');
    expect(buildRouterConfigs.length).toEqual(1);
    if (buildRouterConfigs[0].children) expect(typeof buildRouterConfigs[0].children[0].component).toEqual('function');
  });
  it(' 测试 covertNormalizeMenuTree 多个子节点不进行合并', () => {
    const buildRouterConfigs = createRouterConfig();
    const menu = covertNormalizeMenuTree(buildRouterConfigs);
    expect(menu.hasChildren).toBeTruthy();
    expect(menu.icon).toEqual('');
    expect(menu.children.length).toEqual(2);
    expect(menu.target).toEqual('/system');
  });
  it(' 测试 covertNormalizeMenuTree 将路由转换成菜单(单个子节点做合并)', () => {
    const buildRouterConfigs = [createRouterConfigCaseOneChildren()];
    const menu = covertNormalizeMenuTree(buildRouterConfigs[0]);
    expect(menu.hasChildren).toBeFalsy();
    expect(menu.icon).toEqual('');
    expect(menu.children.length).toEqual(0);
    expect(menu.outLink).toBeFalsy();
    expect(menu.target).toEqual('/system/config');
  });
});
