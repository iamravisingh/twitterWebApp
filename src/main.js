import Vue from 'vue'
import App from './App.vue'
import codebird from 'codebird'
import store from './store/index'
import moment from 'moment'
import router from '../src/router/router'
import Vuelidate from 'vuelidate'

Vue.use(codebird);
Vue.use(moment);
Vue.use(Vuelidate);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
