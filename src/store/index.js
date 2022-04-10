/**
 * @author xsm 2022-04-09
 * @description Vuex
 */
import Vue from 'vue';
import Vuex from 'vuex';
import homeAbout from '@/store/home';
// 使用插件一次
Vue.use(Vuex);

// 对外暴露 store 类的一个实例
export default new Vuex.Store({
    modules: {
        homeAbout,
    },
});
