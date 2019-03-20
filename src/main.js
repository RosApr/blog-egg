import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import {
  Button,
  Layout,
  Form,
  Input,
  Icon,
  Checkbox,
  Row,
  Col
 } from 'ant-design-vue';
Vue.use(Button)
Vue.use(Layout)
Vue.use(Form)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Checkbox)
Vue.use(Row)
Vue.use(Col)

Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
