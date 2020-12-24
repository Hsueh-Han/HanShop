import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import VeeValidate from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW';
import VueI18n from 'vue-i18n';

import Vuex from 'vuex';
import store from './store';

import App from './App.vue';

import 'bootstrap';
import router from './router';
import currencyFilter from './filters/currency';

Vue.use(Vuex);
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.filter('currency', currencyFilter);
Vue.component('Loading', Loading);
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'zhTW',
});
Vue.use(VeeValidate, {
  events: 'input|blur',
  i18n,
  dictionary: {
    zhTW,
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api).then((res) => {
      if (res.data.success) {
        next();
      } else {
        next({ path: '/login' });
      }
    });
  } else {
    next();
  }
});

new Vue({
  render: (h) => h(App),
  router,
  store,
  i18n,
}).$mount('#app');
