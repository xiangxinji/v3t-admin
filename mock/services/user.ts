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
};
Mock.mock(`/${prefix}/info`, 'get', builder(userInfo, '请求成功'));
Mock.mock(`/${prefix}/login`, 'post', builder(userInfo, '登录成功'));
