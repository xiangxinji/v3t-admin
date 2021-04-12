import Mock from 'mockjs';

const path = require('path');

Mock.setup({
  timeout: 1200,
});
const servicesFiles = require.context('./services', true, /\.ts$/);

servicesFiles.keys().forEach((modulePath) => {
  require(`./services/${path.join(modulePath)}`);
});
