/* eslint-disable no-use-before-define */
import { reactive } from 'vue';

type TableHookOptions = {
  immediate ?: boolean,
  defaultQuery ?: object
}

type StateType <T> = { query : object, pagination : Pagination, data : Array<T>, loading : boolean }

export function useLoadTable<T>(handler : Function, options:TableHookOptions = {}):[
  StateType<T>, Function, Function
] {
  const react = {
    query: options.defaultQuery ? { ...options.defaultQuery } : {},
    pagination: { current: 1, size: 10 },
    data: [],
    loading: false,
  };
  const state = reactive<StateType<T>>(react);
  function resolve(response : ResponseContent<PageResult<T>>) {
    (state.data as T[]) = response.result.content;
    state.pagination.current = response.result.current;
    state.pagination.size = response.result.size;
  }
  if (options.immediate) refresh();
  function refresh() {
    react.pagination.current = 1;
    reload();
  }
  function reload() {
    state.loading = true;
    handler(state.query, state.pagination).then(resolve).finally(() => {
      state.loading = false;
    });
  }
  return [state as StateType<T>, refresh, reload];
}
