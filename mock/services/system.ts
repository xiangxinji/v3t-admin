import Mock from 'mockjs';
import { builder } from '../utils';

const prefix = 'system';
const routerConfig:Array<any> = [
  {
    path: '/',
    component: 'Layout',
    children: [
      {
        path: '/',
        component: '/Home',
        meta: {
          title: '首页',
        },
      },
    ],
  },
  {
    path: '/about',
    component: 'Layout',
    children: [
      {
        path: '/about',
        component: '/About/index',
        meta: {
          title: '关于',
        },
      },
    ],
  },
];

Mock.mock(`/${prefix}/build`, 'post', builder(routerConfig, '请求成功'));
