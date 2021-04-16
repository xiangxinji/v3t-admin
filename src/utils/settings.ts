const settings = require('@/settings.js');

export type Setting = {
  appTitle : string
  routerWhiteList : Array<string>
  storageTokenKey: string
  pageDefaultCache: boolean
  pageDefaultAllowClose : boolean
  maxPermissionKey: string
  noneDefineKeepAliveRouteName: string
}
const s = settings as Setting;
export default s;
