import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getCurrentUser() {
    return apiHelper.get('/users/currentUser', {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
  getUser({ userId }) {
    return apiHelper.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
  getRecFollowers () {
    return apiHelper.get('/followships', {
        headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  followUser ({ userId }) {
    return apiHelper.post(`/followships/${userId}`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  unfollowUser ({ userId }) {
    return apiHelper.delete(`/followships/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  update({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData,{
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
}