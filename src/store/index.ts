import { createStore } from 'vuex';

import common from '@/store/modules/common';
import user from '@/store/modules/user';
import getters from './getters';

const state:RootState = {
};

const modules = {
  common,
  user,
};
const store = createStore<RootState>({
  modules,
  state,
  getters,
});
export type AppStore = typeof store
export default store;
