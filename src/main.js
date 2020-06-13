// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import { Button, Message } from "element-ui"
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
// import qs from 'qs'

// Vue.prototype.qs = qs;

// Vue.component(Button.name, Button)
// Vue.prototype.$message = Message
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
new Vue({
  router,
  store, // 将store挂载到vue实例中！
  render: h => h(App)
}).$mount('#app')

