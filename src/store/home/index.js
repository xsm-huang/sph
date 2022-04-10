/**
 * @author xsm 2022-04-09
 * @description home 模块仓库
 */

import { reqCategoryList, reqBannerList } from '@/api';

// state 仓库存储数据的地方
const state = {
    categoryList: [], // 三级联动组件
    bannerList: [], // 轮播图
};
// mutations 修改state的唯一手段
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
};
// actions 处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
    async categoryList(context) {
        const res = await reqCategoryList();
        if (res.code === 200) {
            context.commit('CATEGORYLIST', res.data);
        }
    },

    async getBannerList(context) {
        const res = await reqBannerList();
        if (res.code === 200) {
            context.commit('GETBANNERLIST', res.data);
        }
    },
};
// getters 类似计算属性，让组件仓库的数据更加方便
const getters = {};
// 对外暴露 store 类的一个实例
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
