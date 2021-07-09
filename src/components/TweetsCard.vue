<template>
  <div class="d-flex border tweet-card">
    <div class="img-container">
      <router-link :to="{ name: 'user-tweets', params: { id: data.User.id } }">
        <img src="./../assets/Logo.png" alt="" />
      </router-link>
    </div>
    <div class="text-container mt-2 flex-grow-1">
      <div class="header">
        <div class="name d-inline-block pe-2 fw-bold">{{ data.User.name }}</div>
        <div class="account d-inline-block">@{{ data.User.account }}</div>
        <div class="createdAt d-inline-block">
          ・{{ data.createdAt | fromNow }}
        </div>
      </div>
      <router-link 
        v-if="replyTweet"
        :to="{ name: 'tweet', params: { id: replyTweet.id }}" 
        class="tweet-link"
      >
        <div class="body">
          <div class="text">
            <p class="reply-content py-1">回覆 
              <router-link
                :to="{ name: 'user-tweets', params:{ id: replyTweet.User.id}}"
                class="tweet-link"
              >
                <span>@{{replyTweet.User.account}}</span>
              </router-link>
            </p>
            {{ data.text }}
          </div>
        </div>
      </router-link>
      <router-link 
        v-else
        :to="{ name: 'tweet', params: { id: data.id }}" 
        class="tweet-link"
      >
        <div class="body">
          <div class="text">
            {{ data.text }}
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
          <div class="comments-count">{{ data.repliesCount }}</div>
        </div>

        <div
          class="liked d-flex align-items-center"
          :class="{ activeLiked: data.isLiked }"
        >
          <div class="btn liked-img" @click.prevent.stop="toggleLiked"></div>
          <div class="likes-count">{{ data.likesCount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { daytimeFilter } from "./../utils/mixins";

export default {
  name: "TweetsCard",
  mixins: [daytimeFilter],
  components: {

  },
  props: {
    initialData: {
      type: Object,
      required: true,
    },
    replyTweet: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      data: this.initialData,
    };
  },
  methods: {
    toggleLiked() {
      if (this.data.isLiked) {
        this.data.likesCount -= 1;
      } else {
        this.data.likesCount += 1;
      }
      this.data.isLiked = !this.data.isLiked;
    }, 
    clickModalButton(data) {
      this.$emit('after-click-modal', data)
    }
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
  color: #FF6600;
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
</style>