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
  getUserFollowings({ userId }) {
    return apiHelper.get(`/users/${userId}/followings`, {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
  getUserFollowers({ userId }) {
    return apiHelper.get(`/users/${userId}/followers`, {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
  getRecFollowers () {
    return apiHelper.get('/followships', {
        headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  followUser ({ userId }) {
    return apiHelper.post(`/followships`, { id: userId }, {
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