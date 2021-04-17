// eslint-disable-next-line max-classes-per-file
import { reactive } from 'vue';
import request from '@/utils/request';
import { AxiosRequestConfig } from 'axios';
import deepClone from 'deepclone';
import { EventEmitter } from './event';

class CrudTools {
  static toSelect<QT, RT>(url : string, dataConf : { params?:any, data ?: any}) {
    const config = {
      url,
      method: 'GET',
      data: {},
      params: {},
    };
    config.data = dataConf.data;
    config.params = dataConf.params;
    return request<RT>(config as AxiosRequestConfig);
  }

  static toDelete<DataKey>(url : string, deleteKeys : Array<DataKey> | DataKey) {
    if (!Array.isArray(deleteKeys)) deleteKeys = [deleteKeys];
    return request<any>({
      url,
      method: 'DELETE',
      data: deleteKeys,
    });
  }

  static toCreate<ET>(url : string, entity : ET) {
    return request<ET>({
      url,
      method: 'POST',
      data: entity,
    });
  }

  static toUpdate<ET>(url : string, entity : ET) {
    return request<ET>({
      url,
      method: 'PUT',
      data: entity,
    });
  }
}

export type CrudOptions<QT, ET, DataKey> = {
  url : string
  query ?: QT
  selectImmediate ?: boolean
  deepCloneQuery ?: boolean
  dataKey ?: DataKey
}

class Crud <QT, ET, DataKey extends keyof ET> extends EventEmitter {
  // 请求的 URL
  url : string

  // 查询条件
  query ?: QT ;

  // 第一次默认去请求
  readonly selectImmediate : boolean

  // data key = id
  readonly dataKey :DataKey | string ;

  // 初始配置
  options : CrudOptions<QT, ET, DataKey> ;

  // 分页对象
  pagination : Pagination

  data : Array<ET> ;

  // 用户选择的当前数据 , 例如删除, 修改
  currentData :ET | null = null

  // 用户选择的多选数据
  selectionData : Array<ET> = []

  constructor(options : CrudOptions<QT, ET, DataKey>) {
    super();
    this.url = options.url;
    this.query = options.query;
    this.selectImmediate = options.selectImmediate || false;
    this.dataKey = options.dataKey || 'id';
    this.pagination = reactive<Pagination>({ current: 1, size: 10 });
    this.options = Object.freeze(options);
    this.data = reactive({ data: [] }).data;
  }

  get dataKeys() {
    return this.data.map((item) => item[this.dataKey as DataKey]);
  }

  get selectionDataKeys() {
    if (this.selectionData.length === 0) return [];
    return this.selectionData.map((item) => item[this.dataKey as DataKey]);
  }

  init():void {
    if (this.options.deepCloneQuery) this.query = reactive(deepClone(this.query) as object) as QT;
    if (this.selectImmediate) this.select();
  }

  select() {
    const task = CrudTools.toSelect<QT, PageResult<ET>>(this.url, { params: this.query });
    task.then(({ result }) => {
      this.data = result.content;
      this.pagination.size = result.size;
      this.pagination.current = result.current;
      this.callHook('select-success', this.data, this.pagination);
    });
  }

  delete(deleteKeys ?: Array<ET[DataKey]> | ET[DataKey]) {
    deleteKeys = deleteKeys || this.selectionDataKeys;
    const task = CrudTools.toDelete(this.url, deleteKeys);
    task.then((response) => {
      if (response.code === 200) {
        return this.callHook('delete-success', response);
      }
      return this.callHook('delete-error', response);
    });
  }

  create(entity : ET) {
    const task = CrudTools.toCreate<ET>(this.url, entity);
    task.then((response) => {
      if (response.code === 200) {
        return this.callHook('create-success', response.result);
      }
      return this.callHook('create-error', response);
    });
  }

  update(entity ?: ET | null) {
    entity = entity || this.currentData;
    if (!entity) {
      return;
    }
    const task = CrudTools.toUpdate<ET>(this.url, entity);
    task.then((response) => {
      if (response.code === 200) {
        return this.callHook('update-success', response.result);
      }
      return this.callHook('update-error', response);
    });
  }

  callHook(hookName : string, ...params :any[]) {
    this.emit(hookName, ...params);
  }
}

export function useCrud<QT, ET, DataKey extends keyof ET>(options : CrudOptions<QT, ET, DataKey>) {
  const crud = new Crud(options);
  crud.init();
  return crud;
}
