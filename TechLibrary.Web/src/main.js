import Vue from 'vue';
import App from './App.vue';

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { faForward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBackward);
library.add(faForward);
Vue.component('font-awesome-icon', FontAwesomeIcon);


Vue.config.productionTip = false;

import router from './routes.js'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
