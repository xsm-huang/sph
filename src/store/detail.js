/**
 * @author xsm 2022-04-12
 * @description detail模块仓库
 */
import { reqGoodsInfo, reqAddorUpdateShopCart } from '@/api';
// import { getUUID } from '@/utils/uuid_token';
const state = {
    goodInfo: {},
    // 临时游客身份
    // uuid_token: getUUID(),
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
        // console.log(goodInfo);
    },
};
const actions = {
    async getGoodInfo({ commit }, skuId) {
        const res = await reqGoodsInfo(skuId);
        if (res.code == 200) {
            commit('GETGOODINFO', res.data);
        }
    },
    async addorUpdateShopCart({ commit }, { skuId, skuNum }) {
        const res = await reqAddorUpdateShopCart(skuId, skuNum);
        // 加入购物车后，服务器写入数据成功，只是返回 code=200，表示操作成功
        // 服务器没有返回数据，所以不需要仓库存储数据
        if (res.code == 200) {
            return 'ok';
        } else {
            // 代表加入购物车失败
            return Promise.reject(new Error('faile'));
        }
    },
};
const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {};
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    },
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
