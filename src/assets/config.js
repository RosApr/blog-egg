export const roleAdmin = 'root'
export const roleUser = 'user'
export const roleAnonymous = 'anonymous'
export const paginationConfig = {
    data() {
        return {
            pagination: {
                total: 0,
                current: 1,
                pageSize: 10,
                showTotal: (total) => `共${total}篇博客`
            }
        }
    }
}