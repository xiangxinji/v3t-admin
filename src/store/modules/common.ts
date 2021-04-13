import { ActionContext } from 'vuex';
import { build } from '@/api/system';
import { convertRouterConfig } from '@/utils/convert';
import { noFindRoute } from '@/router/constants';

export type StateType = {
  asideFold : boolean
  asideMenus: any
}

const state :StateType = {
  asideFold: true,
  asideMenus: null,
};

export default {
  state,
  mutations: {
    CHANGE_ASIDE_FOLDER(s:StateType, value : boolean) :void {
      s.asideFold = value;
    },
    SET_ASIDE_MENUS(s : StateType, menus : any) :void {
      s.asideMenus = menus;
    },
  },
  actions: {
    async buildMenuTree(context :ActionContext<StateType, RootState>, roles : Array<string>) {
      const response = await build(roles);
      const r = convertRouterConfig(response.result);
      context.commit('SET_ASIDE_MENUS', response.result);
      r.push(noFindRoute);
      return r;
    },
  },
};
