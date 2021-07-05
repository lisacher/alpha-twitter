import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from './../views/Start.vue'
import Main from './../views/MainTweets.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'start',
    component: Start
  },
  {
    path: '/main',
    name: 'main',
    component: Main
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
