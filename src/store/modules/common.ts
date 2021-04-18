import { ActionContext, Module } from 'vuex';
import { build } from '@/api/system';
import { convertRouterConfig } from '@/utils/convert';
import { noFindRoute } from '@/router/constants';
import { BuildRouteConf } from '@/types/system';
import { excludeOutLinkRouter } from '@/utils/filters';

export type StateType = {
  asideFold : boolean
  asideMenus: Array<BuildRouteConf>
}

const state :StateType = {
  asideFold: true,
  asideMenus: [],
};

const options: Module<StateType, RootState> = {
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
      const r = excludeOutLinkRouter(convertRouterConfig(response.result));
      context.commit('SET_ASIDE_MENUS', response.result);
      r.push(noFindRoute);
      return r;
    },
  },
};
export default options;
