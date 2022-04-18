/**
 * @author xsm 2022-04-17
 * @description user仓库 登陆注册模块
 */
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api';

const state = {
    code: '',
    // token: '',
    userInfo: {},
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },

    // USERLOGIN(state, token) {
    //     state.token = token;
    // },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    CLEAR(state) {
        state.userInfo = {};
    },
};
const actions = {
    // 获取验证码
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
        let result = await reqUserRegister({ phone, code, password });
        if (result.code == 200) {
            return 'ok';
        } else {
            //捕获到错误信息
            return Promise.reject(result.message);
        }
    },

    // 登陆
    async userLogin({ commit }, data) {
        const res = await reqUserLogin(data);
        if (res.code == 200) {
            // commit('USERLOGIN', res.data.token);
            // 持久化存储
            localStorage.setItem('TOKEN', res.data.token);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },

    // 获取用户信息
    async getUserInfo({ commit }) {
        const res = await reqUserInfo();
        if (res.code == 200) {
            commit('GETUSERINFO', res.data);
            return 'ok';
        } else {
            return Promise.reject(res.message);
        }
    },

    async userLogout({ commit }) {
        // 像服务器发送请求,清除token
        const res = await reqLogout();
        if (res.code == 200) {
            // 清除本地用户数据和 token
            commit('CLEAR');
            localStorage.removeItem('TOKEN');
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
