import Vue from 'vue';
import App from './App.vue';
import i18n from './i18n';

import './styles/main.scss';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  i18n
}).$mount('#app');
