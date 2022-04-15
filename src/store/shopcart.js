/**
 * @author xsm 2022-04-13
 * @description shopcart仓库
 */

import { reqCartList, reqDeleteCart } from '@/api';
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
    // 删除购物车产品
    async deleteCartList({ commit }, skuId) {
        const res = await reqDeleteCart(skuId);
        if (res.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
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
