<template>
    <div>
        <TypeNav />
        <div class="main">
            <div class="py-container">
                <!--bread-->
                <div class="bread">
                    <ul class="fl sui-breadcrumb">
                        <li>
                            <a href="#">全部结果</a>
                        </li>
                    </ul>
                    <ul class="fl sui-tag">
                        <!-- 分类 -->
                        <li class="with-x" v-if="searchParams.categoryName">
                            {{ searchParams.categoryName }}
                            <i @click="removeCategoryName">×</i>
                        </li>
                        <!-- 关键字 -->
                        <li class="with-x" v-if="searchParams.keyword">
                            {{ searchParams.keyword }}
                            <i @click="removeKeyword">×</i>
                        </li>
                        <!-- 品牌信息 -->
                        <li class="with-x" v-if="searchParams.trademark">
                            {{ searchParams.trademark.split(':')[1] }}
                            <i @click="removeTrademark">×</i>
                        </li>
                        <!-- 平台售卖属性 -->
                        <li
                            class="with-x"
                            v-for="(attrValue, index) in searchParams.props"
                            :key="index"
                        >
                            {{ attrValue.split(':')[1] }}
                            <i @click="removeAttr(index)">×</i>
                        </li>
                    </ul>
                </div>

                <!--selector-->
                <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

                <!--details-->
                <div class="details clearfix">
                    <div class="sui-navbar">
                        <div class="navbar-inner filter">
                            <ul class="sui-nav">
                                <li :class="{ active: isOne }" @click="changeOrder('1')">
                                    <a>
                                        综合
                                        <span
                                            class="iconfont"
                                            :class="{ 'icon-up': isAsc, 'icon-down': isDesc }"
                                            v-show="isOne"
                                        ></span>
                                    </a>
                                </li>

                                <li :class="{ active: isTow }" @click="changeOrder('2')">
                                    <a>
                                        价格
                                        <span
                                            v-show="isTow"
                                            class="iconfont"
                                            :class="{ 'icon-up': isAsc, 'icon-down': isDesc }"
                                        ></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 商品销售列表 -->
                    <div class="goods-list">
                        <ul class="yui3-g">
                            <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <router-link :to="`/detail/${good.id}`">
                                            <img :src="good.defaultImg" />
                                        </router-link>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>{{ good.price }}</i>
                                        </strong>
                                    </div>
                                    <div class="attr">
                                        <a target="_blank" href="item.html" :title="good.title">
                                            {{ good.title }}
                                        </a>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有<span>2000</span>人评价</i>
                                    </div>
                                    <div class="operate">
                                        <a
                                            href="success-cart.html"
                                            target="_blank"
                                            class="sui-btn btn-bordered btn-danger"
                                            >加入购物车</a
                                        >
                                        <a href="javascript:void(0);" class="sui-btn btn-bordered"
                                            >收藏</a
                                        >
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- 分页器 -->
                    <Pagination
                        :pageNo="searchParams.pageNo"
                        :pageSize="searchParams.pageSize"
                        :total="total"
                        :continues="5"
                        @getPageNo="getPageNo"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import SearchSelector from './SearchSelector/SearchSelector';
export default {
    name: 'Search',
    components: { SearchSelector },
    data() {
        return {
            searchParams: {
                category1Id: '', //一级分类id
                category2Id: '', //二级分类id
                category3Id: '', //三级分类id
                categoryName: '', //分类名
                keyword: '', // 关键字
                order: '1:desc', //排序, 初始状态:综合|降序
                pageNo: 1, // 当前页
                pageSize: 10, // 展示数据个数
                props: [], // 平台售卖商品属性
                trademark: '', //品牌
            },
        };
    },
    computed: {
        ...mapState('searchAbout', { total: (state) => state.searchList.total }),
        ...mapGetters('searchAbout', ['goodsList']),

        isOne() {
            return this.searchParams.order.indexOf('1') !== -1;
        },
        isTow() {
            return this.searchParams.order.indexOf('2') !== -1;
        },
        isAsc() {
            return this.searchParams.order.indexOf('asc') !== -1;
        },
        isDesc() {
            return this.searchParams.order.indexOf('desc') !== -1;
        },
    },
    watch: {
        // 监听路由路径变化,并据此重新发送Ajax,展示新的商品
        $route(newVal, OldVal) {
            this.searchParams.category1Id = undefined;
            this.searchParams.category2Id = undefined;
            this.searchParams.category3Id = undefined;
            Object.assign(this.searchParams, this.$route.params, this.$route.query); // 更新数据
            this.getData(); // 发送 Ajax 请求
        },
    },
    methods: {
        // 向服务器发送请求,获取search模块数据,封装成一个函数,以便在需要时调用
        getData() {
            this.$store.dispatch('searchAbout/getSearchList', this.searchParams);
        },
        // 删除分类的名字
        removeCategoryName() {
            this.searchParams.category1Id = undefined;
            this.searchParams.category2Id = undefined;
            this.searchParams.category3Id = undefined;
            this.searchParams.categoryName = undefined; // 不仅需要清空分类名,还需要清空相应的id
            this.getData(); // 发送请求
            // 需要修改地址栏: 进行路由跳转
            if (this.$router.params) {
                this.$router.push({ name: 'search', params: this.$router.params });
            } else {
                this.$router.push({ name: 'search' });
            }
        },
        // 删除关键字
        removeKeyword() {
            this.searchParams.keyword = undefined;
            this.getData();
            // 还需要清空搜索框数据(Header组件中 - 兄弟组件 -- 使用全局事件总线)
            this.$bus.$emit('clear');
            // 路由跳转, 更新url地址
            if (this.$router.query) {
                this.$router.push({ name: 'search', query: this.$router.query });
            } else {
                this.$router.push({ name: 'search' });
            }
        },
        // 删除品牌信息
        removeTrademark() {
            this.searchParams.trademark = undefined;
            this.getData();
        },
        // 自定义事件 -- 子组件触发事件, 父组件接收事件
        trademarkInfo(trademark) {
            this.searchParams.trademark = `${trademark.tmId}: ${trademark.tmName}`;
            this.getData();
        },
        // 自定义事件
        attrInfo(attr, attrValue) {
            let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
            // 需要数组去重,防止重复点击,使数据重复
            if (this.searchParams.props.indexOf(props) === -1) {
                this.searchParams.props.push(props);
                this.getData();
            }
        },
        // 删除售卖的属性
        removeAttr(index) {
            this.searchParams.props.splice(index, 1);
            this.getData();
        },
        // 排序操作
        changeOrder(flag) {
            const originFlag = this.searchParams.order.split(':')[0];
            const originSort = this.searchParams.order.split(':')[1];
            // 准备一个新的排序字符串
            let newOrder = '';
            if (flag == originFlag) {
                newOrder = `${originFlag}:${originSort == 'desc' ? 'asc' : 'desc'}`;
            } else {
                newOrder = `${flag}:desc`;
            }
            // 将新的 order 赋予 searchParams
            this.searchParams.order = newOrder;
            this.getData();
        },
        // 获取分页器当前页
        getPageNo(pageNo) {
            this.searchParams.pageNo = pageNo;
            this.getData();
        },
    },
    // 在组件挂载完毕和mounted之前执行一次
    beforeMount() {
        Object.assign(this.searchParams, this.$route.query, this.$route.params);
    },
    mounted() {
        this.getData();
    },
};
</script>

<style lang="less" scoped>
.main {
    margin: 10px 0;

    .py-container {
        width: 1200px;
        margin: 0 auto;

        .bread {
            margin-bottom: 5px;
            overflow: hidden;

            .sui-breadcrumb {
                padding: 3px 15px;
                margin: 0;
                font-weight: 400;
                border-radius: 3px;
                float: left;

                li {
                    display: inline-block;
                    line-height: 18px;

                    a {
                        color: #666;
                        text-decoration: none;

                        &:hover {
                            color: #4cb9fc;
                        }
                    }
                }
            }

            .sui-tag {
                margin-top: -5px;
                list-style: none;
                font-size: 0;
                line-height: 0;
                padding: 5px 0 0;
                margin-bottom: 18px;
                float: left;

                .with-x {
                    font-size: 12px;
                    margin: 0 5px 5px 0;
                    display: inline-block;
                    overflow: hidden;
                    color: #000;
                    background: #f7f7f7;
                    padding: 0 7px;
                    height: 20px;
                    line-height: 20px;
                    border: 1px solid #dedede;
                    white-space: nowrap;
                    transition: color 400ms;
                    cursor: pointer;

                    i {
                        margin-left: 10px;
                        cursor: pointer;
                        font: 400 14px tahoma;
                        display: inline-block;
                        height: 100%;
                        vertical-align: middle;
                    }

                    &:hover {
                        color: #28a3ef;
                    }
                }
            }
        }

        .details {
            margin-bottom: 5px;

            .sui-navbar {
                overflow: visible;
                margin-bottom: 0;

                .filter {
                    min-height: 40px;
                    padding-right: 20px;
                    background: #fbfbfb;
                    border: 1px solid #e2e2e2;
                    padding-left: 0;
                    border-radius: 0;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

                    .sui-nav {
                        position: relative;
                        left: 0;
                        display: block;
                        float: left;
                        margin: 0 10px 0 0;

                        li {
                            float: left;
                            line-height: 18px;

                            a {
                                display: block;
                                cursor: pointer;
                                padding: 11px 15px;
                                color: #777;
                                text-decoration: none;
                            }

                            &.active {
                                a {
                                    background: #e1251b;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
            }

            .goods-list {
                margin: 20px 0;

                ul {
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        height: 100%;
                        width: 20%;
                        margin-top: 10px;
                        line-height: 28px;

                        .list-wrap {
                            .p-img {
                                padding-left: 15px;
                                width: 215px;
                                height: 255px;

                                a {
                                    color: #666;

                                    img {
                                        max-width: 100%;
                                        height: auto;
                                        vertical-align: middle;
                                    }
                                }
                            }

                            .price {
                                padding-left: 15px;
                                font-size: 18px;
                                color: #c81623;

                                strong {
                                    font-weight: 700;

                                    i {
                                        margin-left: -5px;
                                    }
                                }
                            }

                            .attr {
                                padding-left: 15px;
                                width: 85%;
                                overflow: hidden;
                                margin-bottom: 8px;
                                min-height: 38px;
                                cursor: pointer;
                                line-height: 1.8;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;

                                a {
                                    color: #333;
                                    text-decoration: none;
                                }
                            }

                            .commit {
                                padding-left: 15px;
                                height: 22px;
                                font-size: 13px;
                                color: #a7a7a7;

                                span {
                                    font-weight: 700;
                                    color: #646fb0;
                                }
                            }

                            .operate {
                                padding: 12px 15px;

                                .sui-btn {
                                    display: inline-block;
                                    padding: 2px 14px;
                                    box-sizing: border-box;
                                    margin-bottom: 0;
                                    font-size: 12px;
                                    line-height: 18px;
                                    text-align: center;
                                    vertical-align: middle;
                                    cursor: pointer;
                                    border-radius: 0;
                                    background-color: transparent;
                                    margin-right: 15px;
                                }

                                .btn-bordered {
                                    min-width: 85px;
                                    background-color: transparent;
                                    border: 1px solid #8c8c8c;
                                    color: #8c8c8c;

                                    &:hover {
                                        border: 1px solid #666;
                                        color: #fff !important;
                                        background-color: #666;
                                        text-decoration: none;
                                    }
                                }

                                .btn-danger {
                                    border: 1px solid #e1251b;
                                    color: #e1251b;

                                    &:hover {
                                        border: 1px solid #e1251b;
                                        background-color: #e1251b;
                                        color: white !important;
                                        text-decoration: none;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
