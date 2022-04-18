/* 配置路由器 */
// 引入
import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';
import store from '@/store';
// 使用插件
Vue.use(VueRouter);

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

const router = new VueRouter({
    // 配置路由
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 };
    },
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
    next();
    let token = localStorage.getItem('TOKEN');
    // 用户信息
    let userInfo = store._modules.root.state.userAbout.userInfo;
    console.log(userInfo);
    if (token) {
        // 登陆了还想去登陆页面
        if (to.path == '/login') {
            next('/home');
        } else {
            if (userInfo.name) {
                next();
            } else {
                store
                    .dispatch('userAbout/getUserInfo')
                    // 获取用户信息成功
                    .then(() => {
                        next();
                    })
                    .catch(async (err) => {
                        // 获取用户信息失败, token 失效
                        // 清除 token 和用户信息
                        await store.dispatch('userAbout/userLogout');
                        next('/login');
                    });
            }
        }
    } else {
        next();
    }
});
export default router;
