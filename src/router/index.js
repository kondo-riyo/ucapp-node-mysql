import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Adddata from '../views/Adddata.vue'
import Inputform from '../views/Inputform.vue'
import Login from '../views/Login.vue'
import NewMember from '../views/NewMember.vue'
import Waterchart from '../components/Waterchart.vue'
import Gaschart from '../components/Gaschart.vue'
import Elementchart from '../components/Elementchart.vue'
import accountModal from '../components/accountModal.vue'
import pushModal from '../components/pushModal.vue'
import allList_year from '../views/allList/_year.vue'
import allList_id from '../views/allList/_id.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/adddata',
    name: 'Adddata',
    component: Adddata
  },
  // {
  //   path: '/inputform/:month_id?/edit',
  //   name: 'month_edit',
  //   component: Inputform
  //   },
  
  {
  path: '/inputform',
  name:'Inputform',
  component: Inputform
  },
  {
    path:'/waterchart',
    name:'Waterchart',
    component:Waterchart
  },
  {
    path:'/gaschart',
    name:'Gaschart',
    component:Gaschart
  },
  {
    path:'/elementchart',
    name:'Elementchart',
    component:Elementchart
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path:'/newmember',
    name:'NewMember',
    component: NewMember
  },
  {
    path: '/accountModal',
    name: 'accountModal',
    component: accountModal
  },
  {
    path: '/pushModal',
    name: 'pushModal',
    component: pushModal
  },
  {
    path: '/allList/:year',
    name: 'allList_year',
    component: allList_year
  },
  {
    path: '/allList/:id',
    name: 'allList_id',
    component: allList_id
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
