<template>
  <div class="col my-2">
    <div 
      class="twitterer-card"
    >
      <div class="cover-container">
        <img :src="data.cover | emptyCover" alt="" />
      </div>
      <div 
        class="avatar-container"
      >
        <img :src="data.avatar | emptyImage" alt="" />
      </div>

      <template v-if="data.role === 'user'">
        <div class="description-container d-flex flex-column pb-2">
          <p class="name">{{ data.name }}</p>
          <p class="account mb-1">{{ data.account }}</p>
          <div class="comment-like mb-2">
            <img src="./../assets/comment.png" alt="" class="me-2" />
            <div class="d-inline-block me-2">{{ data.totalTweets }}</div>
            <img src="./../assets/isLiked.png" alt="" class="me-2" />
            <div class="d-inline-block">{{ data.totalLikes }}</div>
          </div>
          <div class="follow-status d-flex justify-content-center">
            <p class="pe-2">{{ data.totalFollowings }} <span>個跟隨中</span></p>
            <p>{{ data.totalFollowers }} <span>個追隨者</span></p>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="description-container d-flex flex-column pb-2 admin-box justify-content-center">
          <p class="name">{{ data.name }}</p>
          <p class="account mb-1">{{ data.account }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";

export default {
  name: "AdminTwitterersCard",
  mixins: [emptyImageFilter],
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.twitterer-card {
  position: relative;
  font-size: 15px;
}


.cover-container img {
  height: 140px;
  width: 100%;
  object-fit: cover;
  object-position: 50% 50%;
  border-radius: 10px 10px 0 0;
}

.avatar-container img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  object-position: 50% 50%;

  border: 4px solid #fff;
  border-radius: 50%;
  background-color: #fff;

  position: absolute;
  left: 50%;
  top: calc(140px * 0.8);
  transform: translate(-50%, -50%);
}

.description-container {
  background-color: #f6f7f8;
  padding-top: calc(140px * 0.2);
  text-align: center;
  border-radius: 0 0 10px 10px;
}

.comment-like img {
  width: 20px;
  height: 20px;
}

.follow-status {
  font-size: 14px;
}

.admin-box {
  width: 100%;
  height: 125px;
}
</style>