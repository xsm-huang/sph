/* 配置路由器 */
// 引入
import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用插件
Vue.use(VueRouter);

// 引入路由组件
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

// 将 VueRouter 原型对象上的 push 方法保存一份
let originPush = VueRouter.prototype.push;
/**
 * @function 重写的VueRouter.prototype.push方法
 * @param location {} 跳转目标配置
 * @param resolve {function} 成功的回调
 * @param reject {function} 失败的回调
 */
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(
            this,
            location,
            () => {},
            () => {}
        );
    }
};
// 将 VueRouter 原型对象上的 replace 方法保存一份
let originReplace = VueRouter.prototype.replace;
/**
 * @function 重写的VueRouter.prototype.replace方法
 * @param location {} 跳转目标配置
 * @param resolve {function} 成功的回调
 * @param reject {function} 失败的回调
 */
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(
            this,
            location,
            () => {},
            () => {}
        );
    }
};

export default new VueRouter({
    // 配置路由
    routes: [
        // 重定向，在项目运行时，访问时定向到 /home
        {
            path: '*',
            redirect: '/home',
        },
        {
            path: '/home',
            component: Home,
            meta: {
                showFooter: true,
            },
        },
        {
            name: 'search',
            path: '/search/:keyword?',
            component: Search,
            meta: {
                showFooter: true,
            },
        },
        {
            path: '/login',
            component: Login,
            meta: {
                showFooter: false,
            },
        },
        {
            path: '/register',
            component: Register,
            meta: {
                showFooter: false,
            },
        },
    ],
});
