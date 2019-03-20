const jsonServer = require('json-server')
const server = jsonServer.create()
const db = require('./router.js')
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()
server.use((req, res, next) => {
    console.log(req.method)
    if(req.method === 'POST') {
        req.method = 'GET'
    }
    next()
})

server.use(middlewares)
server.use(jsonServer.rewriter({
    '/api/*': '/$1'
}))
server.use(router)
server.listen(3000, () => {
    console.log('server start at port 3000')
})