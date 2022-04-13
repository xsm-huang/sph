/**
 * @author xsm 2022-04-13
 * @description shopcart仓库
 */

import { reqCartList } from '@/api';
const state = {};
const mutations = {};
const actions = {
    async getCartList() {
        const res = await reqCartList();
        console.log(res);
    },
};
const getters = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
