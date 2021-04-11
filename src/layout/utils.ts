import { RouteLocationNormalizedLoaded } from 'vue-router';
import { computed, ComputedRef } from 'vue';
import { useStore } from 'vuex';

import variables from '../assets/styles/_variables.scss';

export type BreadCrumbConfig = {
  path : string ;
  label : string;
  current : boolean ;
}

type LayoutStyles = { [key : string] : string }
export function getLayoutStyles() : LayoutStyles {
  const r = {};
  const vars = variables as LayoutStyles;
  Object.keys(vars).forEach((key) => {
    if (key.indexOf('layout') === 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      r[key.substring(6)] = vars[key];
    }
  });
  return r;
}

export function getBreadcrumbs(route : RouteLocationNormalizedLoaded):Array<BreadCrumbConfig> {
  return route.matched.slice(1).map((r) => {
    let label = '未定义';
    if (r.meta && r.meta.title && typeof r.meta.title === 'string') label = r.meta.title;
    const s : BreadCrumbConfig = {
      path: r.path,
      label,
      current: r.path === route.path,
    };
    return s;
  });
}

export function useFolder() : { fold : ComputedRef<boolean>, toggleFolder : Function } {
  const store = useStore();
  const toggleFolder = () => {
    store.commit('CHANGE_ASIDE_FOLDER', !store.state.common.asideFold);
  };
  return {
    fold: computed(() => store.state.common.asideFold),
    toggleFolder,
  };
}
