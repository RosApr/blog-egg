import http from '@/assets/httpConfig'
import apiPath from '@/assets/api/config'

export const queryPostsList = (params) => {
    return http.get(`${apiPath.posts}`, { params })
}

export const queryPostsDetail = ({ id }) => {
    return http.get(`${apiPath.posts}/${id}`)
}

export const createPosts = (params) => {
    return http.post(`${apiPath.posts}`, { params })
}

export const modifyPosts = ({ id, ...params }) => {
    return http.put(`${apiPath.posts}/${id}`, params)
}

export const delPosts = ({ id }) => {
    return http.delete(`${apiPath.posts}/${id}`)
}

export const addPostsPv = ({ id }) => {
    return http.get(`${apiPath.posts}/${id}/pv`)
}

export const favoritePosts = ({ id, status }) => {
    return http.post(`${apiPath.posts}/${id}/favorite`, status)
}

export const search = ({ params }) => {
    return http.get(`${apiPath.posts}`, {params})
}