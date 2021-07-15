<template>
  <div class="tweetReply">
      <!-- Other User's Tweet -->
    <router-link 
      :to="{ name:'tweet', params: { id: data.id } }"
      class="tweet-link"
    >
    <div class="d-flex">
      <div class="img-container">
        <router-link
          :to="{ name: 'user-tweets', params: { id: data.UserId } }"
        >
          <img :src="data.User.avatar | emptyImage" alt="" />
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
      <div class="footer d-flex my-2">
        <div class="comment d-flex align-items-center me-5">
          <div
            class="btn comment-img"
            data-bs-toggle="modal"
            data-bs-target="#tweetReplyModal"
            @click.prevent.stop="clickModalButton(data)"
          ></div>
          <div class="comments-count">{{ data.totalReplies }}</div>
        </div>

        <div
          class="liked d-flex align-items-center"
          :class="{ activeLiked: data.isLiked === 1 }"
        >
          <button class="btn liked-img" 
            @click.prevent.stop="toggleLiked(data.id, 'tweet')"
            :disabled="status.isProcessing"
          ></button>
          <div class="likes-count">{{ data.totalLikes }}</div>
        </div>
      </div>
      </div>
    </div>
    <!-- User's Reply -->
    <div class="d-flex reply-card" v-for="reply in data.Replies"
            :key="reply.id">
      <div class="img-container">
        <router-link
          :to="{ name: 'user-tweets', params: { id: reply.User.id } }"
        >
          <img :src="reply.User.avatar | emptyImage" alt="" />
        </router-link>
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
      <div 
        v-if="reply.id"
        class="liked footer align-items-center d-flex my-2"
        :class="{ activeLiked: reply.isLiked === 1 }"
      >
      <button class="flex-row btn liked-img" 
          @click.prevent.stop="toggleLiked(reply.id, 'reply')"
          :disabled="status.isProcessing"></button>
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

import tweetsAPI from "./../apis/tweets";
import { Toast } from "./../utils/helpers";

export default {
  name: "TweetsCard",
  mixins: [daytimeFilter, emptyImageFilter],
  props: {
    initialData: {
      type: Object,
      required: true,
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  data() {
    return {
      data: this.initialData,
      status: {
        isProcessing: false,
      },
    }
  },
  methods: {
    clickModalButton(data) {
      this.$emit("after-click-modal", data);
    },
    async toggleLiked(id, target) {
      try {
        this.status.isProcessing = true;
        // 當不是在單一推文頁面時：
        if (target === 'tweet') {
          if (this.data.isLiked === 0) {
            const { data } = await tweetsAPI.likeTweet({ tweetId: id });
            if (data.status !== "success") {
              throw new Error(data.message);
            }

            this.data.totalLikes += 1;
            this.data.isLiked = 1;
            Toast.fire({
              icon: "success",
              title: data.message,
            });
          } else {
            const { data } = await tweetsAPI.unlikeTweet({ tweetId: id });
            if (data.status !== "success") {
              throw new Error(data.message);
            }
            this.data.totalLikes -= 1;
            this.data.isLiked = 0;

            Toast.fire({
              icon: "success",
              title: data.message,
            });
          }
        }
        if (target === 'reply') {
          const targetReply = this.data.Replies.find(reply => reply.id === id)
          if (targetReply.isLiked === 0) {

            const { data } = await tweetsAPI.likeReply({ replyId: id });
            if (data.status !== "success") {
              throw new Error(data.message);
            }
            targetReply.isLiked = 1

            Toast.fire({
              icon: "success",
              title: data.message,
            });
          } else {
            const { data } = await tweetsAPI.unlikeReply({ replyId: id });
            if (data.status !== "success") {
              throw new Error(data.message);
            }
            targetReply.isLiked = 0;

            Toast.fire({
              icon: "success",
              title: data.message,
            });
          }
        }
        this.status.isProcessing = false;
        this.$emit('after-toggle-like')
      } catch (error) {
        this.status.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }
    },
  }
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
  object-fit: cover;
  object-position: 50% 50%;
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
.img-container::after {
  position: relative;
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
  background-color: #ccd6dd;
}

.footer {
  font-size: 13px;
}

.comment,
.liked {
  width: 50px;
  position: relative;
  z-index: 0;
}

.comment::after {
  content: '';
  height: 25px; 
  width:25px;
  background-color:#FF6600;
  border-radius: 25px;
  left: -5px;
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.comment:hover::after {
  opacity: 0.2;
}

.liked-img {
  background-image: url(./../assets/isLiked.png);
  height: 12px;
  width: 12px;
  background-size: contain;
  background-repeat: no-repeat;
  border: none;
  box-shadow: none;
}

.liked::after {
  content: '';
  height: 25px; 
  width:25px;
  background-color: #e0245e;
  border-radius: 25px;
  left: -5px;
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.liked:hover::after {
  opacity: 0.2;
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
</style>