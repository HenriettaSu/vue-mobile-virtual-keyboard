import Router from 'vue-router';
import App from './../App';
const index = () => import('./../pages/index');

export default new Router({
    routes: [
        {
            path: '/',
            redirect: {
                name: 'index'
            },
            component: App
        },
        {
            name: 'index',
            path: '/index',
            meta: {
                title: 'demo',
                left: false
            },
            component: index
        }
    ]
});
