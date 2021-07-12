
<template>
  <div class="container">
    <div class="userInfo">
      <div class="avatar">
        <router-link
          :to="{ name: 'user-tweets', params: { id: tweet.User.id } }"
        >
          <img :src="tweet.User.image | emptyImage" alt="" />
        </router-link>
      </div>
      <div class="userTitle">
        <router-link
          :to="{ name: 'user-tweets', params: { id: tweet.User.id } }"
        >
          <p class="text-dark">
            {{ tweet.User.name }}
          </p>
          <p>{{ tweet.User.account }}</p>
        </router-link>
      </div>
    </div>

    <div class="textContent">
      <p>{{ tweet.description }}</p>
    </div>
    <div class="updatedAt">
      <p class="tweetUpdateAt">{{ tweet.createdAt | exactDate }}</p>
    </div>
    <div class="feedbackCount">
      <p>{{ tweet.totalReplies }} <span>回覆 </span></p>
      <p>{{ tweet.totalLikes }} <span>喜歡次數</span></p>
    </div>
    <div class="tweetPanel">
      <div class="comments">
        <img
          data-bs-toggle="modal"
          data-bs-target="#tweetReplyModal"
          src="../assets/comment.png"
          alt=""
          @click.prevent.stop="clickModalButton(tweet)"
        />
      </div>
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
import { emptyImageFilter } from "../utils/mixins";
import { exactDateFilter } from "../utils/mixins";

export default {
  name: "TweetContent",
  mixins: [emptyImageFilter, exactDateFilter],
  components: {},
  props: {
    tweet: {
      type: Object,
      required: true,
    },
  },
  methods: {
    like(tweet) {
      tweet.isLiked = true;
      tweet.likesCount += 1;
    },
    disLike(tweet) {
      tweet.isLiked = false;
      tweet.likesCount -= 1;
    },
    clickModalButton(data) {
      this.$emit("after-click-modal", data);
    },
  },
};
</script>

<style scoped>
* {
  text-decoration: none;
}
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
