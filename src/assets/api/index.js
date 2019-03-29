import http from './httpConfig'
const queryPostList = (params) => {
    return http.get('/api/list', {params: params})
}
export {
    queryPostList
}