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
  Message,
  Spin
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

Vue.use(vueCookie)

Vue.prototype.$axios = axios

Message.config({
  top: `200px`,
  duration: 2,
  maxCount: 3,
});
Vue.prototype.$message = Message
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
