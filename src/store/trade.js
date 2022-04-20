/**
 * @author xsm 2022-04-19
 * @description trade仓库
 */
import { reqAdderssInfo, reqOrderInfo } from '@/api';
const state = {
    addressInfo: [],
    orderInfo: {},
};
const mutations = {
    GETUSERADDRESS(state, addressInfo) {
        state.addressInfo = addressInfo;
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo;
    },
};
const actions = {
    async getUserAddress({ commit }) {
        const res = await reqAdderssInfo();
        if (res.code == 200) {
            commit('GETUSERADDRESS', res.data);
        }
    },
    async getOrderInfo({ commit }) {
        const res = await reqOrderInfo();
        console.log(res);
        if (res.code == 200) {
            commit('GETORDERINFO', res.data);
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
