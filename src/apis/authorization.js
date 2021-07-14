import { apiHelper } from './../utils/helpers' 
const getToken = () => localStorage.getItem('token')

export default {
  signIn ({ account, password }) {
    return apiHelper.post('/users/signin', {
      account,
      password
    })
  },
  adminSignin({ account, password }) {
    return apiHelper.post('/admin/signin', {
      account,
      password
    })
  },
  signUp (data) {
    return apiHelper.post('/users', data)
  },
  getCurrentUser() {
    return apiHelper.get('/currentUser', {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
}