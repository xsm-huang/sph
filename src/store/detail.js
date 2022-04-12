/**
 * @author xsm 2022-04-12
 * @description detail模块仓库
 */
import { reqGoodsInfo } from '@/api';
const state = {
    goodInfo: {},
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
        console.log(goodInfo);
    },
};
const actions = {
    async getGoodInfo({ commit }, skuId) {
        const res = await reqGoodsInfo(skuId);
        if (res.code == 200) {
            commit('GETGOODINFO', res.data);
        }
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
