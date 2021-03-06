import { GetterTree } from 'vuex';
import { BuildRouteConf } from '@/types/system';

const getters : GetterTree<any, RootState> = {
  user: (state) => state.user.user,
  roles: (state) => {
    if (state.user.user) return state.user.user.roles;
    return [];
  },
  tags: (state):Array<Tagger> => state.tags.tags,
  menus: (state):Array<BuildRouteConf> => state.common.asideMenus,
};

export default getters;
