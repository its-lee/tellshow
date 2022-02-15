const { name } = require('./package.json');

module.exports = {
  publicPath: `/${name}/`,
  pluginOptions: {
    i18n: {
      locale: 'en-gb',
      fallbackLocale: 'en-gb',
      localeDir: 'locales',
      enableInSFC: false,
      enableLegacy: false
    }
  }
};
