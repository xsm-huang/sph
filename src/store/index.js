/**
 * @author xsm 2022-04-09
 * @description Vuex
 */
import Vue from 'vue';
import Vuex from 'vuex';
import homeAbout from '@/store/home';
import searchAbout from '@/store/search';
import detailAbout from '@/store/detail';
import shopcartAbout from '@/store/shopcart';
import userAbout from '@/store/user';
// 使用插件一次
Vue.use(Vuex);

// 对外暴露 store 类的一个实例
export default new Vuex.Store({
    modules: {
        homeAbout,
        searchAbout,
        detailAbout,
        shopcartAbout,
        userAbout,
    },
});
