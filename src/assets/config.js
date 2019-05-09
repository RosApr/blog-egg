export const ROLE = {
    admin: 'root',
    user: 'user',
    anonymous: 'anonymous',
}
export const pagination = {
    total: 0,
    current: 1,
    pageSize: 10,
    showTotal: (total) => `共${total}条`
}
export const timeFormat = 'YYYY-MM-DD LTS'