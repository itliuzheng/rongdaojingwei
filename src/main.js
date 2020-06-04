import Vue from 'vue'
//import './plugins/axios'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'

import vuescroll from 'vuescroll';

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

// 你可以在这里设置全局配置
Vue.use(vuescroll, {
  ops: {
    scrollPanel: {
      initialScrollY: true,
      initialScrollX: false,
      scrollingX: true,
      scrollingY: true,
      speed: 300,
      easing: undefined,
      verticalNativeBarPos: 'right',
      maxHeight:400
    }
  }, // 在这里设置全局默认配置
  name: 'vueScroll' // 在这里自定义组件名字，默认是 vueScroll
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
