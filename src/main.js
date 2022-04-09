import Vue from 'vue';
import App from './App.vue';

// 三级联动组件 注册全局组件
import TypeNav from '@/pages/Home/TypeNav';
// 引入路由
import router from '@/router/index';

Vue.config.productionTip = false;

// 注册组件
Vue.component(TypeNav.name, TypeNav);

new Vue({
    render: (h) => h(App),
    // 注册路由
    router,
}).$mount('#app');
