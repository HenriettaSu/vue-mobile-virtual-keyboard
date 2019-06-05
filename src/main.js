import Vue from 'vue';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import router from './router/index';
import App from './App';
// npm安裝引用
// import { KeyboardPlugin } from 'vue-mobile-virtual-keyboard';
import KeyboardPlugin from './plugin/keyboard';

Vue.use(VueRouter);
Vue.use(KeyboardPlugin);

FastClick.attach(document.body);

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
});
