import Vue from 'vue'
import Router from 'vue-router'
import Home from '../component/home.vue'

Vue.use(Router);

export default new Router({
    mode : 'history',
    routes: [
        { path : '/', name : '/', },
        { path : '/home' , name : 'home' , component : Home}
    ]
})