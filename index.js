const jsonServer = require("json-server")
const pause = require("connect-pause")
const path = require("path")

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, "db.json"))
const middlewares = jsonServer.defaults()

server.use(pause(1000))

server.use((req, res, next) => {
    console.log(req.path)

    if(req.method == "POST") {
        if(req.path == "/index.php/api/user/login") {
            return res.status(200).json({"code":1,"data":{"token":"adbffe58f3271705bb059c80b9a2d13c","data":{"id":20,"nickname":"test","phone":"18089210182","realname":null,"images":null,"account":null,"openid":"os2Jo5OPMJbXcelO6gQrqm2HiJII","headimg":null,"createtime":"2018-09-30 13:29:18","checked":0,"status":1,"enable":0}},"msg":"登录成功"})
        } else if(req.path == "/index.php/api/message/sms") {
            let response = Math.round(Math.random()) === 1 ? {} : {status: true}
            return res.status(200).json(response)
        } else if(req.path == "/index.php/api/message/verify") {
            return res.status(200).json({
                code: 1,
                msg: "123123"
            })
        } else if(req.path == "/index.php/api/user/reset") {
            return res.status(200).json({"code":1,"data":{"token":"adbffe58f3271705bb059c80b9a2d13c","data":{"id":20,"nickname":"test","phone":"18089210182","realname":null,"images":null,"account":null,"openid":"os2Jo5OPMJbXcelO6gQrqm2HiJII","headimg":null,"createtime":"2018-09-30 13:29:18","checked":0,"status":1,"enable":0}},"msg":"登录成功"})
        } else if(req.path == "/index.php/api/user/register") {
            return res.status(200).json({"code":1,"data":{"token":"adbffe58f3271705bb059c80b9a2d13c","data":{"id":20,"nickname":"test","phone":"18089210182","realname":null,"images":null,"account":null,"openid":"os2Jo5OPMJbXcelO6gQrqm2HiJII","headimg":null,"createtime":"2018-09-30 13:29:18","checked":0,"status":1,"enable":0}},"msg":"登录成功"})
        } else if(req.path == "/index.php/api/material/upload") {
            return res.status(200).json({"code":1,"data":{"url":"http:\/\/114.116.31.162\/ids\/public\/\/upload\/20180718\/e9fc837bfb7911a4b0eebd3ae8a144c1.png"},"msg":""})
        } else if(req.path == "/index.php/api/report/index") {
            return res.status(200).json({code: 1})
        } else if(req.path == "/index.php/api/user/edit") {
            return res.status(200).json({code: 1})
        } else if(req.path == "/index.php/api/user/delete") {
            return res.status(200).json({code: 1})
        } else if(req.path == "/index.php/api/sell/publish") {
            return res.status(200).json({code: 1})
        } else if(req.path == "/index.php/api/logistics/publish") {
            return res.status(200).json({code: 1})
        } else if(req.path == "/index.php/api/buy/publish") {
            return res.status(200).json({code: 1})
        } else if(req.path == "/index.php/api/sell/edit") {
            return res.status(200).json({code: 1})
        } else if(req.path == "/index.php/api/logistics/edit") {
            return res.status(200).json({code: 1})
        } else if(req.path == "/index.php/api/buy/edit") {
            return res.status(200).json({code: 1})
        } else if(req.path == "/index.php/api/user/profile") {
            return res.status(200).json({
                "code": 1,
                "data": {
                    "id": "2",
                    "nickname": "昵称高旭测试",
                    "phone": "18789457120",
                    "realname": null,
                    "images": ["http://rosapr.me/work/person/zhangmeng8000/code/src/assets/demoGoodImg.jpg"],
                    "account": null,
                    "openid": null,
                    "headimg": null,
                    "createtime": "2018-07-15 19:52:25",
                    "checked": 1,
                    "status": "1",
                    "enable": "0"
                },
                "msg": "登录成功"
              })
        }
        req.method = "GET"
        req.query = ""
    }
    if(req.path == "/index.php/api/detail") {
        if(req.query.type) {
            return res.status(200).json(router.db.get(`detail_${req.query.type}`).value())
        }
    }

    next()
})

server.use(middlewares)
server.use(jsonServer.rewriter({
    "/index.php/api/sell/delete\\?id=:id": "/del_publish",
    "/index.php/api/common/filter*": "/filter_list",
    "/index.php/api/common/search*": "/search_result",
    "/index.php/api/common/sell/details*": "/sell_detail",
    "/index.php/api/common/sell*": "/sell_list",
    "/index.php/api/common/records*": "/goods_list",
    "/index.php/api/common/logistics/details*": "/logistics_detail",
    "/index.php/api/common/logistics*": "/logistics_list",
    "/index.php/api/common/buy/details*": "/buy_detail",
    "/index.php/api/common/buy*": "/buy_list",
    "/index.php/api/user/my*": "/own_publish"
}))
server.use(router)
server.listen(2000)