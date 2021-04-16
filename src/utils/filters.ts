import { BuildRouteConf } from '@/types/system';

export function excludeOutLinkRouter(configs : Array<BuildRouteConf>) : Array<BuildRouteConf> {
  const r = configs.filter((config) => !config?.meta?.outLink).map((i) => ({ ...i }));
  r.forEach((conf) => {
    if (conf.children && conf.children.length > 0) {
      conf.children = excludeOutLinkRouter(conf.children);
    }
  });
  return r;
}
