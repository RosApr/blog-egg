import http from '@/assets/httpConfig'
import { categoriesPath } from '@/assets/api/config'

export const queryCategoriesList = () => {
    return http.get(`${categoriesPath}`)
}

export const queryCategoriesDetail = ({ id }) => {
    return http.get(`${categoriesPath}/${id}`)
}

export const createCategories = (params) => {
    return http.post(`${categoriesPath}`, params)
}

export const modifyCategories = ({ id, name }) => {
    return http.put(`${categoriesPath}/${id}`, name)
}

export const delCategories = ({ id }) => {
    return http.delete(`${categoriesPath}/${id}`)
}