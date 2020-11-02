import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import { isLogined } from "../untils/tools";


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
},
{
    path: '/sort',
    name: 'Sort',
    component: () =>
        import('../views/Sort.vue')
},
{
    path: '/movie',
    name: 'Movie',
    component: () =>
        import('../views/Movie.vue')
},
{
    path: '/detail',
    name: 'Detail',
    component: () =>
        import('../views/Detail.vue')
},
{
    path: '/mine',
    name: 'Mine',
    component: () =>
        import('../views/Mine.vue'),
    meta: {
        needLogin: true,
    }
},
{
    path: '/list',
    name: 'List',
    component: () =>
        import('../views/List.vue')
},
{
    path: '/reg',
    name: 'Reg',
    component: () =>
        import('../views/Reg.vue')
},
{
    path: '/login',
    name: 'Login',
    component: () =>
        import('../views/Login.vue')
},
{
    path: '/changelogin',
    name: 'ChangeLogin',
    component: () =>
        import('../views/ChangeLogin.vue')
},
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.needLogin) {
        if (isLogined()) {
            next();
        } else {
            next({
                name: "Login",
            });
        }
    } else {
        next();
    }
});

export default router