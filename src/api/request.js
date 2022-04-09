/**
 * @author xsm 2022-04-09
 * @description 对axios的二次封装
 */

import axios from 'axios';
import nprogress from 'nprogress'; // 引入进度条
import 'nprogress/nprogress.css'; // 引入进度条样式

// 利用axios对象方法create，创建一个axios实例
const request = axios.create({
    // 基础路径，发送请求时，路径当中都会出现api
    baseURL: '/api',
    // 请求超时时间5s
    timeout: 5000,
});

// 请求拦截器：在发送请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事
request.interceptors.request.use((config) => {
    // 进度条开始
    nprogress.start();
    // config 是一个配置对象，有一个属性 header 请求头
    return config;
});

// 响应拦截器
request.interceptors.response.use(
    (res) => {
        // 进度条结束
        nprogress.done();
        return res.data;
    },
    (error) => {
        return Promise.reject(new Error('faile'));
    }
);

// 对外暴露
export default request;
