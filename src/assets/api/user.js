import http from '@/assets/httpConfig'
import { apiPath } from '@/assets/api/config'

export default {
    login: (params) => {
        return http.post(`${apiPath.user}/login`, params)
    },
    logout: (params) => {
        return http.post(`${apiPath.user}/logout`, params)
    },
    register: (params) => {
        return http.post(`${apiPath.user}/register`, params)
    },
    modifyUserProfile: (params) => {
        return http.put(`${apiPath.user}`, params)
    },
    queryUserList: (params) => {
        return http.get(`${apiPath.user}/list`, {params})
    },
    resetUserPwd: (params) => {
        return http.put(`${apiPath.user}/resetPwd`, params)
    },
}