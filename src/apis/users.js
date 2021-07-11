import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
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
    }
}