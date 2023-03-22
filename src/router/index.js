import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Search from '../components/view/Search.vue'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import ExpRank from '../components/view/ExpRank.vue'
import RiceRank from '../components/view/RiceRank.vue'
import DonationRank from '../components/view/DonationRank.vue'
import Welcome from '../components/view/Welcome.vue'
import AlterInfo from '../components/view/AlterInfo.vue'
import adminList from '../components/view/clan_manager/adminList.vue'
import Download from '../components/view/application/download.vue'
import showRefresh from '../components/view/application/shopRefresh.vue'
import querySalary from '../components/view/application/querySalary.vue'
import signUpApp from '../components/view/application/signUpWar.vue'
import BlackList from '../components/view/clan_manager/blackList.vue'
import DonationInfo from '../components/view/clan_manager/donationInfo.vue'
import Test from '../components/tool/test.vue'
import ClanSetting from '../components/view/clanSetting.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/Home'},
  { path: '/Login', component: Login },
  { path: '/Test', component: Test},
  { 
    path: '/Home', 
    component: Home,
    redirect : '/Welcome',
    children: [
      { path : '/Welcome', component: Welcome},
      { path: '/Search', component: Search },
      { path: '/Rank/ExpRank', component: ExpRank},
      { path: '/Rank/Don', component: DonationRank},
      { path: '/Rank/ReDon', component: RiceRank},
      { path: '/Manager/adminList', component:adminList},
      { path: '/Manager/BlackList', component:BlackList},
      { path: '/Manager/DonationInfo', component:DonationInfo},
      { path: '/Alter/Anno', component: AlterInfo},
      { path: '/Application/Download', component: Download},
      { path: '/Application/signUp', component: signUpApp},
      { path: '/Application/showRefresh', component: showRefresh},
      { path: '/Application/querySalary', component: querySalary},
      { path: '/ClanSetting', component: ClanSetting}
  
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

  const tokenStr = localStorage.getItem('loginUser')
  if (!tokenStr) {
    router.$message.warning('登陆信息过期，请重新登陆')
    localStorage.clear()
    return next('/Login')

  } 
  
  next()
})

export default router
