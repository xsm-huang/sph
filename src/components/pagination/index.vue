<template>
    <div class="pagination">
        <button class="pgUp" :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
            上一页
        </button>
        <button
            :class="{ active: pageNo == 1 }"
            v-if="continuesNum[0] > 1"
            @click="$emit('getPageNo', 1)"
        >
            1
        </button>
        <button v-if="continuesNum[0] > 2">...</button>
        <button
            :class="{ active: pageNo == page }"
            v-for="(page, index) in continuesNum"
            :key="index"
            @click="$emit('getPageNo', page)"
        >
            {{ page }}
        </button>
        <button v-if="continuesNum[continuesNum.length - 1] < totalPage - 1">...</button>
        <button
            :class="{ active: pageNo == totalPage }"
            v-if="continuesNum[continuesNum.length - 1] < totalPage"
            @click="$emit('getPageNo', totalPage)"
        >
            {{ totalPage }}
        </button>
        <button
            class="pgDn"
            :disabled="pageNo == totalPage"
            @click="$emit('getPageNo', pageNo + 1)"
        >
            下一页
        </button>
        <button class="total">共{{ total }}条</button>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    computed: {
        // 总页数
        totalPage() {
            return Math.ceil(this.total / this.pageSize);
        },

        continuesNum() {
            const { pageNo, totalPage, continues } = this;
            let start = 0;
            let end = 0;
            if (continues >= totalPage) {
                start = 1;
                end = totalPage;
            } else {
                start = pageNo - Math.floor(continues / 2);
                end = pageNo + Math.floor(continues / 2);
                if (start < 1) {
                    start = 1;
                    end = continues;
                }
                if (end > totalPage) {
                    start = totalPage - continues + 1;
                    end = totalPage;
                }
            }

            let continuesNum = [];
            while (start <= end) {
                continuesNum.push(start);
                start++;
            }
            return continuesNum;
        },
    },
};
</script>

<style lang="less" scoped>
.pagination {
    float: right;
    text-align: center;
    button {
        margin: 0 5px;
        padding: 0 5px;
        min-width: 33.5px;
        height: 28px;
        background-color: #f4f4f5;
        border: 0;
        border-radius: 2px;
        color: #333;
        line-height: 28px;
        font-size: 13px;
        cursor: pointer;
    }

    .total {
        margin-left: 30px;
    }

    .active,
    .pgUp:hover,
    .pgDn:hover {
        background-color: rgb(255, 131, 131);
    }

    .pgUp:hover {
    }
}
</style>
