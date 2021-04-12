export type BuildRouteConf = {
    path : string
    component : string,
    meta : { title : string },
    children : Array<BuildRouteConf>
}
