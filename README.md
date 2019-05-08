# blog-fe

## Project setup

```js
npm install
```

### Compiles and hot-reloads for development

```js
npm run serve
```

### Compiles and minifies for production

```js
npm run build
```

### Run your tests

```js
npm run test
```

### Lints and fixes files

```js
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 博客功能

博客

- 列表 ✓
- 分类 ✓
- 检索
- 评论
- 浏览量 ✓
- 收藏
- 取消收藏
- 发布 ✓
- 查看发布 ✓
- 修改发布 ✓
- 删除发布 ✓
- 查看评论

用户

- 登录 ✓
- 注册 ✓
- 修改密码 ✓
- 修改昵称 ✓

权限

- 管理员 | 普通用户

管理员 可以删除用户，修改用户密码，查看删除修改用户文章修改评论数查看（上帝角色）

### front end

vue
vuex
ant-design-vue
axios

### backend

egg.js

### 接口

不登录可以查看文章列表，详情 再无其他权限
否则返回401 权限错误 直接跳转 登录
400 bad request 参数错误 需提示错误信息
{
    msg:,
    errors:
}
返回值规范
{
    msg: 正常返回 '' 否则 返回错误信息
    data: {
        返回值正文
    }
}

```js
用户
path: /api/user

- 登录
    type: post
    method: login
    data: {
        account:
        password:
    }
- 退出登录
    type: post
    method: logout
    tip: token
- 注册
    type: post
    method: register
    data: {
        account:
        password:
        nickname:
    }
    tip: 注册成功后自动成为普通用户
- 修改密码
    type: put
    method:
    data: {
        password:
    }
    tip: token
- 修改昵称
    type: put
    method:
    data: {
        nickname:
    }
    tip: token
```

```js
文章
path: /api/posts

- 列表
    type: get
    method:
    data: {
        size:
        page:
        category:
    }
- 查看发布
    type: get
    method: :id
- 发布
    type: post
    method:
    data: {
        title
        content
        category_id
    }
- 评论
    type: post
    method: /api/comment
    data: {
    }
- 浏览量
    type: get
    method: :id/pv
- 收藏 | 取消收藏
    type: post
    method: :id/star
    data: {
        status: 1 | 0
    }
    tip: token
- 修改发布
    type: put
    method: :id
    data: {
        title
        content
        category_id
    }
    tip: token
- 删除发布
    type: delete
    method: :id
    tip: token
- 检索
    type: get
    method: /api/search?q=
- 查看评论
```

```js
分类
path: /api/categories

- 分类列表
    type: get
    method:
- 详情分类
    type: get
    method: :id
- 新建分类
    type: post
    method:
    data: {
        name:
    }
- 修改分类
    type: put
    method: :id
    data: {
        name:
    }
- 删除分类
    type: delete
    method: :id
```

tip

200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
204 NO CONTENT - [DELETE]：用户删除数据成功。
400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。