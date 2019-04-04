import http from '@/assets/httpConfig'
import { apiPath } from '@/assets/api/config'

export const login = (params) => {
    return http.post(`${apiPath.user}/login`, params)
}

export const logout = (params) => {
    return http.post(`${apiPath.user}/logout`, params)
}

export const register = (params) => {
    return http.post(`${apiPath.user}/register`, params)
}

export const modifyUserConfig = (params) => {
    return http.put(`${apiPath.user}`, params)
}