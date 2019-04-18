import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index/Index'
import Shopcart from '../pages/shopcart/Index'
import My from '../pages/my/Index'
import Login from '../pages/my/Login'
import Register from '../pages/my/Register'
import UserCenter from '../pages/my/UserCenter'
import Classify from '../pages/classify/Index'
import Search from '../pages/search/Index'
import SearchResult from '../pages/search/SearchResult'
import GoodsDetail from '../pages/goodsDetail/Index'

Vue.use(Router)

export default new Router({
    routes: [{
        name: 'Index',
        path: '/index',
        component: Index
    }, {
        name: 'Classify',
        path: '/classify',
        component: Classify
    }, {
        name: 'Shopcart',
        path: '/shopcart',
        component: Shopcart
    }, {
        name: 'My',
        path: '/my',
        component: My
    }, {
        name: 'Login',
        path: '/login',
        component: Login
    }, {
        name: 'Register',
        path: '/register',
        component: Register
    }, {
        name: 'UserCenter',
        path: '/user-center',
        component: UserCenter
    }, {
        name: 'Search',
        path: '/search',
        component: Search
    }, {
        name: 'SearchResult',
        path: '/search/:searchWord',
        component: SearchResult
    }, {
        name: 'GoodsDetail',
        path: '/goods-detail/:id',
        component: GoodsDetail
    }, {
        path: '/',
        redirect: '/index'
    }]
})