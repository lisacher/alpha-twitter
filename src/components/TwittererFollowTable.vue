<template>
  <div class="container">
    <div class="follower-container">
      <div class="avatar">
        <router-link :to="{ name: 'user-tweets', params: { id: follower.id } }">
          <img :src="follower.avatar | emptyImage" alt="" />
        </router-link>
      </div>
      <div class="follower-info">
        <div class="isfollowed-info">
          <router-link
            :to="{ name: 'user-tweets', params: { id: follower.id } }"
          >
            <div class="follower-title">
              <div class="name text-dark">{{ follower.name }}</div>
              <div class="account">@{{ follower.account }}</div>
            </div>
          </router-link>

          <div class="toggleFollow">
            <button
              class="btn isFollowing"
              v-if="follower.isFollowed"
              @click.stop.prevent="unfollowUser()"
            >
              正在跟隨
            </button>
            <button class="btn" v-else @click.stop.prevent="followUser()">
              跟隨
            </button>
          </div>
        </div>
        <p>{{ follower.bio }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
import { Toast } from "../utils/helpers";

export default {
  name: "TwittererFollowTable",
  mixins: [emptyImageFilter],
  props: {
    initialData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      follower: this.initialData,
    };
  },
  created() {},
  methods: {
    followUser() {
      this.follower.isFollowed = true;

      Toast.fire({
        icon: "success",
        title: "追蹤成功！",
      });
    },
    unfollowUser() {
      this.follower.isFollowed = false;
      Toast.fire({
        icon: "success",
        title: "已取消追蹤",
      });
    },
  },
};
</script>

<style scoped>
* {
  text-decoration: none;
}
.follower-container {
  display: flex;
  height: auto;
  width: 100%;
  padding: 15px 0;
  border-bottom: 1px solid #e6ecf0;
  margin: 0;
}
.follower-info {
  width: 100%;
  margin: 0;
}
.isfollowed-info {
  display: flex;
  justify-content: space-between;
}
.name {
  font-weight: 700;
  font-size: 15px;
}
.avatar {
  min-width: 50px;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  margin-top: 15px;
}
.avatar img {
  min-width: 50px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-size: cover;
  object-fit: cover;
}
.account {
  color: gray;
  font-size: 15px;
  font-weight: 500;
}
button {
  border: 1px solid #ff6600;
  border-radius: 100px;
  color: #ff6600;
  margin-top: 7px;
  font-size: 15px;
  font-weight: 700;
}
.toggleFollow .isFollowing {
  width: 92px;
  background-color: #ff6600;
  color: #fff;
}
.follower-info p {
  margin: 0;
}
</style>