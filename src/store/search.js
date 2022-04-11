/**
 * @author xsm 2022-04-11
 * @description search仓库
 */

import { reqGetSearchInfo } from '@/api';

const state = {
    searchList: {},
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    },
};
const actions = {
    /**
     * @function 获取search模块数据
     * @param {Object} params  至少是一个空对象
     */
    async getSearchList({ commit }, params) {
        const res = await reqGetSearchInfo(params);
        if (res.code === 200) {
            commit('GETSEARCHLIST', res.data);
        }
    },
};
// 简化数据,方便组件取用
const getters = {
    goodsList(state) {
        return state.searchList.goodsList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
