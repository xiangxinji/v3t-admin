import { UserFormData, UserInfoData } from '@/types/user';
import { ActionContext } from 'vuex';
import { login as logIn } from '@/api/user';

type StateType = {
  user ?: UserInfoData
}
const state :StateType = {
  user: undefined,
};

export default {
  state,
  mutations: {
    SET_USER_INFO(s : StateType, userInfo : UserInfoData) {
      s.user = userInfo;
    },
  },
  actions: {
    login(context : ActionContext<StateType, RootState>, formData : UserFormData) {
      return new Promise((resolve, reject) => {
        logIn(formData).then((response) => {
          context.commit('SET_USER_INFO', response.result);
          resolve(response.result);
        }).catch(reject);
      });
    },
  },
  namespaced: true,
};
