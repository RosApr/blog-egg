import http from '@/assets/httpConfig'
import { postsPath } from '@/assets/api/config'

export const queryPostsList = (params) => {
    return http.get(`${postsPath}`, { params })
}

export const queryPostsDetail = ({ id }) => {
    return http.get(`${postsPath}/${id}`)
}

export const createPosts = (params) => {
    return http.post(`${postsPath}`, { params })
}

export const modifyPosts = ({ id, ...params }) => {
    return http.put(`${postsPath}/${id}`, params)
}

export const delPosts = ({ id }) => {
    return http.delete(`${postsPath}/${id}`)
}

export const addPostsPv = ({ id }) => {
    return http.get(`${postsPath}/${id}/pv`)
}

export const starPosts = ({ id, status }) => {
    return http.post(`${postsPath}/${id}/star`, status)
}

export const search = ({ params }) => {
    return http.get(`${postsPath}`, {params})
}