import { UserFormData, UserInfoData } from '@/types/user';
import { ActionContext, Module } from 'vuex';
import { login as logIn, userInfo } from '@/api/user';
import { build } from '@/api/system';
import { setToken } from '@/utils/token';

export type StateType = {
  user ?: UserInfoData
}
const state :StateType = {
  user: undefined,
};

const options : Module<StateType, RootState> = {
  state,
  mutations: {
    SET_USER_INFO(s : StateType, user : UserInfoData) {
      s.user = user;
    },
  },
  actions: {
    async login(context : ActionContext<StateType, RootState>, formData : UserFormData) {
      const response = await logIn(formData);
      setToken(response.result.token);
      return response.result;
    },
    async getUserInfo(context : ActionContext<StateType, RootState>) {
      const response = await userInfo();
      context.commit('SET_USER_INFO', response.result);
      return response.result;
    },
  },
  namespaced: true,
};

export default options;
