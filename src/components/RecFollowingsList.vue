<template>
  <div class="container">
    <div class="title">
      <h1>跟隨誰</h1>
    </div>
    <hr />
    <div class="users">
      <ul class="usersList">
        <li class="user" v-for="user in recTwitterer" :key="user.id">
          <router-link
            :to="{ name: 'user-tweets', params: { id: user.id }}"
          >
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
                  @click.stop.prevent="unfollowUser(user)"
                  v-if="user.isFollowed"
                >
                  正在跟隨
                </button>
                <button
                  class="btn"
                  @click.stop.prevent="followUser(user)"
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
      <button class="btn">顯示更多</button>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
const dummyUser = {
  users: [
    {
      id: 1,
      name: "root",
      account: "root01",
      email: "root@example.com",
      isAdmin: true,
      image: "https://i.imgur.com/58ImzMM.png",
      isFollowed: false,
    },
    {
      id: 2,
      name: "user1",
      account: "user1234",
      email: "user1@example.com",
      isAdmin: false,
      image: "https://i.imgur.com/Q14p2le.jpg",
      isFollowed: false,
    },
    {
      id: 3,
      name: "user2",
      account: "user234",
      email: "user2@example.com",
      isAdmin: false,
      image: "https://i.imgur.com/OezkRwO.jpg",
      isFollowed: false,
    },
  ],
};
export default {
  name: "RecFollowingsList",
  mixins: [emptyImageFilter],
  created() {
    this.fetchRecFollowers();
  },
  data() {
    return {
      recTwitterer: [],
    };
  },
  methods: {
    fetchRecFollowers() {
      this.recTwitterer = dummyUser.users;
    },
    followUser(user) {
      user.isFollowed = true;
    },
    unfollowUser(user) {
      user.isFollowed = false;
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