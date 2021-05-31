import { reactive } from 'vue';
import request from '@/utils/request';
import deepclone from 'deepclone';

export type QueryConfig = {
  url : string,
  query ?: any,
  sizes ?: Array<number>,
  initialQuery ?: true,
  afterResetQuery ?: boolean,
  lock ?: boolean
}

type Pagination = {
  current : number, size : number, sizes : Array<number>, total : number
}

type QueryHandlers = {
  crudSelect : (data : any, pagination :Pagination, query ?: any) => Promise<any>
  crudRefresh : () => Promise<any>,
  crudReload : () => Promise<any>,
  crudReset : () => void
}

export function useQuery<T>(config ?: QueryConfig) {
  const tempQuery = config?.query || {};
  const state = reactive({
    query: deepclone(tempQuery),
    pagination: {
      current: 1, size: 10, sizes: config?.sizes || [10, 20, 30], total: 0,
    },
    dataSource: ([] as any[]),
    dataLoading: false,
    initialQuery: config?.initialQuery || true,
    afterResetQuery: config?.afterResetQuery || false,
    lock: config?.lock || false,
  });
  let task : Promise<null> | null = null;
  const handlers:QueryHandlers = {
    crudSelect(data : any, pagination : Pagination, query ?: any) {
      if (state.lock && state.dataLoading && task !== null) return task;
      task = new Promise((resolve, reject) => {
        state.dataLoading = true;
        request<PageResult<T>>({
          url: config?.url,
          method: 'GET',
          params: query,
          data: {
            ...data,
            current: pagination.current,
            size: pagination.size,
          },
        }).then(({ result }) => {
          state.dataSource = result.content;
          state.pagination.total = result.totalElements;
          resolve(null);
        }).catch(() => {
          reject();
        }).finally(() => {
          state.dataLoading = false;
        });
      });
      return task;
    },
    crudRefresh() {
      return handlers.crudSelect(state.query, state.pagination);
    },
    crudReload() {
      state.pagination.current = 1;
      return handlers.crudSelect(state.query, state.pagination);
    },
    crudReset() {
      state.query = deepclone(tempQuery);
      handlers.crudReload();
    },
  };
  if (state.initialQuery) {
    handlers.crudSelect(state.query, state.pagination);
  }
  return [state, handlers];
}
