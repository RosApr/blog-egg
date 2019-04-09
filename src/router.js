import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/user/Login'
import Register from '@/views/user/Register'
import Profile from '@/views/user/Profile'

import UserView from '@/views/UserView'
import AdminView from '@/views/AdminView'
import CommonView from '@/views/CommonView'
import Error_401 from '@/views/common/401'
import Error_403 from '@/views/common/403'
import Error_500 from '@/views/common/500'
import List from '@/views/List'
import Publish from '@/views/Publish'
import Detail from '@/views/Detail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dashborad',
      name: 'index',
      component: UserView,
      children: [
        {
          path: 'index',
          alias: '',
          name: 'list',
          component: List,
        },
        {
          path: 'publish',
          name: 'publish',
          component: Publish
        },
        {
          path: 'detail/:id',
          name: 'detail',
          component: Detail
        },
      ]
    },
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
          component: Profile
        },
        {
          path: 'register',
          name: 'register',
          component: Register
        },
      ],
      redirect: '/account/login'
    },
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
