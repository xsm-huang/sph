/**
 * @author xsm 2022-04-17
 * @description user仓库 登陆注册模块
 */
import { reqGetCode, reqUserRegister } from '@/api';

const state = {
    code: '',
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
};
const actions = {
    async getCode({ commit }, phone) {
        const res = await reqGetCode(phone);
        if (res.code == 200) {
            commit('GETCODE', res.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },

    // 用户注册
    async userRegister(content, { phone, code, password }) {
        console.log(content.state.code);
        let result = await reqUserRegister({ phone, code, password });
        if (result.code == 200) {
            return 'ok';
        } else {
            //捕获到错误信息
            return Promise.reject(result.message);
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
