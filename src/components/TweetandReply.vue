<template>
  <div class="tweetReply">
      <!-- Other User's Tweet -->
    <router-link 
      :to="{ name:'tweet', params: { id: data.UserId } }"
      class="tweet-link"
    >
    <div class="d-flex">
      <div class="img-container">
        <router-link
          :to="{ name: 'user-tweets', params: { id: data.UserId } }"
        >
          <img :src="data.User.avatar" alt="" />
        </router-link>
        <div class="replyTarget"></div> 
      </div>

      <div class="text-container mt-2 flex-grow-1">
        <div class="header">
          <div class="name d-inline-block pe-2">{{data.User.name}}</div>
          <div class="account d-inline-block">{{ data.User.account }}</div>
          <div class="createdAt d-inline-block">
            ・{{ data.createdAt | fromNow }}
          </div>
        </div>
        <div class="body mb-3">
          <div class="text me-3">
            {{ data.description }}
          </div>
        </div>
      </div>
    </div>
    <!-- User's Reply -->
    <div class="d-flex" v-for="reply in data.Replies"
            :key="reply.id">
      <div class="img-container">
        <router-link
          :to="{ name: 'user-tweets', params: { id: reply.User.id } }"
        >
          <img :src="reply.User.avatar | emptyImage" alt="" />
        </router-link>
        <div class="replyTarget"></div> 
      </div>

      <div class="text-container mt-2 flex-grow-1">
        <div class="header">
          <div class="name d-inline-block pe-2">{{ reply.User.name }}</div>
          <div class="account d-inline-block">{{ reply.User.account }}</div>
          <div class="createdAt d-inline-block">
            ・{{ reply.createdAt | fromNow }}
          </div>
        </div>
        <div class="body mb-3">
          <div class="text me-3">
            {{ reply.content }}
          </div>
        </div>
      </div>
    </div>
    <div class="border-bottom"></div>
  </router-link>
  </div>  
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins"
import { daytimeFilter } from './../utils/mixins'
import { mapState } from 'vuex'

export default {
  name: "TweetsCard",
  mixins: [daytimeFilter, emptyImageFilter],
  props: {
    initialData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(['currentUser'])
  },
  data() {
    return {
      data: this.initialData,
    }
  },
};
</script>

<style scoped>
.tweetReply:hover {
  background-color: #f7f7f7;
}
.name {
    font-weight: 700;
}
.tweet-link {
  text-decoration: none;
  color: #000;
}

.img-container img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 10px;
}
.comment-img {
  background-image: url(./../assets/comment.png);
  height: 12px;
  width: 12px;
  background-size: contain;
  background-repeat: no-repeat;
}

.header,
.body {
  font-size: 15px;
}

.account,
.createdAt,
.footer,
.replied-to {
  color: #657786;
}

.replied-to span {
  color: #ff6600;
}

.footer {
  font-size: 13px;
}

.comment,
.liked {
  width: 50px;
}

.liked-img {
  background-image: url(./../assets/isLiked.png);
  height: 12px;
  width: 12px;
  background-size: contain;
  background-repeat: no-repeat;
}

.liked:hover .liked-img {
  background-image: url(./../assets/isLiked-active.png);
}

.liked:hover .likes-count {
  color: #e0245e;
}

.activeLiked .liked-img {
  background-image: url(./../assets/isLiked-active.png);
}

.activeLiked .likes-count {
  color: #e0245e;
}
.replyTarget {
  position: relative;
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
  height: calc(100% - 70px);
  background-color: #ccd6dd;
}
</style>