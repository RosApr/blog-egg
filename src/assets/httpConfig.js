const axios = require('axios')
import bus from '@/assets/bus'
import router from '@/router'
const http = axios.create()
import VueInstance from '@/main'
/**
 *  400 参数错误 提示错误信息
 *  401 权限错误 跳转登录
 *  200 正常返回
 * */
const toggleLoadingModal = (modalStatus=true) => {
    return bus.$emit('toggleLoadingModal', modalStatus)
}
http.interceptors.request.use(function (config) {
    toggleLoadingModal()
    return config;
}, function (error) {
    return Promise.reject(error);
});

http.interceptors.response.use(function (response) {
    toggleLoadingModal(false)
    return response.data;
}, function ({response: {data, status}}) {
    toggleLoadingModal(false)
    switch(status) {
        case 401:
            router.push({name: '401'})
            break;
        case 403:
            router.push({name: '403'})
            break;
        case 400:
            VueInstance.$message.error(data.msg)
            break;
        case 500:
            router.push({name: '500'})
            break;
        default:
            // to do
    }
    return Promise.reject({data, status});
});

export default http