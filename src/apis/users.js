import { apiHelper } from './../utils/helpers'

export default {
  getUser({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  getUserFollowings({ userId }) {
    return apiHelper.get(`/users/${userId}/followings`)
  },
  getUserFollowers({ userId }) {
    return apiHelper.get(`/users/${userId}/followers`)
  },
  getRecFollowers () {
    return apiHelper.get('/followships')
  },
  followUser ({ userId }) {
    return apiHelper.post(`/followships`, { id: userId })
  },
  unfollowUser ({ userId }) {
    return apiHelper.delete(`/followships/${userId}`)
  },
  update({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData)
  },
  updateInfo({ userId, formData }) {
    return apiHelper.put(`/users/${userId}/info`, formData)
  },
  getAdminUsers() {
    return apiHelper.get('/admin/users')
  },
}