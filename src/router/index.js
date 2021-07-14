import Vue from 'vue'
import VueRouter from 'vue-router'
import MainTweets from './../views/MainTweets.vue'
import UserLogin from './../views/UserLogin'
import Register from '../views/Register.vue'
import AdminLogin from './../views/AdminLogin.vue'
import store from './../store'

Vue.use(VueRouter)

// Test 

const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && currentUser.role === 'user') {
    next('/not-found')
    return
  }
  next()
}

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/login'
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
    path: `/users/:id`,
    name: 'user',
    redirect: `/users/:id/tweets`
  },
  {
    path: '/users/:id/tweets',
    name: 'user-tweets',
    component: () => import('./../views/UserProfileTweets.vue')
  },
  {
    path: '/users/:id/reply',
    name: 'user-reply',
    component: () => import('./../views/UserProfileReply.vue')
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
    path: '/tweet/:id',
    name: 'tweet',
    component: () => import('../views/Tweet.vue')
  },
  {
    path: '/admin/tweets',
    name: 'admin-tweets',
    component: () => import('./../views/AdminTweetsList.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/users',
    name: 'admin-twitterers',
    component: () => import('./../views/AdminTwitterersList.vue'),
    beforeEnter: authorizeIsAdmin
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

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')
  const tokenInStore = store.state.token

  let isAuthenticated = store.state.isAuthenticated

  // 有 token 的情況才向才驗證
  if (token && token !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  const pathWithoutAuthentication = ['login', 'register', 'admin-login']

  if (!isAuthenticated && !pathWithoutAuthentication.includes(to.name)) {
    next('/login')
    return
  }
  if (isAuthenticated && pathWithoutAuthentication.includes(to.name)) {
    next('/tweets')
    return
  }

  next()
})

export default router
