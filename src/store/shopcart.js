/**
 * @author xsm 2022-04-13
 * @description shopcart仓库
 */

import { reqCartList } from '@/api';
const state = {
    cartList: [],
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    },
};
const actions = {
    async getCartList({ commit }) {
        const res = await reqCartList();
        if (res.code == 200) {
            commit('GETCARTLIST', res.data);
        }
    },
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {};
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
