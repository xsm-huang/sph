<template>
    <div>
        <Header />
        <!-- 路由组件出口 -->
        <router-view></router-view>
        <!-- 在 home 和 search 路由组件显示时显示，其他时候隐藏 -->
        <Footer v-show="$route.meta.showFooter" />
    </div>
</template>

<script>
import Header from './components/Header/index';
import Footer from './components/Footer/index';
export default {
    name: 'App',
    components: { Header, Footer },
    mounted() {
        // 通知 Vuex 发请求，获取三级列表数据并存储于仓库中
        this.$store.dispatch('homeAbout/categoryList'); // 优化方法, 确保只加载一次
    },
};
</script>

<style></style>
