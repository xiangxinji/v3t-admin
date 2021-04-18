// eslint-disable-next-line max-classes-per-file
import {
  provide, reactive, computed,
} from 'vue';
import request from '@/utils/request';
import { AxiosRequestConfig } from 'axios';
import deepClone from 'deepclone';
import { toCamelCase } from '@/utils/convert';
import { EventEmitter } from './event';

let UUID = 0;

class CrudTools {
  static toSelect<RT>(url : string, dataConf : { params?:any, data ?: any}) {
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

export type CrudOptions<QT, ET> = {
  url : string
  query ?: QT
  selectImmediate ?: boolean
  deepCloneQuery ?: boolean
  dataKey ?: keyof ET
}
export type CrudHookOption = {
  tag ?:string
}

class Crud <QT, ET> extends EventEmitter {
  readonly uuid : number

  // 请求的 URL
  readonly url : string

  // 查询条件
  query : QT

  // 第一次默认去请求
  readonly selectImmediate : boolean

  // data key = id
  readonly dataKey : keyof ET ;

  // 初始配置
  options : CrudOptions<QT, ET> ;

  // 分页对象
  pagination : Pagination

  data : Array<ET> ;

  // 用户选择的当前数据 , 例如删除, 修改
  currentData :ET | null = null

  // 用户选择的多选数据
  selectionData : Array<ET> = []

  // 是否正在加载
  loading : boolean

  constructor(options : CrudOptions<QT, ET>) {
    super();
    this.uuid = UUID++;
    this.url = options.url;
    this.loading = false;
    this.query = (options.query || {}) as QT;
    this.selectImmediate = options.selectImmediate || true;
    this.dataKey = (options.dataKey || 'id') as keyof ET;
    this.pagination = { current: 1, size: 10 };
    this.data = [];
    this.options = options;
    return reactive(this) as Crud<QT, ET>;
  }

  get dataKeys() {
    return this.data.map((item) => item[this.dataKey]);
  }

  get selectionDataKeys() {
    if (this.selectionData.length === 0) return [];
    return this.selectionData.map((item) => item[this.dataKey]);
  }

  init():void {
    if (this.options.deepCloneQuery) this.query = reactive(deepClone(this.query) as object) as QT;
    if (this.selectImmediate) this.select();
  }

  select() {
    this.loading = true;
    const task = CrudTools.toSelect<PageResult<ET>>(this.url, { params: { ...this.query, ...this.pagination } });
    task.then(({ result }) => {
      console.log(this);
      this.data = result.content;
      this.pagination.size = result.size;
      this.pagination.current = result.current;
      this.callHook('select-success', this.data, this.pagination);
    }).finally(() => {
      this.loading = false;
    });
  }

  delete(deleteKeys ?: Array<ET[keyof ET]> | ET[keyof ET]) {
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

export function useCrud<QT, ET>(options :CrudOptions< QT, ET>, hookOptions ?: CrudHookOption) {
  const crud = new Crud<QT, ET>(options);
  crud.init();
  provide(toCamelCase(hookOptions?.tag || 'crud-default'), crud);
  return crud;
}
