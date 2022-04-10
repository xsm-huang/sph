const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                // 匹配所有以 '/api' 开头的请求路径
                target: 'http://39.98.123.211', // 代理目标的基础路径
                // ws: true,
                // changeOrigin: true,
            },
        },
    },
});
