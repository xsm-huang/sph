import Vue from 'vue';
import App from './App.vue';

import TypeNav from '@/components/TypeNav'; // 三级联动组件 注册全局组件
import Carousel from '@/components/Carousel'; // 轮播图组件 注册全局组件
import Pagination from '@/components/pagination'; // 分页器组件
import router from '@/router/index'; // 引入路由
import store from '@/store'; // 引入仓库
import '@/mock/mockServe'; // 引入mock模拟数据
import 'swiper/css/swiper.min.css'; // 引入轮播图样式

Vue.config.productionTip = false;

// 注册组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

new Vue({
    render: (h) => h(App),
    router, // 注册路由
    store, // 注册仓库
    beforeCreate() {
        Vue.prototype.$bus = this; // 全局事件总线
    },
}).$mount('#app');
