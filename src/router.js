import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index.vue'
import Publish from '@/views/Publish.vue'
import Login from '@/views/Login.vue'
import Detail from '@/views/Detail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      alias: 'index',
      name: 'index',
      component: Index
    },
    {
      path: '/publish',
      name: 'publish',
      component: Publish
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/Detail',
      name: 'detail',
      component: Detail
    },
  ]
})
