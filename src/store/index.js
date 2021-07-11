import Vue from 'vue'
import Vuex from 'vuex'
import userAPI from './../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      account: '',
      avatar: '',
      role: ''
    },
    isAuthenticated: false,
    token: ''
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
      state.token = localStorage.getItem('token')
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await userAPI.getCurrentUser()
        if(data.status === 'error') {
          throw new Error(data.message)
        }

        const { id, name, account, avatar } = data 

        commit('setCurrentUser', {
          id,
          name,
          account,
          avatar
        })

      } catch(error) {
        console.error(error.message)
      }
    }
  },
  modules: {
  }
})
