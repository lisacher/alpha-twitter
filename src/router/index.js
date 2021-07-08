import Vue from 'vue'
import VueRouter from 'vue-router'
import MainTweets from './../views/MainTweets.vue'
import UserLogin from './../views/UserLogin'
import Register from '../views/Register.vue'
import AdminLogin from './../views/AdminLogin.vue'

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
    path: '/admin',
    name: 'admin-login',
    component: AdminLogin
  },
  {
    path: '/setting',
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
    path: `/users/${currentUserId}`,
    name: 'user',
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
    path: '/users/:id/followers',
    name: 'user-followers',
    component: () => import('./../views/UserProfileFollowers.vue')
  },
  {
    path: '/users/:id/followings',
    name: 'user-followings',
    component: () => import('./../views/UserProfileFollowings.vue')
  },
  {
    path: '/tweet',
    name: 'tweet',
    component: () => import('../views/Tweet.vue')
  },
  {
    path: '/admin/tweets',
    name: 'admin-tweets',
    component: () => import('./../views/AdminTweetsList.vue')
  },
  {
    path: '/admin/users',
    name: 'admin-twitterers',
    component: () => import('./../views/AdminTwitterersList.vue')
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
