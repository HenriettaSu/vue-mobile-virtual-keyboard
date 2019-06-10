import Vue from 'vue';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import router from './router/index';
import App from './App';
// npm安裝引用
// import { KeyboardPlugin } from 'vue-mobile-virtual-keyboard';
import KeyboardPlugin from './plugin/keyboard';

// 擴展內置鍵盤
KeyboardPlugin.extend({
    englishLowercase: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'ü'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä'],
        ['⇧', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '←'],
        [{
            code: '.',
            span: '1/16'
        }, {
            code: ',',
            span: '1/16'
        }, {
            code: 'space',
            span: '5/8',
            alias: ' '
        }, {
            code: 'send',
            span: '2/8'
        }]
    ]
});

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
