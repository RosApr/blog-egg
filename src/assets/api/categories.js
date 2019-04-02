import http from '@/assets/httpConfig'
import apiPath from '@/assets/api/config'

export const queryCategoriesList = () => {
    return http.get(`${apiPath.categories}`)
}

export const queryCategoriesDetail = ({ id }) => {
    return http.get(`${apiPath.categories}/${id}`)
}

export const createCategories = (params) => {
    return http.post(`${apiPath.categories}`, params)
}

export const modifyCategories = ({ id, name }) => {
    return http.put(`${apiPath.categories}/${id}`, name)
}

export const delCategories = ({ id }) => {
    return http.delete(`${apiPath.categories}/${id}`)
}