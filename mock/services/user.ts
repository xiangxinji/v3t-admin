import Mock from 'mockjs';
import { builder, queryList } from '../utils';

const prefix = 'user';
const userInfo = {
  username: 'admin',
  password: '1234567',
  nickName: '管理员小P',
  createTime: '2021-1-21',
  roles: [
    'admin',
  ],
  token: '19c219al312309fv7j120-128',
  perms: [
    'admin', 'user-edit', 'user-remove',
  ],
};

const users = [
  {
    id: 0,
    username: 'admin',
    nickName: '管理员小P',
    createTime: '2021-1-21',
  },
  {
    id: 1,
    username: 'jack',
    nickName: '管理员Jack',
    createTime: '2021-1-21',
  },
  {
    id: 2,
    username: 'july',
    nickName: '管理员July',
    createTime: '2021-1-21',
  },
];

Mock.mock(`/${prefix}/login`, 'post', builder(userInfo, '登录成功'));
Mock.mock(`/${prefix}/info`, 'get', builder(userInfo, '获取成功'));
Mock.mock(new RegExp(`\\/${prefix}\\/query.*`), 'get', builder(queryList(users), '获取成功'));
