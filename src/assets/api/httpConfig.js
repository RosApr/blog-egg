const axios = require('axios')
import bus from '@/assets/bus'
const http = axios.create()

http.interceptors.request.use(function (config) {
    bus.$emit('toggleLoadingModal', true)
    return config;
}, function (error) {
    return Promise.reject(error);
});

http.interceptors.response.use(function (response) {
    bus.$emit('toggleLoadingModal', false)
    return response;
}, function (error) {
    bus.$emit('toggleLoadingModal', false)
    return Promise.reject(error);
});

export default http