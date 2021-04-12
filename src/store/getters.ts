import { GetterTree } from 'vuex';

const getters : GetterTree<any, RootState> = {
  user: (state) => state.user.user,
};

export default getters;
