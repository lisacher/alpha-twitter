<template>
  <div class="d-flex border tweet-card">
    <div class="img-container m-3">
      <router-link :to="{ name: 'user-tweets', params: { id: data.User.id } }">
        <img :src="data.User.avatar | emptyImage" alt="" />
      </router-link>
    </div>
    <div class="text-container mt-2 flex-grow-1">
      <div class="header">
        <div class="name d-inline-block pe-2 fw-bold">{{ data.User.name }}</div>
        <div class="account d-inline-block">{{ data.User.account }}</div>
        <div class="createdAt d-inline-block">
          ・{{ data.createdAt | fromNow }}
        </div>
      </div>
      <!-- 當此卡片是在回覆他人推文時： -->
      <router-link
        v-if="replyTweet"
        :to="{ name: 'tweet', params: { id: replyTweet.id ? replyTweet.id : replyTweet.TweetId} }"
        class="tweet-link"
      >
        <div class="body">
          <div class="text">
            <p class="reply-content py-1">
              回覆
              <router-link
                v-if="replyTweet.User.id"
                :to="{
                  name: 'user-tweets',
                  params: { id: replyTweet.User.id },
                }"
                class="tweet-link"
              >
                <span>{{ replyTweet.User.account ? replyTweet.User.account : '' }}</span>
              </router-link>
            </p>
            {{ data.content }}
          </div>
        </div>
      </router-link>
      <router-link
        v-else
        :to="{ name: 'tweet', params: { id: data.id } }"
        class="tweet-link"
      >
        <div class="body me-3">
          <div class="text">
            {{ data.description }}
          </div>
        </div>
      </router-link>
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
          <button
            class="btn liked-img"
            @click.prevent.stop="toggleLiked(data.id)"
            :disabled="status.isProcessing"
          ></button>
          <div class="likes-count">{{ data.totalLikes }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";
import { daytimeFilter } from "./../utils/mixins";

import tweetsAPI from "./../apis/tweets";
import { Toast } from "./../utils/helpers";

export default {
  name: "TweetsCard",
  mixins: [daytimeFilter, emptyImageFilter],
  props: {
    initialData: {
      type: Object,
      required: true,
    },
    replyTweet: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      data: this.initialData,
      status: {
        isProcessing: false,
        isLoading: false,
      },
    };
  },
  watch: {
    initialData: {
      handler: function (newValue) {
        this.data = {
          ...this.data,
          ...newValue,
        };
      },
      deep: true,
    },
  },
  methods: {
    async toggleLiked(id) {
      try {
        this.status.isProcessing = true;
        // 當不是在單一推文頁面時：
        if (!this.replyTweet) {
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
        if (this.replyTweet) {
          if (this.data.isLiked === 0) {
            const { data } = await tweetsAPI.likeReply({ replyId: id });
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
            const { data } = await tweetsAPI.unlikeReply({ replyId: id });
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
    clickModalButton(data) {
      this.$emit("after-click-modal", data);
    },
  },
};
</script>

<style scoped>
.tweet-link {
  text-decoration: none;
  color: #000;
}
.tweet-card:hover {
  background-color: #f7f7f7;
}

.img-container img {
  height: 50px;
  width: 50px;
  object-fit: cover;
  object-position: 50% 50%;
  border-radius: 50%;
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
.reply-content {
  color: #657786;
}

.reply-content span {
  color: #ff6600;
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
  content: "";
  height: 25px;
  width: 25px;
  background-color: #ff6600;
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
  content: "";
  height: 25px;
  width: 25px;
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