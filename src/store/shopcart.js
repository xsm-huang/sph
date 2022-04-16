/**
 * @author xsm 2022-04-13
 * @description shopcart仓库
 */

import { reqCartList, reqDeleteCart, reqUpdateChecked } from '@/api';
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
    // 修改产品选中状态
    async updateChecked({ commit }, { skuId, isChecked }) {
        const res = await reqUpdateChecked(skuId, isChecked);
        if (res.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },

    // 删除全部勾选的商品
    deleteAllCheckedCart(context) {
        let promiseAll = [];
        context.getters.cartList.cartInfoList.forEach((item) => {
            if (item.isChecked == 1) {
                // deleteCartList 返回的是一个promise对象
                const promise = context.dispatch('deleteCartList', item.skuId);
                promiseAll.push(promise);
            }
        });
        // 如果全部成功，则返回的结果成功
        // 如果有一个失败，则返回的结果失败
        return Promise.all(promiseAll);
    },

    updataAllCartChecked({ dispatch, getters }, isChecked) {
        let promiseAll = [];
        getters.cartList.cartInfoList.forEach((item) => {
            const promise = dispatch('updateChecked', { skuId: item.skuId, isChecked: isChecked });
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll);
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
