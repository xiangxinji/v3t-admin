import { createStore } from 'vuex';

import common from '@/store/modules/common';
import user from '@/store/modules/user';

const state:RootState = {
};

const modules = {
  common,
  user,
};
export type ModulesType = typeof modules
export default createStore<RootState>({
  modules,
  state,
});
