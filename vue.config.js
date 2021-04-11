const settings = require('./src/settings.js')
module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = settings.appTitle;
      return args;
    });
  },
};
