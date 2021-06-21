import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';
import lazyUse, { config } from './components/lazy.use';
import directive from './directive/index';
import './assets/styles/base.scss';

const AppElement = document.getElementById('app');

setTimeout(() => {
  const app = createApp(App);
  app.config.globalProperties.$ELEMENT = config;
  app.use(store).use(router).use(lazyUse).use(directive)
    .mount('#app');
  if (AppElement) AppElement.classList.add('vue_rendered');
}, 1000);

if (process.env.VUE_APP_RUN_MOCK === 'true') {
  require('../mock');
}
