const settings = require('@/settings.js');

export type Setting = {
  appTitle : string
  routerWhiteList : Array<string>
  storageTokenKey: string
  pageDefaultCache: boolean
  pageDefaultAllowClose : boolean
}
const s = settings as Setting;
export default s;
