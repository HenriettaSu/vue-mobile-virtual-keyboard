import Vue from 'vue';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import router from './router/index';
import App from './App';
import KeyboardComponent from './plugin/keyboard';

Vue.use(VueRouter);
Vue.use(KeyboardComponent);

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
