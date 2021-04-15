import { AppStore } from '@/store';
import { watch } from 'vue';
import { BuildRouteConf, NormolizedMenuTree } from '@/types/system';
import { covertNormalizeMenuTree } from '@/utils/convert';

export type StateType = {
  menus : Array<NormolizedMenuTree>
}
export type UseAsideBarParams = {
  store: AppStore
  state : StateType
}

export function useWatchMenus(store : AppStore, state : StateType) {
  watch<Array<BuildRouteConf>>(store.getters.menus, (menus) => {
    state.menus = [];
    menus.forEach((menu) => {
      if (!menu.hidden) state.menus.push(covertNormalizeMenuTree(menu));
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  }, { immediate: true });
}
export function useAsideBar({ store, state } : UseAsideBarParams) {
  useWatchMenus(store, state);
}
