import { apiHelper } from './../utils/helpers'

export default {
  getTweets() {
    return apiHelper.get('/tweets')
  },
  getUsersTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`)
  },
  getUserLikes({ userId }) {
    return apiHelper.get(`/users/${userId}/likes`)
  },
  getTweet({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`)
  },
  getReply({ userId }) {
    return apiHelper.get(`/users/${userId}/replied_tweets`)
  },
  createTweet({ User, description }) {
    return apiHelper.post('/tweets', {
      User,
      description
    })
  },
  createReply({ tweetId, content }) {
    return apiHelper.post(`/tweets/${tweetId}/replies`, {
      tweetId,
      content
    })
  },
  likeTweet({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/like`, null)
  },
  unlikeTweet({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/unlike`, null)
  },
  likeReply({ replyId }) {
    return apiHelper.post(`/replies/${replyId}/like`, null)
  },
  unlikeReply({ replyId }) {
    return apiHelper.post(`/replies/${replyId}/unlike`, null)
  },
  getAdminTweets() {
    return apiHelper.get('/admin/main')
  },
  getAdminUsers() {
    return apiHelper.get('/admin/users')
  },
  deleteTweet({ tweetId }) {
    return apiHelper.delete(`/admin/tweets/${tweetId}`)
  },
}