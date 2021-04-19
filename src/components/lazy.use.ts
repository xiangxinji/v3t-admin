import { App } from 'vue';
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
    return app;
  },
};
