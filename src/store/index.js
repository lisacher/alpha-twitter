import Vue from 'vue'
import Vuex from 'vuex'
import authorizationAPI from './../apis/authorization'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      account: '',
      email: '',
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
    },
    revokeAuthentication(state) {
      state.currentUser = {
        id: -1,
        name: '',
        account: '',
        email: '',
        avatar: '',
        role: ''
      }
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await authorizationAPI.getCurrentUser()

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        const { id, name, account, email, avatar, role } = data

        commit('setCurrentUser', {
          id,
          name,
          account,
          email,
          avatar,
          role
        })

        return true
      } catch (error) {
        commit('revokeAuthentication')
        return false
      }
    }
  },
  modules: {
  }
})
