<template>
  <div class="container" :style="[more ? { height: `${recTwitterer.length * 71 + 92}px` } : { height:  `${5 * 71 + 92}px`}]">
    <div class="title">
      <h1>跟隨誰</h1>
    </div>
    <hr />
    <div class="users">
      <ul class="usersList">
        <li v-show="!(!more && card > 4)" class="user" v-for="(user, card) in recTwitterer" :key="user.id">
          <router-link :to="{ name: 'user-tweets', params: { id: user.id } }">
            <div class="userContent">
              <div class="avatar">
                <img :src="user.avatar | emptyImage" alt="" />
              </div>
              <div class="info">
                <div class="name">
                  <h2 class="userName">{{ user.name }}</h2>
                </div>
                <div class="account">
                  <h2>{{ user.account }}</h2>
                </div>
              </div>
              <div class="toggleFollow">
                <button
                  class="btn isFollowing"
                  @click.stop.prevent="unfollowUser(user.id)"
                  v-if="user.isFollowing"
                >
                  正在跟隨
                </button>
                <button
                  class="btn follow"
                  @click.stop.prevent="followUser(user.id)"
                  v-else
                >
                  跟隨
                </button>
              </div>
            </div>
            <hr />
          </router-link>
        </li>
      </ul>
    </div>

    <div class="showMore">
      <button class="btn" v-show="!more" @click="more = !more">顯示更多</button>
      <button class="btn" v-show="more" @click="more = !more">顯示更少</button>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  name: "RecFollowingsList",
  mixins: [emptyImageFilter],
  props: {
    removeFollowId: {
      type: Number,
      default: 0,
    },
    addFollowId: {
      type: Number,
      default: 0,
    },
  },
  created() {
    this.fetchRecFollowers();
  },
  watch: {
    removeFollowId: {
      handler: function (newValue) {
        this.recTwitterer.map((twitterer) => {
          if (twitterer.id !== newValue) {
            return twitterer;
          } else {
            twitterer.isFollowing = 0
          }
        });
      },
    },
    addFollowId: {
      handler: function (newValue) {
        this.recTwitterer.map((twitterer) => {
          if (twitterer.id !== newValue) {
            return twitterer;
          } else {
            twitterer.isFollowing = 1
          }
        });
      },
    },
  },
  data() {
    return {
      recTwitterer: [],
      more: false
    }
  },
  methods: {
    async fetchRecFollowers() {
      try {
        const { data } = await usersAPI.getRecFollowers();
        this.recTwitterer = data;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得推薦追蹤者資料，請稍後再試",
        });
      }
    },
    async followUser(userId) {
      try {
        const res = await usersAPI.followUser({ userId });
        const { data } = res;

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.recTwitterer = this.recTwitterer.map((user) => {
          if (user.id !== userId) {
            return user;
          } else {
            return {
              ...user,
              totalFollowers: user.totalFollowers + 1,
              isFollowing: 1,
            };
          }
        });
        this.$emit("after-add-follow", userId);
        Toast.fire({
          icon: "success",
          title: "追蹤成功！",
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法追蹤使用者，請稍後再試",
        });
      }
    },
    async unfollowUser(userId) {
      try {
        const res = await usersAPI.unfollowUser({ userId });
        const { data } = res;

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.recTwitterer = this.recTwitterer.map((user) => {
          if (user.id !== userId) {
            return user;
          } else {
            return {
              ...user,
              totalFollowers: user.totalFollowers - 1,
              isFollowing: 0,
            };
          }
        });
        this.$emit("after-delete-follow", userId);
        Toast.fire({
          icon: "success",
          title: "取消追蹤成功！",
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤使用者，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
* {
  list-style: none;
  text-decoration: none;
}
.container {
  width: 350px;
  margin: 15px 82px auto 30px;
  background-color: #f5f8fa;
  border-radius: 14px;
  padding: 0;
  display: block;
}
.title {
  padding: 10px 15px;
}
.title h1 {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
}
hr {
  margin: 0;
}
.userName {
  color: black;
}
.usersList {
  margin: 0;
  padding: 0;
}
.userContent {
  display: flex;
  padding: 10px 15px;
  justify-content: space-between;
  align-items: center;
}
.userContent:hover {
  background-color: #f0f2f5;
}
.userContent .avatar {
  height: 50px;
  width: 50px;
  background-color: #c4c4c4;
  border-radius: 50%;
}
.userContent .avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.userContent .info {
  flex: 1;
  margin: 0 10px;
}
.userContent .info h2 {
  font-size: 15px;
  font-weight: 700;
}
.userContent .info .account h2 {
  color: #657786;
}
button {
  border: 1px solid #ff6600;
  border-radius: 100px;
  color: #ff6600;
}
.follow:hover {
  background-color: #ff6600;
  color: #fff;
}
.toggleFollow button {
  font-size: 15px;
  font-weight: 700;
}
.toggleFollow .isFollowing {
  width: 92px;
  background-color: #ff6600;
  color: #fff;
}
.showMore {
  padding: 12px 0 12px 15px;
}
.showMore .btn {
  padding: 0;
  border: none;
  font-weight: 400;
}
</style>