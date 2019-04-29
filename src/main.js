import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vueCookie from 'vue-cookie'
import utils from '@/assets/plugins'
import store from '@/store'
import Vuebar from 'vuebar'
import VueMoment from 'vue-moment'

import {
  Button,
  Layout,
  Form,
  Input,
  Icon,
  Checkbox,
  Row,
  Col,
  List,
  Avatar,
  Message,
  Spin,
  Dropdown,
  Menu,
  Table,
  Divider,
  Popconfirm,
  // Pagination
 } from 'ant-design-vue';
Vue.use(Button)
Vue.use(Layout)
Vue.use(Form)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Checkbox)
Vue.use(Row)
Vue.use(Col)
Vue.use(List)
Vue.use(Avatar)
Vue.use(Spin)
Vue.use(Dropdown)
Vue.use(Menu)
Vue.use(Table)
Vue.use(Divider)
Vue.use(Popconfirm)
// Vue.use(Pagination)

Vue.use(VueMoment)
Vue.use(vueCookie)
Vue.use(utils)
Vue.use(Vuebar)

Message.config({
  top: '200px',
  duration: 2,
  maxCount: 3
})
Vue.prototype.$message = Message
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
