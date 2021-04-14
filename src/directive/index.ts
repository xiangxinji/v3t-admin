import { App } from 'vue';
import Permission from './permission';

export default {
  install(app : App) {
    app.directive('permission', Permission);
  },
};
