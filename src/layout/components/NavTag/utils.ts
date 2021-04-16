/* eslint-disable no-param-reassign */
import {
  reactive, watch, ComputedRef,
} from 'vue';
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';
import { AppStore } from '@/store';
import { MetaType } from '@/types/system';
import settings from '@/utils/settings';

export type StateType = {
  currentPath: string
}
export type UseNavTagParams = {
  state : StateType,
  store: AppStore,
  router: Router,
  route: RouteLocationNormalizedLoaded,
  tags : ComputedRef<Array<Tagger>>
}
export function createState() {
  const state = reactive<StateType>({
    currentPath: '',
  });
  return {
    state,
  };
}
// 创建一个 tagger
function createTagger(name: string, path: string, componentName : string, cache = settings.pageDefaultCache, close = settings.pageDefaultAllowClose): Tagger {
  return {
    name,
    path,
    cache,
    close,
    componentName,
  };
}

// 创建激活tag 方法, 首先先会进行边界判断, 如果点击了边界区域 会进行自动滚动
// 进行路由跳转
export function createActiveFunc(state: StateType, store: AppStore, router: Router) {
  return function handlerActiveTag(event: Event, tagger: Tagger): void {
    if (tagger.path === state.currentPath) {
      return;
    }
    const target = (event.target as HTMLElement);
    const parentNode = target.parentNode as HTMLElement;
    const rect = parentNode.getBoundingClientRect();
    const scope = {
      left: parentNode.scrollLeft,
      right: parentNode.scrollLeft + rect.width,
      width: rect.width,
    };
    const scopeValue = target.clientWidth * 2;
    const l = target.offsetLeft + target.clientWidth;
    if (l > scope.left && l > scope.right - scopeValue) {
      parentNode.scrollLeft += scope.width - (scope.width - scopeValue);
    } else if (l > scope.left && l < scope.left + scopeValue) {
      parentNode.scrollLeft -= scope.width - (scope.width - scopeValue);
    }
    parentNode.scrollLeft = parentNode.scrollLeft < 0 ? 0 : parentNode.scrollLeft;
    router.replace(tagger.path);
  };
}

// 创建 能否关闭此标签的状态方法, 返回这个 tag.close || false
export function createGetCloseState(tags: Array<Tagger>) {
  return function getCloseState(path: string) {
    const current = tags.find((item) => path === item.path);
    return current ? current.close : false;
  };
}

// 创建 关闭方法, 同步到 store.state.tags.tags
export function createCloseTagHandler(state: StateType, tags: Array<Tagger>, store: AppStore, router: Router) {
  return function closeTagHandler(closeTag: Tagger) {
    if (closeTag.path === state.currentPath) {
      let i = tags.findIndex((tag) => tag.path === state.currentPath) - 1;
      store.commit('tags/REMOVE_TAG', closeTag.path);
      if (i < 0) i = 0;
      router.replace(store.state.tags.tags[i].path);
    } else store.commit('tags/REMOVE_TAG', closeTag.path);
  };
}

// 监听路由变化并同步 state.cuurentPath
export function useWatchRoute(route: RouteLocationNormalizedLoaded, store: AppStore, state: StateType) {
  watch(route, () => {
    const path = route.fullPath;
    const name = route.meta.title as string;
    const componentName = route.name as string || 'NONE_COMPONENT';
    if (!name) return;
    const taggers = store.getters.tags;
    state.currentPath = route.path;
    const meta = route.meta as MetaType;
    const cache = meta && meta.keepAlive || false;
    const close = meta && meta.close || true;
    const tagger = createTagger(name, path, componentName, cache, close);
    console.log(tagger);
    if (!taggers.some((i: Tagger) => i.path === path)) store.commit('tags/ADD_TAG', tagger);
  }, { immediate: true });
}

export function useNavTag({
  state,
  store,
  router,
  route,
  tags,
}: UseNavTagParams) {
  const closeTagHandler = createCloseTagHandler(state, tags.value, store, router);
  const activeTagHandler = createActiveFunc(state, store, router);
  const getCloseState = createGetCloseState(tags.value);
  useWatchRoute(route, store, state);
  return {
    getCloseState,
    closeTagHandler,
    activeTagHandler,
  };
}
