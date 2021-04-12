import Mock from 'mockjs';
import { builder } from '../utils';

const prefix = 'config';
const routerConfig:Array<any> = [
  {
    path: '/',
    component: 'layout',
    children: [
      {
        path: '/',
        component: '@/views/Home.vue',
        meta: {
          title: '首页',
        },
      },
    ],
  },
  {
    path: '/about',
    component: 'layout',
    children: [
      {
        path: '/',
        component: '@/views/About/index.vue',
        meta: {
          title: '关于我们',
        },
      },
    ],
  },
];

Mock.mock(`/${prefix}/build`, 'get', builder(routerConfig, '请求成功'));
