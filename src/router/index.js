import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Welcome from '../components/view/Welcome.vue'

import UserList from '../components/view/Users/UserList.vue'

import GoodsList from '../components/view/Goods/GoodsList.vue'
import OrderList from '../components/view/Orders/OrderList.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/Home'},
  { path: '/Login', component: Login },
  { 
    path: '/Home', 
    component: Home,
    redirect : '/Welcome',
    children: [
      { path : '/Welcome', component: Welcome},
      { path : '/Users', component: UserList},
      { path : '/Goods', component: GoodsList},
      { path : '/Orders', component: OrderList}
  
    ]
  
  },
  { path: '/Register', component: Register},

]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next)=>{
  if (to.path === '/Login'|| to.path=='/login' || to.path === '/Register' ) {

    return next()
  } 

  const tokenStr = localStorage.getItem('uuid')
  if (!tokenStr) {
    router.$message.warning('登陆信息过期，请重新登陆')
    localStorage.clear()
    return next('/Login')

  } 
  
  next()
})

export default router
