import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/application.css'

// vue-socket.io
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

const getToken = () => localStorage.getItem('token')

Vue.config.productionTip = false

const options = { extraHeaders: { Authorization: `Bearer ${getToken()}` }}


Vue.use(new VueSocketIO({
  debug: true,
  connection:SocketIO('https://twittertest8111009.herokuapp.com',options),
  
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
