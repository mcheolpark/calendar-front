import Vue from 'vue';
import Router from 'vue-router';
import Layout from './views/Layout.vue';
import Month from './components/month/Month.vue';
import Week from './components/week/Week.vue';
//import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: Layout,
            children: [
                {
                    path: '',
                    name: 'main',
                    component: Month
                },
                {
                    path: '/week',
                    name: 'week',
                    component: Week
                }
            ]
        },
        /*
        {
            path: '/',
            name: 'home',
            component: Home
        },
        */
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
});
