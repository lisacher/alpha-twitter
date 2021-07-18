<template>
  <div class="chat">
    <div class="mainSection border-start">
      <div class="usersOnline">
        <div class="title">
          <h1>上線使用者 ({{ onlineUsers.length }})</h1>
        </div>
        <div v-for="user in onlineUsers" :key="user.id" class="container">
          <!-- other users -->
          <li class="userItem">
            <div class="userContainer">
              <router-link :to="{ name: 'user', params: { id: user.id } }">
                <div class="avatar">
                  <img :src="user.avatar | emptyImage" alt="" />
                </div>
              </router-link>
              <div class="userName">
                <p>{{ user.name }}</p>
              </div>
              <div class="userAccount">
                <p>{{ user.account }}</p>
              </div>
            </div>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
export default {
  name: "UserOnlineList",
  props: {
    onlineUsers: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mixins: [emptyImageFilter],
};
</script>
<style scoped>
.row > * {
  padding-right: 0px;
  padding-left: 0px;
}
.chat {
  display: flex;
}
.mainSection {
  flex: 1;
  width: 100%;
  height: 100vh;
  border-right: 1px solid #e6ecf0;
  display: flex;
}
.usersOnline {
  border-right: 1px solid #e6ecf0;
  flex: 1;
  height: calc(100vh - 20px);
  overflow-y: scroll;
}
.usersOnline .title {
  border-bottom: 1px solid #e6ecf0;
  height: 55px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
}
.title h1 {
  font-weight: 700;
  font-size: 19px;
  margin: 0;
}
.usersOnline .container {
  padding: 0;
}
.userItem .userContainer {
  height: 60px;
  border-bottom: 1px solid #e6ecf0;
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
}
.userItem:hover {
  background-color: #f7f7f7;
}
.avatar {
  width: 50px;
  height: 50px;
  border: 1px solid #fff;
  border-radius: 50%;
}
.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.userName {
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 0px 0 10px;
}
.userName p {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
}
.userAccount {
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 10px;
}
.userAccount p {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: #657786;
}
</style>
