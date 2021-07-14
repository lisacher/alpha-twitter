import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getTweets() {
    return apiHelper.get('/tweets', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUsersTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserLikes({ userId }) {
    return apiHelper.get(`/users/${userId}/likes`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getTweet({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getReply({ userId }) {
    return apiHelper.get(`/users/${userId}/replied_tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  createTweet({ User, description }) {
    return apiHelper.post('/tweets', {
      User,
      description
    }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  likeTweet({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/like`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  unlikeTweet({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/unlike`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  likeReply({ replyId }) {
    return apiHelper.post(`/replies/${replyId}/like`, null, {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
  unlikeReply({ replyId }) {
    return apiHelper.post(`/replies/${replyId}/unlike`, null, {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
  getAdminTweets() {
    return apiHelper.get('/admin/main', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteTweet({ tweetId }) {
    return apiHelper.delete(`/admin/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}