<template>
    <div class="pagination">
        <button>上一页</button>
        <button>1</button>
        <button>...</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>7</button>
        <button>...</button>
        <button>9</button>
        <button>下一页</button>
        <button class="total">共60条</button>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
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
}
</style>
