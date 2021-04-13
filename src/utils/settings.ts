const settings = require('@/settings.js');

export type Setting = {
  appTitle : string
  routerWhiteList : Array<string>
}
const s = settings as Setting;
export default s;
