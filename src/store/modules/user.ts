import { UserFormData, UserInfoData } from '@/types/user';
import { ActionContext, Module } from 'vuex';
import { login as logIn, userInfo } from '@/api/user';
import { setToken } from '@/utils/token';

export type StateType = {
  user ?: UserInfoData
  perms : Array<string>
}
const state :StateType = {
  user: undefined,
  perms: [],
};

const options : Module<StateType, RootState> = {
  state,
  mutations: {
    SET_USER_INFO(s : StateType, user : UserInfoData) {
      s.user = user;
    },
    SET_USER_PERMS(s : StateType, perms : Array<string>) {
      s.perms = perms;
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
      context.commit('SET_USER_PERMS', response.result.perms);
      return response.result;
    },
  },
  namespaced: true,
};

export default options;
