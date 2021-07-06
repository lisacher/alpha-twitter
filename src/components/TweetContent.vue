
<template>
  <div class="container">
    <div class="userInfo">
      <div class="avatar">
        <router-link to="#">
          <img :src='tweet.image | emptyImage' alt="" />
        </router-link>
      </div>
      <div class="userTitle">
        <router-link to="#">
          <p class="text-dark">
            {{ tweet.name }}
          </p>
        </router-link>

        <p>@{{ tweet.account }}</p>
      </div>
    </div>

    <div class="textContent">
      <p>{{ tweet. text }}</p>
    </div>
    <div class="updatedAt">
      <p class="tweetUpdateAt">{{ tweet.createdAt | exactDate }}</p>
    </div>
    <div class="feedbackCount">
      <p>{{ tweet.replies.length }} <span>回復 </span></p>
      <p>{{ tweet.likeCount }} <span>喜歡次數</span></p>
    </div>
    <div class="tweetPanel">
      <div class="comments">
        <img
            data-bs-toggle="modal"
            data-bs-target="#tweetReplyModal"
            src="../assets/comment.png"
            alt=""
        />
      </div>
      <TweetReplyModal />
      <div class="likes">
        <img
          src="../assets/isLiked-active.png"
          alt=""
          @click.stop.prevent="disLike(tweet)"
          v-if="tweet.isLiked"
        />
        <img
          src="../assets/isLiked.png"
          alt=""
          @click.stop.prevent="like(tweet)"
          v-else
        />
        <p></p>
      </div>

    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins"
import { exactDateFilter } from "../utils/mixins"
import TweetReplyModal from "../components/TweetReplyModal.vue"

const dummyData = {
	user: {
		id: 1,
		name: 'Jay',
		account: 'jay123',
		image: 'https://tse4.mm.bing.net/th?id=OIP.-C08ivJ6oLNEELI4SkjElgHaHa&pid=Api&P=0&w=300&h=300',
        text: 'Hello您好～',
        createdAt: '2021-07-01T09:58:39.000Z',
        likeCount: 1,
        isLiked: false,
        replies: [
            {
                id: 1,
                User: {
                    id: 2,
                    name: 'Lena',
                    account: 'lena234',
                    image: 'https://twgreatdaily.com/images/elastic/yuE/yuEse3AB3uTiws8KSeho.jpg',
                },
                createdAt: '2021-07-01T10:58:39.000Z',
                text: 'wow~',
                isLiked: true
            },
            {
                id: 1,
                User: {
                    id: 3,
                    name: 'Jason',
                    account: 'jason888',
                    image: 'https://tse1.mm.bing.net/th?id=OIP.9UKmWkY6tpNAJs-ifJOKmAHaH0&pid=Api&P=0&w=300&h=300',
                },
                createdAt: '2021-07-02T12:58:39.000Z',
                text: 'haha~!',
                isLiked: false
            },
	]
    }
}

export default {
    name: 'TweetContent',
    mixins: [emptyImageFilter,exactDateFilter],
    components: {
        TweetReplyModal,
    },
    data() {
        return {
            tweet: []
        }
    },
    created() {
        this.getUserTweet()
    },
    methods: {
        getUserTweet() {
            this.tweet = dummyData.user
            console.log(this.tweet.isLiked.length)
        },
        like(tweet) {
            tweet.isLiked = true
            tweet.likeCount +1
        },
        disLike(tweet) {
            tweet.isLiked = false
            tweet.likeCount -1
        }
    }
}
</script>

<style scoped>
.container {
  border-bottom: 1px solid #e6ecf0;
  padding: 15px;
}
.userInfo {
  display: flex;
}
.userTitle {
  display: flex;
  flex-direction: column;
}
p {
  margin: 0;
}
.userTitle p {
  flex: 1;
  font-weight: 700;
  font-size: 15px;
  color: #1c1c1c;
}
.userTitle p:last-child {
  font-weight: 500;
  color: #657786;
}
.avatar {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
/* textContent */
.textContent {
  margin: 15px 0 15px;
  /* background-color: #333; */
}
.textContent p {
  font-size: 23px;
}
/* updatedAt */
.updatedAt {
  border-bottom: 1px solid #e6ecf0;
  padding-bottom: 15px;
}
.updatedAt p {
  font-size: 15px;
  font-weight: 500;
  color: #657786;
}
/* feedbackCount */
.feedbackCount {
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid #e6ecf0;
}
.feedbackCount p,
.feedbackCount span {
  font-size: 19px;
  line-height: 19px;
  font-weight: 700;
}
.feedbackCount span {
  color: #657786;
}
.feedbackCount p:first-child {
  margin-right: 20px;
}
/* tweetPanel */
.tweetPanel {
  padding-top: 20px;
  display: flex;
  flex-direction: row;
}
.tweetPanel img {
  height: 25px;
  width: 25px;
}
.tweetPanel img:hover {
  cursor: pointer;
}
.tweetPanel .comments {
  margin-right: 155px;
}
</style>
