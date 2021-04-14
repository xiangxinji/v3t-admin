import { AppStore } from '@/store';
import { watch } from 'vue';

export type StateType = {
  includes : Array<string>
}
export type UseAppMainParams = {
  store: AppStore, state: StateType,
}
export function useAppMain({ store, state } : UseAppMainParams) {
  watch<Array<Tagger>>(store.getters.tags, (tags) => {
    state.includes = tags.filter((tag) => tag.cache).map((i) => i.componentName);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  }, { immediate: true });
}
