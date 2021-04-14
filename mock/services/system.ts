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
        name: 'Home',
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
        name: 'About',
        meta: {
          title: '关于', icon: 'el-icon-help', keepAlive: true, close: false,
        },
      },
    ],
  },
  {
    path: '/user',
    component: 'Layout',
    hidden: false,
    children: [
      {
        path: '/user/manager',
        component: '/User/usersManager',
        name: 'UserManager',
        meta: {
          title: '用户管理', icon: 'el-icon-help', keepAlive: true, close: true,
        },
      },
    ],
  },
];

Mock.mock(`/${prefix}/build`, 'post', builder(routerConfig, '请求成功'));
