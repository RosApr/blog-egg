module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true,
            },
            '/chat*': {
                target: 'http://127.0.0.1:3000',
                ws: true,
                changeOrigin: true,
            }
        }
    }
}