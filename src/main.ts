import { createApp } from 'vue';
import request from '@/utils/request';

import App from './App.vue';
import router from './router';
import store from './store';
import lazyUse from './components/lazy.use';
import './assets/styles/base.scss';

createApp(App).use(store).use(router).use(lazyUse)
  .mount('#app');

if (process.env.VUE_APP_RUN_MOCK === 'true') {
  require('../mock');
}
