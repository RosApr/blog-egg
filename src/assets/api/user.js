import http from '@/assets/httpConfig'
import { userPath } from '@/assets/api/config'

export const login = (params) => {
    return http.post(`${userPath}/login`, params)
}

export const logout = (params) => {
    return http.post(`${userPath}/logout`, params)
}

export const register = (params) => {
    return http.post(`${userPath}/register`, params)
}

export const modifyUserConfig = (params) => {
    return http.put(`${userPath}`, params)
}