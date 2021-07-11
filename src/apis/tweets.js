import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getTweets() {
    return apiHelper.get('/tweets', {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
  getAdminTweets() {
    return apiHelper.get('/admin/main', {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
  getAdminUsers() {
    return apiHelper.get('/admin/users', {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  }
}