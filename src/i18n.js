import Vue from 'vue';
import VueI18n from 'vue-i18n';
import locales from './locales';

Vue.use(VueI18n);

const locale = process.env.VUE_APP_I18N_LOCALE || 'en-gb';

export default new VueI18n({
  locale,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en-gb',
  messages: locales
});
