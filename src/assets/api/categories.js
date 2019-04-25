import http from '@/assets/httpConfig'
import { apiPath } from '@/assets/api/config'

export default {
    queryCategoriesList: () => {
        return http.get(`${apiPath.categories}`)
    },
    queryCategoriesDetail: ({ id }) => {
        return http.get(`${apiPath.categories}/${id}`)
    },
    createCategories: (params) => {
        return http.post(`${apiPath.categories}`, params)
    },
    modifyCategories: ({ id, name }) => {
        return http.put(`${apiPath.categories}/${id}`, name)
    },
    delCategories: ({ id }) => {
        return http.delete(`${apiPath.categories}/${id}`)
    }
} 