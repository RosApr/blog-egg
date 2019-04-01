import http from '@/assets/httpConfig'
import { searchPath } from '@/assets/api/config'

export const search = ({ params }) => {
    return http.get(`${searchPath}`, params)
}