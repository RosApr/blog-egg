import http from '@/assets/httpConfig'
import { apiPath } from '@/assets/api/config'

export default {
    queryPostsList: (params) => {
        return http.get(`${apiPath.posts}`, { params })
    },
    queryPostsDetail: ({ id }) => {
        return http.get(`${apiPath.posts}/${id}`)
    },
    createPosts: (params) => {
        return http.post(`${apiPath.posts}`, params)
    },
    modifyPosts: (params) => {
        return http.put(`${apiPath.posts}/${params.id}`, params)
    },
    delPosts: ({ id }) => {
        return http.delete(`${apiPath.posts}/${id}`)
    },
    addPostsPv: ({ id }) => {
        return http.get(`${apiPath.posts}/${id}/pv`)
    },
    search: ({ params }) => {
        return http.get(`${apiPath.posts}`, { params })
    }
}