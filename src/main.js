import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/common.css'
import './plugins/element.js'
import './index.css'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/tailwind.css'
import axios from 'axios'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
//配置请求的跟路径
// axios.defaults.baseURL = 'http://bt1.jaycao.com:3000/'
// http://106.12.130.56:3000/
// axios.defaults.baseURL = '/api'
axios.defaults.baseURL = 'http://119.8.123.19:3000'

axios.interceptors.request.use(function (config) {
  let requestToken = JSON.parse((window.localStorage.getItem('token'))) // 获取我们存储的 token
  config.headers['Authorization'] =  requestToken; // 将 token 放到 header 里面
  
  let loginUser = JSON.parse(window.localStorage.getItem('loginUser'))
  if (loginUser)
  config.headers['userid'] = loginUser.userid
  config.headers.post['Content-Type'] = 'application/json';
  config.timeout = 60000;
  return config;
});


Vue.prototype.$http = axios

Vue.config.productionTip = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
