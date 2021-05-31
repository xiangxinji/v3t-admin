import Mock from 'mockjs';
import { builder } from '../utils';

const prefix = 'role';

const roles:any[] = [];

Mock.mock(`/${prefix}/query`, 'get', builder(roles, '获取成功'));
