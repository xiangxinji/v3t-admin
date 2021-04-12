import { GetterTree } from 'vuex';

const getters : GetterTree<any, RootState> = {
  user: (state) => state.user.user,
  roles: (state) => {
    if (state.user.user) return state.user.user.roles;
    return [];
  },
  tags: (state):Array<Tagger> => state.tags.tags,
};

export default getters;
