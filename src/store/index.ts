import { createStore } from 'vuex';

import common from '@/store/modules/common';
import user from '@/store/modules/user';
import tags from '@/store/modules/tags';
import getters from './getters';

const state:RootState = {
};

const modules = {
  common,
  user,
  tags,
};
const store = createStore<RootState>({
  modules,
  state,
  getters,
});
export type AppStore = typeof store
export default store;
