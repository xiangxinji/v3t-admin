import request from '@/utils/request';
import { UserFormData, UserInfoData } from '@/types/user';

const API = {
  Login: '/user/login',
  UserInfo: '/user/info',
  UsersQuery: '/user/query',
};

export const login = (data : UserFormData) => request<UserInfoData & { token : string }>({
  url: API.Login,
  method: 'POST',
  data,
});

export const userInfo = () => request<UserInfoData>({
  url: API.UserInfo,
});

export const query = <T>(q: object, pager : Pagination) => request<PageResult<T>>({
  url: API.UsersQuery,
  params: {
    ...q,
    ...pager,
  },
});
