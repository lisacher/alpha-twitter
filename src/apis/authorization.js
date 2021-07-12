import { apiHelper } from './../utils/helpers' 

export default {
  signIn ({ account, password }) {
    return apiHelper.post('/users/signin', {
      account,
      password
    })
  },
  signUp (data) {
    return apiHelper.post('/users', data)
  }
}