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

export default {
  install(app : App) : App {
    app.component(ElButton.name, ElButton);
    app.component(ElContainer.name, ElContainer);
    app.component(ElHeader.name, ElHeader);
    app.component(ElMain.name, ElMain);
    app.component(ElAside.name, ElAside);
    app.component(ElBreadcrumb.name, ElBreadcrumb);
    app.component(ElIcon.name, ElIcon);
    app.component(ElMenu.name, ElMenu);
    app.component(ElMenuItem.name, ElMenuItem);
    app.component(ElSubmenu.name, ElSubmenu);
    app.component(ElBreadcrumbItem.name, ElBreadcrumbItem);
    app.component(ElInput.name, ElInput);
    app.component(ElTable.name, ElTable);
    app.component(ElTableColumn.name, ElTableColumn);
    app.component(ElMessageBox.name, ElMessageBox);
    app.component(ElPagination.name, ElPagination);
    return app;
  },
};

locale.use(lang);
export const config = {
  size: 'small',
};
