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
