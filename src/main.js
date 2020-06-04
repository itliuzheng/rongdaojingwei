import Vue from 'vue'
//import './plugins/axios'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/element.js'

import './permission.js'

import '@/styles/index.scss' // global css

import "@/assets/iconFont/iconfont.css"

import vueParticleLine from 'vue-particle-line'
import 'vue-particle-line/dist/vue-particle-line.css'
Vue.use(vueParticleLine);

Vue.prototype.axios = axios;

axios.defaults.withCredentials = true; //让ajax携带cookie

Vue.config.productionTip = false;
Vue.config.silent = true;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
