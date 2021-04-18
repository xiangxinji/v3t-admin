import deepClone from 'deepclone';

export function useResetCallback(state : any, resetKey : string) {
  const temp = deepClone(state[resetKey]);
  return function reset() {
    state[resetKey] = deepClone(temp);
  };
}
