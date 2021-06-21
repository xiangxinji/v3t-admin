import { App } from 'vue';
import lang from 'element-plus/lib/locale/lang/zh-cn';
import 'dayjs/locale/zh-cn';
import locale from 'element-plus/lib/locale';
import {
  ElButton,
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElBreadcrumb,
  ElIcon,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElBreadcrumbItem,
  ElInput,
  ElTable,
  ElTableColumn,
  ElMessageBox,
  ElPagination,
} from 'element-plus';

const components:Array<{name : string}> = [
  ElButton,
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElBreadcrumb,
  ElIcon,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElBreadcrumbItem,
  ElInput,
  ElTable,
  ElTableColumn,
  ElMessageBox,
  ElPagination,
];
export default {
  install(app : App) : App {
    components.forEach((component) => {
      app.component(component.name, component);
    });
    return app;
  },
};

locale.use(lang);
export const config = {
  size: 'small',
};
