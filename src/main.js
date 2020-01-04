import Vue from 'vue'
import App from './App.vue'
import codebird from 'codebird'
import store from './store/index'
import moment from 'moment'
import router from '../src/router/router'

Vue.use(codebird);
Vue.use(moment);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
