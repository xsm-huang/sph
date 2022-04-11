<template>
    <div class="swiper-container" ref="cur">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
                <img :src="carousel.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper';
export default {
    name: 'Carousel',
    props: ['list'],
    watch: {
        list: {
            // 立即监听, 无论数据是否变化, 先监听一次
            immediate: true,
            handler() {
                //只能监听到数据已经有了，但是v-for动态渲染结构我们还是没有办法确定的，因此还是需要用nextTick
                this.$nextTick(() => {
                    console.log(this.$refs.cur);
                    var mySwiper = new Swiper(this.$refs.cur, {
                        loop: true,
                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                            //点击小球的时候也切换图片
                            clickable: true,
                        },
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    });
                });
                // handler(newVal, oldVal) {
                //     // 初始化 swiper
                //     // 当前数据已经执行, 但是没办法保证 v-for 已经执行完毕, 即结构还没有完整
                //     this.$nextTick(() => {
                //         // 此时数据一定已经更新, 且结构渲染完毕
                //         var mySwiper = new swiper('.swiper-container', {
                //             observer: true, //修改swiper自己或子元素时，自动初始化swiper
                //             observeParents: true, //修改swiper的父元素时，自动初始化swiper
                //             onSlideChangeEnd: function (swiper) {
                //                 swiper.update();
                //                 mySwiper.startAutoplay();
                //                 mySwiper.reLoop();
                //             },
                //             // direction: 'vertical', // 垂直切换选项
                //             loop: true, // 循环模式选项

                //             // 如果需要分页器
                //             pagination: {
                //                 el: '.swiper-pagination',
                //                 clickable: true, // 小圆点可点
                //             },

                //             // 如果需要前进后退按钮
                //             navigation: {
                //                 nextEl: '.swiper-button-next',
                //                 prevEl: '.swiper-button-prev',
                //             },

                //             // 如果需要滚动条
                //             // scrollbar: {
                //             //     el: '.swiper-scrollbar',
                //             // },
                //         });
                //     });
            },
        },
    },
};
</script>

<style lang="less" scoped></style>
