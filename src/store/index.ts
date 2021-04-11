import { createStore } from 'vuex';

import common from '@/store/modules/common';

export default createStore({
  modules: {
    common,
  },
});
