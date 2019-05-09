import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/user/Login'
import Register from '@/views/user/Register'
import Profile from '@/views/user/Profile'

import UserView from '@/views/UserView'

import AdminView from '@/views/AdminView'
import AdminBlogsView from '@/views/admin/blogs/Index'
import AdminBlogsList from '@/views/admin/blogs/List'

import AdminCategoriesView from '@/views/admin/categories/Index'
import AdminCategoriesDetail from '@/views/admin/categories/Detail'
import AdminCategoriesList from '@/views/admin/categories/List'

import AdminUserView from '@/views/admin/user/Index'
import AdminUserList from '@/views/admin/user/List'
import CommonView from '@/views/CommonView'
import Error_401 from '@/views/common/error/401'
import Error_403 from '@/views/common/error/403'
import Error_500 from '@/views/common/error/500'

import UserBlogList from '@/views/user/blogs/List'
import OwnUserBlogList from '@/views/user/blogs/OwnList'
import StarUserBlogList from '@/views/user/blogs/StarList'
import BlogPublish from '@/views/common/blogs/Publish'
import BlogDetail from '@/views/common/blogs/Detail'


import { ROLE } from '@/assets/config'
import VuexInstance from '@/store/index'
Vue.use(Router)

const _router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // 普通用户dashboard
    {
      path: '/dashborad',
      name: 'userIndex',
      component: UserView,
      children: [
        {
          path: 'blogs',
          alias: '',
          name: 'userBlogList',
          component: UserBlogList,
        },
        {
          path: 'own',
          name: 'userOwnList',
          component: OwnUserBlogList,
          meta: { requiresAuth: true, role: [ ROLE.user ] }
        },
        {
          path: 'star',
          name: 'userStarList',
          component: StarUserBlogList,
          meta: { requiresAuth: true, role: [ ROLE.user ] }
        },
        {
          path: 'publish',
          name: 'blogPublish',
          component: BlogPublish,
          meta: { requiresAuth: true, role: [ ROLE.user ] }
        },
        {
          path: 'detail/:id',
          name: 'blogDetail',
          component: BlogDetail
        },
        {
          path: 'update/:id',
          name: 'blogUpdate',
          component: BlogPublish,
          meta: { requiresAuth: true, role: [ ROLE.user, ROLE.admin ] }
        },
      ]
    },
    // 管理员 danshborad
    {
      path: '/admin',
      name: 'adminIndex',
      component: AdminView,
      meta: { requiresAuth: true, role: [ ROLE.admin ] },
      children: [
        {
          path: 'blogs',
          alias: '',
          name: 'adminBlog',
          component: AdminBlogsView,
          children: [
            {
              path: 'list',
              alias: '',
              name: 'adminBlogList',
              component: AdminBlogsList,
            },
            {
              path: 'detail/:id',
              name: 'adminBlogDetail',
              component: BlogDetail
            },
            {
              path: 'update/:id',
              name: 'adminBlogUpdate',
              component: BlogPublish
            },
          ]
        },
        {
          path: 'categories',
          name: 'adminCategories',
          component: AdminCategoriesView,
          children: [
            {
              path: 'list',
              alias: '',
              name: 'adminCategoriesList',
              component: AdminCategoriesList
            },
            {
              path: 'add',
              name: 'adminCategoriesAdd',
              component: AdminCategoriesDetail
            },
            {
              path: 'detail/:id',
              name: 'adminCategoriesDetail',
              component: AdminCategoriesDetail
            },
            {
              path: 'update/:id',
              name: 'adminCategoriesUpdate',
              component: AdminCategoriesDetail
            },
          ]
        },
        {
          path: 'users',
          name: 'adminUser',
          component: AdminUserView,
          children: [
            {
              path: 'list',
              alias: '',
              name: 'adminUserList',
              component: AdminUserList
            }
          ]
        }
      ]
    },
    // 用户管理
    {
      path: '/account',
      name: '',
      component: CommonView,
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login
        },
        {
          path: 'profile',
          name: 'profile',
          component: Profile,
          meta: { requiresAuth: true, role: [ ROLE.admin, ROLE.user ] },
        },
        {
          path: 'register',
          name: 'register',
          component: Register
        },
      ],
      redirect: '/account/login'
    },
    // error
    {
      path: '/exception',
      component: CommonView,
      children: [
        {
          path: '401',
          name: '401',
          component: Error_401
        },
        {
          path: '403',
          name: '403',
          component: Error_403
        },
        {
          path: '500',
          name: '500',
          component: Error_500
        }
      ]
    },
    {
      path: '*',
      redirect: '/dashborad'
    }
  ]
})

_router.beforeEach((to, from, next) => {
  const metaConfig = to.matched.filter(record => record.meta.requiresAuth)
  if(metaConfig.length === 0) {
    next()
  } else {
    const needRoleArray = metaConfig[0]['meta']['role']
    if(needRoleArray.length === 2) {
      if(VuexInstance.getters['user/isLogin']) {
        next()
      } else {
        next({
          name: 'login'
        })
      }
    } else {
      needRoleArray.forEach((role) => {
        if(role === ROLE.user) {
          if(VuexInstance.getters['user/isLoginAndIsRoleUser']) {
            next()
          } else {
            next({
              name: 'login'
            })
          }
        } else if(role === ROLE.admin){
          if(VuexInstance.getters['user/isLoginAndIsRoleAdmin']) {
            next()
          } else {
            next({
              name: 'login'
            })
          }
        }
      })
    }
  }
})

export default _router
