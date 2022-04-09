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
};
</script>

<style></style>
