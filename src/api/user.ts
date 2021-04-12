import request from '@/utils/request';
import { UserFormData, UserInfoData } from '@/types/user';

const API = {
  Login: '/user/login',
};

export const login = (data : UserFormData) => request<UserInfoData>({
  url: API.Login,
  method: 'POST',
  data,
});
