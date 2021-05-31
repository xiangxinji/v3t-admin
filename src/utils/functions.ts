export function once(cb : Function) : () => void {
  let called = false;
  return function onceCaller() {
    if (!called) {
      cb();
      called = true;
    }
  };
}

export function isDef(value : any) : boolean {
  return value !== undefined && value !== null;
}

export function debounce(callback : () => void, delay = 0) {
  let time: number | null = null;
  return function handler() {
    if (time) window.clearTimeout(time);
    time = window.setTimeout(() => {
      try {
        callback();
      } catch (e) {
        console.error('[Debounce Error]:', e);
      }
    }, delay);
  };
}
