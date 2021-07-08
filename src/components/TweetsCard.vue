<template>
  <router-link to="/tweet" class="tweet-link">
    <div class="d-flex border">
      <div class="img-container">
        <router-link
          :to="{ name: 'user-tweets', params: { id: data.User.id } }"
        >
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
        <div class="body">
          <!-- <div v-if="repliedTo" class="replied-to mt-1">
            回覆 <span>@{{ repliedTo }}</span>
          </div> -->
          <div class="text">
            {{ data.text }}
          </div>
        </div>
        <div class="footer d-flex my-2">
          <div class="comment d-flex align-items-center me-5">
            <div
              class="btn comment-img"
              data-bs-toggle="modal"
              data-bs-target="#tweetReplyModal"
            ></div>
            <TweetReplyModal :initial-data="data" 
            />
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
  </router-link>
</template>

<script>
import TweetReplyModal from "../components/TweetReplyModal.vue";
import { daytimeFilter } from './../utils/mixins'

export default {
  name: "TweetsCard",
  mixins: [daytimeFilter],
  components: {
    TweetReplyModal,
  },
  props: {
    initialData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      data: this.initialData,
      tweet: []
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
    }
  },
};
</script>

<style scoped>
.tweet-link {
  text-decoration: none;
  color: #000;
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
</style>