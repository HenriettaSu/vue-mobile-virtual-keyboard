import Vue from 'vue';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import router from './router/index';
import App from './App';

Vue.use(VueRouter);

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
