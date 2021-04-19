/* eslint-disable no-underscore-dangle */
import { ElMessageBox } from 'element-plus';
import { provide } from 'vue';
import { toCamelCase } from '@/utils/convert';
import Crud, { CrudHookOption, CrudOptions } from '@/utils/crud';

function deleteConfirm(keys : string []) {
  return ElMessageBox.confirm(`此操作将永久删除该${keys.length}条数据, 是否继续?`, '提示', {
    type: 'warning',
  });
}
export function useCrud<QT, ET>(options :CrudOptions< QT, ET>, hookOptions ?: CrudHookOption) {
  options.confirm = hookOptions?.confirmDialog || false;
  const crud = new Crud<QT, ET>(options);
  crud.init();
  provide(toCamelCase(hookOptions?.tag || 'crud-default'), crud);
  if (hookOptions?.confirmDialog) {
    crud.on('delete-before', (keys : Array<string>) => {
      deleteConfirm(keys).then(() => {
        crud._doDelete(keys as any);
      });
    });
  }
  return crud;
}
