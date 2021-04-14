import Mock from 'mockjs';
import { builder } from '../utils';

const prefix = 'system';
const routerConfig:Array<any> = [
  {
    path: '/',
    component: 'Layout',
    hidden: false,
    meta: {
      title: '测试',
      icon: 'el-icon-house',
    },
    children: [
      {
        path: '/',
        component: '/Home',
        meta: {
          title: '首页',
          icon: 'el-icon-house',
        },
      },

    ],
  },
  {
    path: '/about',
    component: 'Layout',
    hidden: false,
    children: [
      {
        path: '/about',
        component: '/About/index',
        meta: {
          title: '关于', icon: 'el-icon-help',
        },
      },
    ],
  },
];

Mock.mock(`/${prefix}/build`, 'post', builder(routerConfig, '请求成功'));
