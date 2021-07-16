import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/application.css'

// vue-socket.io
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'socket',
  vuex: {
    store
  }
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
