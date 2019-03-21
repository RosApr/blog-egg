import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'

import IndexView from '@/views/IndexView.vue'
import List from '@/views/List.vue'
import Publish from '@/views/Publish.vue'
import Detail from '@/views/Detail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dashborad',
      name: 'index',
      component: IndexView,
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
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      redirect: '/dashborad'
    }
  ]
})
