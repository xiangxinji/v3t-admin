import request from '@/utils/request';
import { UserFormData, UserInfoData } from '@/types/user';

const API = {
  Login: '/user/login',
  UserInfo: '/user/info',
};

export const login = (data : UserFormData) => request<UserInfoData & { token : string }>({
  url: API.Login,
  method: 'POST',
  data,
});

export const userInfo = () => request<UserInfoData>({
  url: API.UserInfo,
});
