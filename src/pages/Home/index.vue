<template>
    <div>
        <!-- 三级联动组件已经注册为全局组件，不需要再引入 -->
        <TypeNav />
        <ListContainer />
        <Recommend />
        <Rank />
        <Like />
        <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
        <Brand />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ListContainer from '@/pages/Home/ListContainer/index.vue';
import Recommend from '@/pages/Home/Recommend/index.vue';
import Rank from '@/pages/Home/Rank/index.vue';
import Like from '@/pages/Home/Like/index.vue';
import Floor from '@/pages/Home/Floor/index.vue';
import Brand from '@/pages/Home/Brand/index.vue';

export default {
    name: '',
    components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
    computed: {
        ...mapState('homeAbout', ['floorList']),
    },
    mounted() {
        // 获取Floor组件数据, 因为要生成多个floor组件,所以数据不可以在floor中获取
        this.$store.dispatch('homeAbout/getFloorList');
        // 获取用户信息
        // this.$store.dispatch('userAbout/getUserInfo');
    },
};
</script>

<style></style>
