import Vue from 'vue'
import VueRouter from 'vue-router'
import MainTweets from './../views/MainTweets.vue'
import UserLogin from './../views/UserLogin'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

// Test 

const currentUserId = 1

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
    // 為了讓Profile的button 在切換NavPills的時候都是part-active.
    path: '/users',
    name: 'users',
    redirect: `/users/${currentUserId}/tweets`
  },
  {
    path: '/users/:id/tweets',
    name: 'user-tweets',
    component: () => import('./../views/UserProfileTweets.vue')
  },
  {
    path: '/users/:id/likes',
    name: 'user-likes',
    component: () => import('./../views/UserProfileLikes.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: () => import('./../views/NotFound.vue')
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  linkActiveClass: 'part-active',
  routes
})

export default router
