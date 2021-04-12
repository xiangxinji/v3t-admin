/* eslint-disable no-param-reassign */
import {
  Ref, ref, reactive,
} from 'vue';

export function createState() {
  const state = reactive({
    currentIndex: 1,
  });
  const scrollRef = ref<HTMLElement | null>(null);
  return {
    state, scrollRef,
  };
}

export function createActiveFunc(scrollRef : Ref<HTMLElement | null>, state : { currentIndex : number }) {
  return function handlerActiveTag(event : Event, index : number) : void {
    state.currentIndex = index;
    if (scrollRef.value === null) return;
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
  };
}

export function createCloseFunc() {
  return function handleCloseTag() {
    return 1;
  };
}
