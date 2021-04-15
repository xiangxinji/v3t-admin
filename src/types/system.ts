export type BuildRouteConf = {
    path : string
    component ?: string | Function | object,
    hidden?: boolean,
    redirect?:string,
    meta ?: { title : string, keepAlive ?: boolean, close ?: boolean, icon ?: string },
    children ?: Array<BuildRouteConf>
}

export type MetaType = {
  title ?: string
  keepAlive ?: boolean
  icon ?: string
  close : boolean
}

export type NormolizedMenuTree = {
  target : string
  hasChildren : boolean
  outLink : boolean
  children : Array<NormolizedMenuTree>
  icon: string
  title : string
}
