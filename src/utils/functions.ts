export function once(cb : Function) : () => void {
  let called = false;
  return function onceCaller() {
    if (!called) {
      cb();
      called = true;
    }
  };
}
