<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container" @mouseleave="leaveHide">
            <h2 class="all" @mouseenter="enterShow">全部商品分类</h2>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            <!-- 过渡动画 -->
            <transition name="sort">
                <div class="sort" v-show="show">
                    <div class="all-sort-list2">
                        <div
                            class="item"
                            v-for="c1 in categoryList"
                            :key="c1.categoryId"
                            @click="showSearch"
                        >
                            <h3>
                                <a
                                    :data-categoryName="c1.categoryName"
                                    :data-categoryId1="c1.categoryId"
                                >
                                    {{ c1.categoryName }}
                                </a>
                                <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                            </h3>
                            <div class="item-list clearfix">
                                <div
                                    class="subitem"
                                    v-for="c2 in c1.categoryChild"
                                    :key="c2.categoryId"
                                >
                                    <dl class="fore">
                                        <dt>
                                            <a
                                                :data-categoryName="c2.categoryName"
                                                :data-categoryId2="c2.categoryId"
                                            >
                                                {{ c2.categoryName }}
                                            </a>
                                            <!-- <router-link to="/search">{{
                                            c2.categoryName
                                        }}</router-link> -->
                                        </dt>
                                        <dd>
                                            <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                <a
                                                    :data-categoryName="c3.categoryName"
                                                    :data-categoryId3="c3.categoryId"
                                                >
                                                    {{ c3.categoryName }}
                                                </a>
                                                <!-- <router-link to="/search">{{
                                                c3.categoryName
                                            }}</router-link> -->
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'TypeNav',
    data() {
        return {
            show: true, // 决定组件是否显示分类导航
        };
    },
    computed: {
        ...mapState('homeAbout', ['categoryList']),
    },
    methods: {
        enterShow() {
            this.show = true;
        },
        leaveHide() {
            if (this.$route.path !== '/home') {
                this.show = false;
            }
        },
        showSearch(event) {
            // 导航式编程 + 事件委派
            let element = event.target; // 获取触发事件的节点
            let { categoryname, categoryid1, categoryid2, categoryid3 } = element.dataset; // 通过节点的dataset属性获取自定义属性
            // 确定点击是a标签
            if (categoryname) {
                let location = { name: 'search' };
                let query = { categoryName: categoryname };
                if (categoryid1) {
                    query.category1Id = categoryid1;
                } else if (categoryid2) {
                    query.category2Id = categoryid2;
                } else if (categoryid3) {
                    query.category3Id = categoryid3;
                }

                location.query = query;
                this.$router.push(location);
            }
        },
    },
    mounted() {
        // 通知 Vuex 发请求，获取数据并存储于仓库中 (优化 -- 放到App组件中,使数据只请求一次)
        // this.$store.dispatch('homeAbout/categoryList');

        // 当组件挂载完毕, 判断是否显示分类导航
        if (this.$route.path !== '/home') {
            this.show = false;
        }
    },
};
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;
            // overflow: hidden;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 26px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    a {
                        cursor: pointer;
                    }

                    &:hover {
                        .item-list {
                            display: block;
                        }
                    }
                }
                .item:hover {
                    background-color: skyblue;
                }
            }
        }
        // 过渡动画 (权值问题)
        // 进入-开始状态
        .sort-enter,
        .sort-leave-to {
            height: 0px;
        }
        // 进入-结束状态
        .sort-enter-to,
        .sort-leave {
            height: 461px;
        }
        // 进入-定义动画时间速率
        .sort-enter-active,
        .sort-leave-active {
            transition: all 0.2s linear;
            overflow: hidden;
        }
    }
}
</style>
