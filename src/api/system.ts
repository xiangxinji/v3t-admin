import request from '@/utils/request';
import { BuildRouteConf } from '@/types/system';

const API = {
  Build: '/system/build',
};

export const build = (roles : Array<string>) => request<Array<BuildRouteConf>>({
  url: API.Build,
  method: 'POST',
  data: {
    roles,
  },
});
