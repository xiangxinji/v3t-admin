import request from '@/utils/request';
import { BuildRouteConf } from '@/types/config';

const API = {
  Build: '/config/build',
};

export const build = (roles : Array<string>) => request<BuildRouteConf>({
  url: API.Build,
  params: {
    roles,
  },
});
