import Vue from 'vue';
import App from './App.vue';

import TypeNav from '@/components/TypeNav'; // 三级联动组件 注册全局组件
import Carousel from '@/components/Carousel'; // 轮播图组件 注册全局组件
import Pagination from '@/components/pagination'; // 分页器组件
import router from '@/router/index'; // 引入路由
import store from '@/store'; // 引入仓库
import '@/mock/mockServe'; // 引入mock模拟数据
import 'swiper/css/swiper.min.css'; // 引入轮播图样式
import * as API from '@/api'; // 引入接口 api 中的全部请求函数
import { Button, MessageBox } from 'element-ui'; // 使用 element-ui，局部引入
Vue.config.productionTip = false;

// 注册组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
Vue.component(Button.name, Button); // 注册 element-ui

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

new Vue({
    render: (h) => h(App),
    router, // 注册路由
    store, // 注册仓库
    beforeCreate() {
        Vue.prototype.$bus = this; // 全局事件总线
        Vue.prototype.$API = API; // 将api接口函数绑定到vue原型对象上
    },
}).$mount('#app');
