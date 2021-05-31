import Mock from 'mockjs';
import { builder } from '../utils';

const prefix = 'menu';

const menus:any[] = [];

Mock.mock(`/${prefix}/query`, 'get', builder(menus, '获取成功'));
