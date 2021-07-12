import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getTweets() {
    return apiHelper.get('/tweets', {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
  getUsersTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
  getUserLikes({ userId }) {
    return apiHelper.get(`/users/${userId}/likes`, {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
  getTweet({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
  createTweet({ User, description }) {
    return apiHelper.post('/tweets', {
      User,
      description
    }, {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  }
}