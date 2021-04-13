import Mock from 'mockjs';
import { builder } from '../utils';

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
};
Mock.mock(`/${prefix}/login`, 'post', builder(userInfo, '登录成功'));
Mock.mock(`/${prefix}/info`, 'get', builder(userInfo, '获取成功'));
