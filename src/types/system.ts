export type MetaType = {
  title ?: string
  keepAlive ?: boolean
  icon ?: string
  close ?: boolean
  outLink ?: boolean
}

export type BuildRouteConf = {
  path : string
  component ?: string | Function | object,
  hidden?: boolean,
  redirect?:string,
  meta ?: MetaType,
  children ?: Array<BuildRouteConf>
}

export type NormolizedMenuTree = {
  target : string
  hasChildren : boolean
  outLink : boolean
  children : Array<NormolizedMenuTree>
  icon: string
  title : string
}
