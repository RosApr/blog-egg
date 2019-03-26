import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import vueCookie from 'vue-cookie'
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
  // Menu,
  // Breadcrumb
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
// Vue.use(Menu)
// Vue.use(Breadcrumb)
Vue.use(vueCookie)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
