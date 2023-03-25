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

axios.defaults.baseURL = 'http://localhost:3002'

axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem('token')
  //当token存在时，将token放到header中
  if (token) {
    try {
      let requestToken = JSON.parse(token)
      config.headers['token'] =  requestToken; // 将 token 放到 header 里面
      let loginUser = JSON.parse(localStorage.getItem('loginUser'))
      //user登录用户存在时，将userid放入header中
      if (loginUser) {
        config.headers['userid'] = loginUser.id
  
      }
    }catch(e) {
      localStorage.removeItem("token")
    }
   
  }
  

  config.headers.post['Content-Type'] = 'application/json';
  config.timeout = 2000;
  return config;
});


Vue.prototype.$http = axios

Vue.config.productionTip = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
