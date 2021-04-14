export type BuildRouteConf = {
    path : string
    component : string,
    meta : { title : string },
    children : Array<BuildRouteConf>
}

export type MetaType = {
  title ?: string
  keepAlive ?: boolean
  icon ?: string
  close : boolean
}
export type MenuTree = {
  path : string
  component : string
  meta ?: MetaType,
  hidden ?: boolean
  children : Array<MenuTree>
}

export type NormolizedMenuTree = {
  target : string
  hasChildren : boolean
  outLink : boolean
  children : Array<NormolizedMenuTree>
  icon: string
  title : string
}
