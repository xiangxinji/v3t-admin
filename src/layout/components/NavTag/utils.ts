/* eslint-disable no-param-reassign */
import {
  Ref, ref, reactive, watch, computed,
} from 'vue';
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';
import { AppStore } from '@/store';

export type StateType = {
  currentPath : string
}
export function createState() {
  const state = reactive<StateType>({
    currentPath: '',
  });
  const scrollRef = ref<HTMLElement | null>(null);
  return {
    state, scrollRef,
  };
}

function createTagger(name : string, path : string) :Tagger {
  return {
    name, path, cache: true, close: true,
  };
}

function getTag(taggers : Array<Tagger>, path : string) {
  for (let i = 0; i < taggers.length; i++) {
    if (taggers[i].path === path) return taggers[i];
  }
  return null;
}

export function useNavTag(state : StateType, store : AppStore, router : Router) {
  const tags = computed<Array<Tagger>>(() => store.getters.tags);
  const getCloseState = (path : string) => {
    if (store.getters.tags.length < 2) return false;
    const current = tags.value.find((item) => path === item.path);
    return current ? current.close : false;
  };
  const closeTagHandler = (closeTag : Tagger) => {
    if (closeTag.path === state.currentPath) {
      let i = tags.value.findIndex((tag) => tag.path === state.currentPath) - 1;
      if (i < 0) i = 0;
      router.replace(tags.value[i].path);
    }
    store.commit('tags/REMOVE_TAG', closeTag.path);
  };
  return {
    getCloseState,
    closeTagHandler,
    tags,
  };
}

export function useWatchRoute(route: RouteLocationNormalizedLoaded, store : AppStore, state :StateType, router : Router) {
  watch(route, () => {
    const path = route.fullPath;
    const name = route.meta.title as string;
    if (!name) return;
    const taggers = store.getters.tags;
    state.currentPath = route.path;
    if (!taggers.some((i : Tagger) => i.path === path)) store.commit('tags/ADD_TAG', createTagger(name, path));
  }, { immediate: true });
}

export function createActiveFunc(scrollRef : Ref<HTMLElement | null>, state : StateType, store : AppStore, router : Router) {
  return function handlerActiveTag(event : Event, tagger : Tagger) : void {
    if (scrollRef.value === null || tagger.path === state.currentPath) return;
    const rect = scrollRef.value.getBoundingClientRect();
    const target = (event.target as HTMLElement);
    const scope = { left: scrollRef.value.scrollLeft, right: scrollRef.value.scrollLeft + rect.width, width: rect.width };
    const scopeValue = target.clientWidth * 2;
    const l = target.offsetLeft + target.clientWidth;
    if (l > scope.left && l > scope.right - scopeValue) {
      scrollRef.value.scrollLeft += scope.width - (scope.width - scopeValue);
    } else if (l > scope.left && l < scope.left + scopeValue) {
      scrollRef.value.scrollLeft -= scope.width - (scope.width - scopeValue);
    }
    scrollRef.value.scrollLeft = scrollRef.value.scrollLeft < 0 ? 0 : scrollRef.value.scrollLeft;
    router.replace(tagger.path);
  };
}
