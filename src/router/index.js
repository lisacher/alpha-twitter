import Vue from 'vue'
import VueRouter from 'vue-router'
import MainTweets from './../views/MainTweets.vue'
import UserLogin from './../views/UserLogin'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'root',
    redirect: '/tweets'
  },
  {
    path: '/login',
    name: 'login',
    component: UserLogin
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/usersetting',
    name: 'user-setting',
    component: () => import('../views/UserSetting.vue')
  },
  {
    path: '/tweets',
    name: 'tweets',
    component: MainTweets
  },
  {
    path: '/users/:id/tweets',
    name: 'user-tweets',
    component: () => import('./../views/UserProfileTweets.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: () => import('./../views/NotFound.vue')
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

export default router
